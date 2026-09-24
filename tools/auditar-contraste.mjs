/**
 * Audita el contraste de todo el texto visible del sitio contra el mínimo WCAG AA.
 *
 *   npx playwright@latest install chromium     (solo la primera vez)
 *   node tools/auditar-contraste.mjs
 *
 * Levanta un servidor estático sobre la carpeta del repo, abre cada página en
 * Chromium y mide el contraste real de cada nodo de texto. Termina con código 1
 * si algo queda por debajo del mínimo.
 *
 * POR QUÉ MEDIRLO EN EL NAVEGADOR Y NO LEYENDO EL CSS: el color que finalmente se
 * ve depende de las variables resueltas, de la cascada y, sobre todo, de las capas
 * de fondo apiladas. El fallo que motivó esto era justamente eso -- una banda que
 * heredaba el color de texto de su variante clara sobre un fondo azul noche, con
 * el titular en 1,00:1 -- y no se ve en ninguna regla aislada.
 *
 * EL FONDO SE COMPONE DE FUERA HACIA DENTRO, aplicando el alfa de cada capa. Sin
 * eso, un degradado radial al 8% de opacidad sobre blanco se lee como si fuera su
 * color crudo y aparecen falsos positivos: la primera versión de este script
 * reportaba 17 inexistentes por ese motivo.
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, readdirSync } from "node:fs";
import { extname, join, dirname, normalize } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const RAIZ = dirname(dirname(fileURLToPath(import.meta.url)));
const PUERTO = 8787;
const TIPOS = { ".html":"text/html", ".css":"text/css", ".js":"text/javascript",
                ".mjs":"text/javascript", ".png":"image/png", ".jpg":"image/jpeg",
                ".svg":"image/svg+xml", ".ico":"image/x-icon", ".json":"application/json",
                ".webp":"image/webp", ".woff2":"font/woff2" };

// Playwright sirve igual instalado en el repo o de forma global: se prueban los dos,
// para no obligar a crear un package.json en un sitio que no tiene build.
let chromium;
for (const donde of ["playwright", await raizGlobal()]) {
  if (!donde) continue;
  try {
    const mod = await import(donde);
    // Playwright es CommonJS: según cómo se resuelva, 'chromium' llega como export
    // nombrado o colgando de default. Si solo se desestructura lo primero, una
    // instalación global falla sin decir por qué.
    chromium = mod.chromium ?? mod.default?.chromium;
    if (chromium) break;
  } catch { /* se prueba la siguiente */ }
}
if (!chromium) {
  console.error("Falta Playwright. Instálalo de una de estas dos formas:\n" +
                "  npm i -g playwright && npx playwright install chromium     (global)\n" +
                "  npm i -D playwright && npx playwright install chromium     (en el repo)");
  process.exit(2);
}

async function raizGlobal() {
  try {
    const { execSync } = await import("node:child_process");
    const raiz = execSync("npm root -g", { encoding: "utf8", stdio: ["ignore","pipe","ignore"] }).trim();
    const ruta = join(raiz, "playwright", "index.js");
    return existsSync(ruta) ? pathToFileURL(ruta).href : null;
  } catch { return null; }
}

// ── Servidor estático mínimo ────────────────────────────────────────────────────
const servidor = createServer(async (req, res) => {
  const ruta = normalize(join(RAIZ, decodeURIComponent(req.url.split("?")[0])));
  if (!ruta.startsWith(RAIZ)) { res.writeHead(403).end(); return; }
  try {
    const cuerpo = await readFile(ruta);
    res.writeHead(200, { "Content-Type": TIPOS[extname(ruta)] || "application/octet-stream" }).end(cuerpo);
  } catch { res.writeHead(404).end("no encontrado"); }
});
await new Promise(r => servidor.listen(PUERTO, "127.0.0.1", r));

