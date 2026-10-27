// Construye los sprites a partir de las cuadrículas de texto de art/sprites/**.mjs
//
// - Valida tamaño y que todos los colores pertenezcan a Resurrect 64.
// - Añade el contorno de 1 px (4 vecinos) con el color OUTLINE.
// - Escribe public/assets/sprites/<key>.png (fotogramas en tira horizontal)
//   y public/assets/sprites/manifest.json.
// - Escribe art/preview/<key>.png (×8) y art/preview/index.html (galería animada).
//
// Uso: node scripts/sprites/build.mjs [filtro]
import { readdirSync, mkdirSync, writeFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { deflateSync, crc32 } from 'node:zlib';
import { R64, OUTLINE } from '../../art/palette-r64.mjs';

const ROOT = resolve(import.meta.dirname, '../..');
const SRC = join(ROOT, 'art/sprites');
const OUT = join(ROOT, 'public/assets/sprites');
const PREVIEW = join(ROOT, 'art/preview');
const SCALE = 8;
const PALETTE = new Set(R64);

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.mjs') ? [p] : [];
  });
}

function hexToRgba(hex) {
  return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16), 255];
}

// Convierte un fotograma (filas de texto) en una matriz de hex|null y valida.
function parseFrame(def, rows, fi) {
  const [w, h] = def.size;
  if (rows.length > h) throw new Error(`${def.key} f${fi}: ${rows.length} filas > ${h}`);
  const grid = [];
  for (let y = 0; y < h; y++) {
    const row = (rows[y] ?? '').padEnd(w, '.');
    if (row.length > w) throw new Error(`${def.key} f${fi} fila ${y}: ${row.length} columnas > ${w}`);
    grid.push([...row].map((ch, x) => {
      if (ch === '.') return null;
      const hex = def.legend[ch];
      if (!hex) throw new Error(`${def.key} f${fi} (${x},${y}): carácter '${ch}' sin leyenda`);
      return hex;
    }));
  }
  return grid;
}

function addOutline(grid) {
  const h = grid.length, w = grid[0].length;
  const out = grid.map((r) => r.slice());
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (grid[y][x]) continue;
    const n = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => grid[y + dy]?.[x + dx]);
    if (n) out[y][x] = OUTLINE;
  }
  return out;
}

function encodePng(w, h, pixel /* (x,y) => [r,g,b,a] */) {
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (w * 4 + 1)] = 0;
    for (let x = 0; x < w; x++) raw.set(pixel(x, y), y * (w * 4 + 1) + 1 + x * 4);
  }
  const chunk = (type, data) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type), data]);
    const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
    return Buffer.concat([len, td, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6; // 8 bits, RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0)),
  ]);
}

async function main() {
  const filter = process.argv[2];
  mkdirSync(OUT, { recursive: true });
  mkdirSync(PREVIEW, { recursive: true });
  const manifest = [];
  const gallery = [];

  for (const file of walk(SRC).sort()) {
    const def = (await import(pathToFileURL(file).href)).default;
    if (filter && !def.key.includes(filter)) continue;
    for (const [ch, hex] of Object.entries(def.legend)) {
      if (!PALETTE.has(hex)) throw new Error(`${def.key}: '${ch}' = ${hex} no está en Resurrect 64`);
    }
    const [w, h] = def.size;
    const frames = def.frames.map((rows, i) => {
      const g = parseFrame(def, rows, i);
      return def.outline === false ? g : addOutline(g);
    });
    const n = frames.length;
    const at = (x, y) => frames[Math.floor(x / w)][y][x % w];

    const png = encodePng(w * n, h, (x, y) => { const c = at(x, y); return c ? hexToRgba(c) : [0, 0, 0, 0]; });
    writeFileSync(join(OUT, `${def.key}.png`), png);

    // Vista previa ×8 con fondo a cuadros para distinguir la transparencia.
    const big = encodePng(w * n * SCALE, h * SCALE, (x, y) => {
      const c = at(Math.floor(x / SCALE), Math.floor(y / SCALE));
      if (c) return hexToRgba(c);
      return ((x >> 4) + (y >> 4)) % 2 ? [74, 68, 84, 255] : [58, 52, 68, 255];
    });
    writeFileSync(join(PREVIEW, `${def.key}.png`), big);

    const anim = def.anim ?? [...Array(n).keys()];
    manifest.push({ key: def.key, file: `${def.key}.png`, frameWidth: w, frameHeight: h, frames: n, anim, fps: def.fps ?? 6 });
    gallery.push({ key: def.key, name: def.name ?? def.key, w, h, n, anim, fps: def.fps ?? 6, data: png.toString('base64') });
    console.log(`✓ ${def.key} (${w}×${h}, ${n} fotogramas) ← ${relative(ROOT, file)}`);
  }

  if (!filter) writeFileSync(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  writeFileSync(join(PREVIEW, 'index.html'), galleryHtml(gallery));
}

function galleryHtml(items) {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Sprites</title>
<style>
body{margin:0;padding:16px;background:#2e222f;color:#c7dcd0;font:14px system-ui,sans-serif}
h1{font-size:18px;margin:0 0 12px}.grid{display:flex;flex-wrap:wrap;gap:16px}
.card{background:#3e3546;border-radius:8px;padding:12px}.card h2{font-size:14px;margin:0 0 8px}
canvas{image-rendering:pixelated;background:repeating-conic-gradient(#4a4454 0 25%,#3a3444 0 50%) 0 0/16px 16px;display:block}
.row{display:flex;gap:12px;align-items:flex-end}.lbl{font-size:12px;opacity:.7;margin-top:4px}
</style></head><body><h1>Sprites (×8)</h1><div class="grid" id="g"></div>
<script>
const items=${JSON.stringify(items)};
const S=8,g=document.getElementById('g');
for(const it of items){
  const card=document.createElement('div');card.className='card';
  card.innerHTML='<h2>'+it.name+' <small>('+it.key+')</small></h2>';
  const row=document.createElement('div');row.className='row';card.appendChild(row);g.appendChild(card);
  const img=new Image();img.src='data:image/png;base64,'+it.data;
  img.onload=()=>{
    const mk=(lbl)=>{const w=document.createElement('div');const c=document.createElement('canvas');c.width=it.w*S;c.height=it.h*S;
      const x=c.getContext('2d');x.imageSmoothingEnabled=false;w.appendChild(c);const l=document.createElement('div');l.className='lbl';l.textContent=lbl;w.appendChild(l);row.appendChild(w);return x;};
    const anim=mk('animado');
    for(let i=0;i<it.n;i++){mk('f'+i).drawImage(img,i*it.w,0,it.w,it.h,0,0,it.w*S,it.h*S);}
    let k=0;setInterval(()=>{const f=it.anim[k++%it.anim.length];anim.clearRect(0,0,it.w*S,it.h*S);anim.drawImage(img,f*it.w,0,it.w,it.h,0,0,it.w*S,it.h*S);},1000/it.fps);
  };
}
</script></body></html>
`;
}

main().catch((e) => { console.error('✗', e.message); process.exit(1); });
