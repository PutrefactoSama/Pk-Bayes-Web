#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Audita el multiidioma del sitio. No necesita instalar nada: solo Python 3.

    python3 tools/auditar-i18n.py

Revisa tres cosas y termina con código 1 si alguna falla:

  1. Texto visible sin marcar. Cada rediseño de una página nace sin los atributos
     data-i18n, y esa sección queda solo en español sin que nada avise. Esto lo
     detecta antes de publicar.
  2. Claves rotas. Un data-i18n que apunta a una clave que no existe en el
     diccionario deja el texto en el idioma de reserva para siempre.
  3. Diccionarios descuadrados. Si una clave existe en español pero falta en
     japonés, ese texto se queda en español al cambiar de idioma.

Lo que NO marca como problema, por ser deliberado: los nombres de los idiomas en
el selector (cada uno va escrito en su propio idioma), la marca "PK-Bayes" y las
iniciales de los fármacos.
"""
import os
import re
import sys
import unicodedata
from html.parser import HTMLParser

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Etiquetas cuyo contenido no es texto visible de la página.
OPACAS = {"script", "style", "noscript", "svg", "title"}
# Atributos que el motor traduce (ver applyLanguage en assets/js/i18n.js).
ATRIBUTOS = {
    "alt": "data-i18n-alt",
    "aria-label": "data-i18n-aria-label",
    "placeholder": "data-i18n-placeholder",
}
# Texto que se deja igual en los cuatro idiomas a propósito.
LITERAL = {"Español", "English", "中文", "日本語", "PK-Bayes", "PK-Bayes.", "✓", "V", "F"}


def es_texto(valor):
    """¿Es una frase que un lector vería y esperaría traducida?"""
    v = valor.strip()
    if not v or v in LITERAL:
        return False
    return bool(re.search(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]", v))


class Recorrido(HTMLParser):
    """Recorre el HTML llevando la cuenta de si estamos dentro de algo ya marcado."""

    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.pila = []           # (etiqueta, marcado_aquí_o_más_arriba)
        self.sueltos = []        # texto visible sin clave
        self.atributos = []      # atributos visibles sin clave
        self.claves = set()      # claves referenciadas desde el HTML

    # -- utilidades -----------------------------------------------------------
    def _cubierto(self):
        return any(marcado for _, marcado in self.pila)

    def _opaca(self):
        return any(tag in OPACAS for tag, _ in self.pila)

    def _abrir(self, tag, attrs):
        a = dict(attrs)
        for nombre, valor in a.items():
            if nombre.startswith("data-i18n") and valor:
                self.claves.add(valor)
        marcado = "data-i18n" in a or "data-i18n-html" in a
        for attr, marca in ATRIBUTOS.items():
            valor = a.get(attr)
            if valor and es_texto(valor) and marca not in a:
                self.atributos.append((tag, attr, valor.strip()))
        return marcado

    # -- ganchos del parser ---------------------------------------------------
    def handle_starttag(self, tag, attrs):
        marcado = self._abrir(tag, attrs)
        self.pila.append((tag, marcado or self._cubierto()))

    def handle_startendtag(self, tag, attrs):
        self._abrir(tag, attrs)

    def handle_endtag(self, tag):
        for i in range(len(self.pila) - 1, -1, -1):
            if self.pila[i][0] == tag:
                del self.pila[i:]
                return

    def handle_data(self, data):
        if self._opaca() or self._cubierto():
            return
        if es_texto(data):
            padre = self.pila[-1][0] if self.pila else "?"
            self.sueltos.append((padre, data.strip()))


def leer_diccionario(ruta):
    """Saca {idioma: {clave: valor}} de assets/js/i18n.js sin ejecutar el archivo."""
    fuente = open(ruta, encoding="utf-8").read()
    inicio = fuente.find("const I18N = {")
    if inicio == -1:
        raise SystemExit("No se encontró 'const I18N = {' en %s" % ruta)
    trozos = re.split(r"\n    (es|en|zh|ja): \{", fuente[inicio:])
    if len(trozos) < 9:
        raise SystemExit("El diccionario no tiene la forma esperada (4 bloques de idioma).")
    dicc = {}
    for i in range(1, len(trozos), 2):
        idioma, cuerpo = trozos[i], trozos[i + 1]
        entradas = {}
        for clave, valor in re.findall(r'^    "([^"]+)": "((?:[^"\\]|\\.)*)"', cuerpo, re.M):
            entradas[clave] = valor      # una clave repetida se queda con la última, igual que en JS
        dicc[idioma] = entradas
    return dicc


def main():
    paginas = sorted(f for f in os.listdir(RAIZ) if f.endswith(".html"))
    dicc = leer_diccionario(os.path.join(RAIZ, "assets", "js", "i18n.js"))
    idiomas = ["es", "en", "zh", "ja"]
    problemas = 0

    print("Diccionario: " + " · ".join("%s %d claves" % (l, len(dicc.get(l, {}))) for l in idiomas))

    # 3. diccionarios descuadrados
    base = set(dicc["es"])
    for idioma in idiomas[1:]:
        faltan = sorted(base - set(dicc[idioma]))
        sobran = sorted(set(dicc[idioma]) - base)
        if faltan:
            problemas += len(faltan)
            print("\n✗ A '%s' le faltan %d claves que sí están en español:" % (idioma, len(faltan)))
            for k in faltan[:15]:
                print("    " + k)
        if sobran:
            print("\n! '%s' tiene %d claves que no existen en español (no rompen nada, son residuo):"
                  % (idioma, len(sobran)))

    # 1 y 2, página por página
    usadas = set()
    for pagina in paginas:
        r = Recorrido()
        r.feed(open(os.path.join(RAIZ, pagina), encoding="utf-8").read())
        r.close()
        usadas |= r.claves
        rotas = sorted(k for k in r.claves if k not in dicc["es"])
        if r.sueltos or r.atributos or rotas:
            problemas += len(r.sueltos) + len(r.atributos) + len(rotas)
            print("\n✗ %s" % pagina)
            for tag, texto in r.sueltos:
                print('    sin traducir  <%s> "%s"' % (tag, texto[:70]))
            for tag, attr, texto in r.atributos:
                print('    sin traducir  <%s %s="%s">' % (tag, attr, texto[:60]))
            for clave in rotas:
                print("    clave rota    %s  (no existe en el diccionario)" % clave)
        else:
            print("✓ %s" % pagina)

    huerfanas = len(base - usadas)
    print("\nClaves referenciadas desde el HTML: %d · sin uso en el HTML: %d "
          "(muchas las usa el JavaScript, no es un error)" % (len(usadas), huerfanas))

    if problemas:
        print("\n%d problemas. Hay que marcarlos y traducirlos antes de publicar." % problemas)
        return 1
    print("\nTodo el texto visible está traducido en los cuatro idiomas.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