// ── La medición, que corre dentro de la página ──────────────────────────────────
const MEDIR = () => {
  const canal = x => { x /= 255; return x <= 0.03928 ? x/12.92 : ((x+0.055)/1.055)**2.4; };
  const luminancia = c => 0.2126*canal(c[0]) + 0.7152*canal(c[1]) + 0.0722*canal(c[2]);
  const contraste = (a, b) => {
    const l1 = luminancia(a), l2 = luminancia(b);
    return (Math.max(l1,l2) + 0.05) / (Math.min(l1,l2) + 0.05);
  };
  const cifras = s => (s.match(/-?[\d.]+/g) || []).map(Number);
  const color = s => { const n = cifras(s); return n.length >= 3 ? { c: n.slice(0,3), a: n.length > 3 ? n[3] : 1 } : null; };
  const componer = (capa, base) => capa.c.map((v,i) => Math.round(v*capa.a + base[i]*(1-capa.a)));

  // Fondos posibles detrás de un elemento, componiendo cada capa sobre la anterior.
  // Un degradado aporta una candidata por parada de color: nos quedamos con la peor.
  const fondosDe = el => {
    const cadena = [];
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) cadena.unshift(n);
    let acumulado = [[255,255,255]];
    for (const n of cadena) {
      const cs = getComputedStyle(n);
      const capas = [];
      const fondo = color(cs.backgroundColor);
      if (fondo && fondo.a > 0) capas.push(fondo);
      if (cs.backgroundImage && cs.backgroundImage !== "none")
        for (const m of cs.backgroundImage.match(/rgba?\([^)]+\)/g) || []) {
          const c = color(m); if (c && c.a > 0) capas.push(c);
        }
      if (!capas.length) continue;
      const siguiente = [];
      for (const base of acumulado) for (const capa of capas) siguiente.push(componer(capa, base));
      // si alguna capa es opaca, lo que hay más afuera deja de verse
      acumulado = capas.some(c => c.a >= 0.999) ? siguiente : siguiente.concat(acumulado);
      if (acumulado.length > 12) acumulado = acumulado.slice(0, 12);
    }
    return acumulado;
  };

  const fallos = [];
  document.querySelectorAll("body *").forEach(el => {
    if (el.offsetParent === null) return;                       // oculto
    const propio = [...el.childNodes]
      .filter(n => n.nodeType === 3 && n.textContent.trim())
      .map(n => n.textContent.trim()).join(" ");
    if (!propio) return;                                        // no aporta texto propio
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || parseFloat(cs.opacity) < 0.1) return;
    const frente = color(cs.color);
    if (!frente) return;

    const px = parseFloat(cs.fontSize);
    const grande = px >= 24 || (px >= 18.66 && parseInt(cs.fontWeight) >= 700);
    const minimo = grande ? 3 : 4.5;                            // umbrales WCAG AA

    let peor = Infinity, peorFondo = null;
    for (const fondo of fondosDe(el)) {
      const c = contraste(frente.a < 1 ? componer(frente, fondo) : frente.c, fondo);
      if (c < peor) { peor = c; peorFondo = fondo; }
    }
    if (peor < minimo)
      fallos.push({ etiqueta: el.tagName.toLowerCase(), clase: (el.className || "").toString().slice(0,32),
                    texto: propio.slice(0,56), ratio: +peor.toFixed(2), minimo,
                    frente: cs.color, fondo: `rgb(${peorFondo})` });
  });
  return fallos;
};

// ── Recorrido ───────────────────────────────────────────────────────────────────
const paginas = readdirSync(RAIZ).filter(f => f.endsWith(".html")).sort();
const navegador = await chromium.launch();
const pagina = await navegador.newPage({ viewport: { width: 1440, height: 1000 } });
// El entorno puede no tener salida a internet; sin esto la carga espera a fuentes
// externas que nunca responden.
await pagina.route("**/*", r => r.request().url().startsWith(`http://127.0.0.1:${PUERTO}`) ? r.continue() : r.abort());

const todos = [];
for (const p of paginas) {
  await pagina.goto(`http://127.0.0.1:${PUERTO}/${p}`, { waitUntil: "domcontentloaded", timeout: 20000 });
  await pagina.waitForTimeout(400);
  await pagina.evaluate(() => window.scrollTo(0, document.body.scrollHeight));  // dispara las animaciones de entrada
  await pagina.waitForTimeout(500);
  const fallos = await pagina.evaluate(MEDIR);
  fallos.forEach(f => todos.push({ ...f, pagina: p }));
  console.log(`${fallos.length ? "✗" : "✓"} ${p.padEnd(24)} ${fallos.length || ""}`);
}
await navegador.close();
servidor.close();

if (todos.length) {
  const grupos = new Map();
  for (const f of todos) {
    const clave = `${f.frente} sobre ${f.fondo}`;
    if (!grupos.has(clave)) grupos.set(clave, []);
    grupos.get(clave).push(f);
  }
  console.log("\nAgrupado por par de colores (normalmente son pocos tokens, no muchos casos sueltos):");
  for (const [clave, lista] of [...grupos].sort((a,b) => b[1].length - a[1].length)) {
    const peor = Math.min(...lista.map(f => f.ratio));
    console.log(`  ${String(lista.length).padStart(3)}×  ${clave}   peor ${peor.toFixed(2)}:1`);
    console.log(`        ej. ${lista[0].pagina} <${lista[0].etiqueta}.${lista[0].clase}> "${lista[0].texto}"`);
  }
  console.log(`\n${todos.length} textos por debajo del mínimo AA (4,5:1 normal · 3:1 texto grande).`);
  process.exit(1);
}
console.log("\nTodo el texto visible cumple el mínimo AA de contraste.");
