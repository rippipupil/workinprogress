# Arcana Nocturna (MVP) — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir el MVP jugable de *Arcana Nocturna*: un survivor web de magos elementales en pixel art, con modo sin fin, progresión entre partidas y anuncios, desplegado en GitHub Pages.

**Architecture:** La lógica pura (`src/core`, `src/meta`, `src/data`) no depende de Phaser y se prueba con Vitest. Los sistemas de Phaser (`src/systems`) y las escenas (`src/scenes`) la consumen. Cada fotograma, el `GameScene` avanza la simulación con paso fijo sobre un `RunState` único. Para verificar sin intervención manual, un modo debug (`?debug=1`) expone `window.__arcana`, que usa un script de Playwright.

**Tech Stack:** Phaser 3.90.0, TypeScript 5.8.3, Vite 6.3.5, Vitest 3.2.4, @fontsource/pixelify-sans 5.2.5, Playwright (preinstalado, solo para la prueba de humo local), GitHub Actions + GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-10-27-magos-survivors-design.md`. Los números de sección (§) de este plan se refieren a esa spec.

## Global Constraints

- Resolución lógica **480×270**, `pixelArt: true`, `roundPixels: true`, `Phaser.Scale.FIT`, centrado.
- `src/data` y `src/core` **no importan Phaser**. `src/meta` solo importa `data` y `core`.
- Simulación con paso fijo de **1/60 s**, con **máximo 4 pasos** por fotograma.
- Topes de entidades: **400 enemigos** (si se llega al tope, se recicla el más lejano), **300 proyectiles** y **500 gemas** (si se pasa, se fusionan en una gema grande con la XP sumada).
- Clave de guardado: **`arcana.save.v1`**. Las copias corruptas se guardan en `arcana.save.corrupt.<timestamp>`.
- Variables de entorno: `VITE_ADSENSE_CLIENT`, `VITE_ADSENSE_BANNER_SLOT`, `BASE_PATH` (por defecto `/workinprogress/`).
- Todo el arte se genera en código (`src/art`) con claves estables. Nada de recursos de terceros salvo la fuente Pixelify Sans (OFL).
- Textos de la interfaz en **español**. Identificadores de código en inglés.
- Versiones exactas en `package.json` (sin `^` ni `~`).
- Los mensajes de commit terminan con el bloque de atribución que indique la sesión.
- Antes de cada commit: `npm test` y `npx tsc --noEmit` en verde. Desde la Tarea 6, también `npm run build`.

## Review Focus

1. **Mucha XP de golpe** (gema grande fusionada, imán): las subidas de nivel se encolan y se muestran una tras otra, sin perder ninguna. Prueba en la Tarea 4 (`addXp` devuelve varios niveles).
2. **Volver de una pestaña en segundo plano** (delta de 10 s o más): la simulación no da saltos de minutos ni se cuelga. Ejecuta como mucho 4 pasos. Prueba en la Tarea 2 (`createFixedStep`).
3. **Navegador con almacenamiento lleno o bloqueado** (`setItem` lanza `QuotaExceededError`, `localStorage` lanza al acceder): el juego sigue en memoria y avisa una vez. Prueba en la Tarea 5.
4. **Build completo** (6 tomos al nivel 8 o evolucionados y 6 pasivas al máximo): subir de nivel o abrir un cofre ofrece oro o cura, nunca una lista vacía. Pruebas en las Tareas 3 y 4.
5. **AdSense cargado a medias** (un bloqueador deja `adBreak` definido pero nunca llama a sus callbacks): `showRewarded` resuelve `'unavailable'` en 5 s y la pantalla de fin de partida sigue funcionando. Prueba en la Tarea 13.

---

## Mapa de archivos

```
index.html
package.json, tsconfig.json, vite.config.ts, vitest.config.ts
.github/workflows/deploy.yml
scripts/smoke.cjs
src/
  main.ts            config.ts          events.ts         debug.ts
  data/   types.ts mages.ts tomes.ts passives.ts enemies.ts bosses.ts waves.ts upgrades.ts missions.ts textures.ts
  core/   rng.ts spatialHash.ts loop.ts stats.ts leveling.ts evolution.ts status.ts damage.ts difficulty.ts score.ts run.ts
  meta/   save.ts wallet.ts unlocks.ts missionTracker.ts
  art/    palette.ts placeholders.ts
  audio/  sfx.ts
  ads/    AdProvider.ts NoopAdProvider.ts AdSenseH5Provider.ts createAdProvider.ts
  ui/     Button.ts Panel.ts Bar.ts VirtualJoystick.ts OrientationOverlay.ts text.ts
  systems/ Player.ts Ground.ts EnemySystem.ts ProjectileSystem.ts TomeSystem.ts SpecialSystem.ts PickupSystem.ts BossSystem.ts DamageNumbers.ts Spawner.ts
  scenes/ BootScene.ts MenuScene.ts CharacterSelectScene.ts UpgradesScene.ts MissionsScene.ts GameScene.ts HUDScene.ts LevelUpScene.ts PauseScene.ts GameOverScene.ts
tests/  (refleja core/, meta/, data/, ads/)
```

---

### Task 1: Esqueleto del proyecto, CI y despliegue

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `vitest.config.ts`, `index.html`, `.gitignore`, `src/main.ts`, `src/config.ts`, `src/scenes/BootScene.ts`, `src/scenes/MenuScene.ts`, `.github/workflows/deploy.yml`, `README.md`
- Test: `tests/config.test.ts`

**Interfaces:**
- Produces:
  - `src/config.ts`: `GAME_WIDTH = 480`, `GAME_HEIGHT = 270`, `FIXED_DT = 1/60`, `MAX_STEPS = 4`, `MAX_ENEMIES = 400`, `MAX_PROJECTILES = 300`, `MAX_GEMS = 500`, `SAVE_KEY = 'arcana.save.v1'`, `SAVE_VERSION = 1`, `FONT = 'Pixelify Sans'`.
  - Claves de escena (`SceneKey`): `'Boot' | 'Menu' | 'CharacterSelect' | 'Upgrades' | 'Missions' | 'Game' | 'HUD' | 'LevelUp' | 'Pause' | 'GameOver'`, exportadas como el objeto `SCENES`.

- [ ] **Step 1: Crear `package.json`**
  - Scripts: `dev` (`vite`), `build` (`tsc --noEmit && vite build`), `preview` (`vite preview --port 4173`), `test` (`vitest run`), `smoke` (`npm run build && node scripts/smoke.cjs`).
  - Dependencias: `phaser@3.90.0`, `@fontsource/pixelify-sans@5.2.5`.
  - devDependencies: `typescript@5.8.3`, `vite@6.3.5`, `vitest@3.2.4`.
  - Ejecutar `npm install`.
- [ ] **Step 2: Configuración**
  - `tsconfig.json`: `strict: true`, `target: ES2022`, `module: ESNext`, `moduleResolution: bundler`, `types: ["vite/client"]`, `include: ["src", "tests"]`.
  - `vite.config.ts`: `base: process.env.BASE_PATH ?? '/workinprogress/'`.
  - `vitest.config.ts`: `environment: 'node'`, `include: ['tests/**/*.test.ts']`.
  - `.gitignore`: `node_modules`, `dist`.
- [ ] **Step 3: Escribir el test que falla**

```ts
// tests/config.test.ts
import { GAME_WIDTH, GAME_HEIGHT, FIXED_DT, MAX_STEPS, SAVE_KEY, SCENES } from '../src/config';
test('constantes globales de la spec', () => {
  expect([GAME_WIDTH, GAME_HEIGHT]).toEqual([480, 270]);
  expect(FIXED_DT).toBeCloseTo(1 / 60);
  expect(MAX_STEPS).toBe(4);
  expect(SAVE_KEY).toBe('arcana.save.v1');
  expect(Object.values(SCENES)).toHaveLength(10);
});
```

- [ ] **Step 4: Ejecutar `npm test`** → FAIL (no existe el módulo).
- [ ] **Step 5: Implementar `src/config.ts`, `index.html`, `src/main.ts`, `BootScene` y `MenuScene` mínimos**
  - `index.html`:
    - fondo `#0b0a10` y `<div id="game">`;
    - `<div id="ad-banner">` con posición absoluta abajo y centrada, oculto por defecto;
    - `<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">`.
  - `main.ts`:
    - importa `@fontsource/pixelify-sans/400.css`;
    - crea `Phaser.Game` con los parámetros de Global Constraints, `backgroundColor: '#0b0a10'`, `input.activePointers: 3` y escenas `[BootScene, MenuScene]`.
  - `BootScene`: espera a `document.fonts.load('8px "Pixelify Sans"')` y arranca `Menu`.
  - `MenuScene`: muestra el título "ARCANA NOCTURNA".
- [ ] **Step 6: Ejecutar `npm test && npm run build`** → PASS y existe `dist/index.html`.
- [ ] **Step 7: Workflow `.github/workflows/deploy.yml`**
  - Se ejecuta en `push` a `main` y con `workflow_dispatch`.
  - Job `build`:
    - `actions/checkout@v4`;
    - `actions/setup-node@v4` con Node 22 y caché de npm;
    - `npm ci`, `npm test`, `npm run build`;
    - `actions/upload-pages-artifact@v3` con `path: dist`.
  - Job `deploy`: `actions/deploy-pages@v4` con `permissions: pages: write, id-token: write` y `environment: github-pages`.
  - El build lleva las variables `VITE_ADSENSE_CLIENT: ${{ vars.ADSENSE_CLIENT }}` y `VITE_ADSENSE_BANNER_SLOT: ${{ vars.ADSENSE_BANNER_SLOT }}`.
  - `README.md`: cómo arrancar, ejecutar tests y desplegar. Incluye que hay que activar Pages con origen "GitHub Actions", que para AdSense hace falta dominio propio y que `BASE_PATH=/` es para dominio propio.
- [ ] **Step 8: Commit** — `chore: scaffold Phaser + Vite + TS project with Pages deploy`

---

### Task 2: Utilidades base (RNG, rejilla espacial, paso fijo)

**Files:**
- Create: `src/core/rng.ts`, `src/core/spatialHash.ts`, `src/core/loop.ts`
- Test: `tests/core/rng.test.ts`, `tests/core/spatialHash.test.ts`, `tests/core/loop.test.ts`

**Interfaces:**
- Produces:
  - `interface Rng { next(): number /*[0,1)*/; int(min: number, max: number): number /*inclusivo*/; chance(p: number): boolean; pick<T>(arr: readonly T[]): T; weighted<K extends string>(w: Partial<Record<K, number>>): K; shuffle<T>(arr: T[]): T[] }`
  - `createRng(seed: number): Rng` (mulberry32).
  - `interface Positioned { x: number; y: number }`
  - `class SpatialHash<T extends Positioned> { constructor(cellSize: number); clear(): void; insert(item: T): void; queryRadius(x: number, y: number, r: number, out: T[]): T[]; nearest(x: number, y: number, maxR: number, filter?: (t: T) => boolean): T | null }`. `out` se vacía y se rellena, y se devuelve el mismo array para no reservar memoria.
  - `createFixedStep(step: number, maxSteps: number): { advance(dtSeconds: number, update: (dt: number) => void): number }`. Devuelve los pasos ejecutados. Si se alcanza `maxSteps`, descarta el resto acumulado.

- [ ] **Step 1: Escribir los tests que fallan**

```ts
// rng
test('misma semilla, misma secuencia', () => {
  const a = createRng(42), b = createRng(42);
  expect([a.next(), a.next(), a.int(1, 6)]).toEqual([b.next(), b.next(), b.int(1, 6)]);
});
test('weighted respeta pesos 0', () => {
  const r = createRng(1);
  for (let i = 0; i < 200; i++) expect(r.weighted({ a: 1, b: 0 })).toBe('a');
});
// spatialHash (celda 32)
test('queryRadius devuelve solo los que están dentro del radio', () => {
  const h = new SpatialHash<Positioned>(32);
  const near = { x: 10, y: 10 }, far = { x: 200, y: 200 }, edge = { x: 40, y: 10 };
  [near, far, edge].forEach(p => h.insert(p));
  expect(h.queryRadius(0, 0, 31, []).sort()).toEqual([near]);
  expect(h.queryRadius(0, 10, 40, [])).toHaveLength(2);
});
test('nearest con filtro y radio máximo', () => {
  const h = new SpatialHash<Positioned & { id: number }>(32);
  h.insert({ x: 5, y: 0, id: 1 }); h.insert({ x: 50, y: 0, id: 2 });
  expect(h.nearest(0, 0, 100)?.id).toBe(1);
  expect(h.nearest(0, 0, 100, t => t.id !== 1)?.id).toBe(2);
  expect(h.nearest(0, 0, 10, t => t.id !== 1)).toBeNull();
});
// loop
test('ejecuta pasos enteros y acumula el resto', () => {
  const fs = createFixedStep(1 / 60, 4); let n = 0;
  expect(fs.advance(1 / 30, () => n++)).toBe(2);
  expect(fs.advance(1 / 120, () => n++)).toBe(0);
  expect(fs.advance(1 / 120, () => n++)).toBe(1);
});
test('Review Focus 2: delta enorme se limita a 4 pasos y no se arrastra', () => {
  const fs = createFixedStep(1 / 60, 4); let n = 0;
  expect(fs.advance(10, () => n++)).toBe(4);
  expect(fs.advance(1 / 60, () => n++)).toBe(1);
});
```

- [ ] **Step 2: Ejecutar `npm test`** → FAIL.
- [ ] **Step 3: Implementar los tres módulos** según las interfaces. Las celdas de la rejilla van en un `Map<number, T[]>` con clave `cx * 73856093 ^ cy * 19349663`. `nearest` recorre anillos de celdas crecientes hasta `maxR`.
- [ ] **Step 4: Ejecutar `npm test`** → PASS.
- [ ] **Step 5: Commit** — `feat(core): seeded rng, spatial hash and fixed-step loop`

---

### Task 3: Modelo de datos del contenido (tipos, magos, tomos, pasivas)

**Files:**
- Create: `src/data/types.ts`, `src/data/tomes.ts`, `src/data/passives.ts`, `src/data/mages.ts`
- Test: `tests/data/content.test.ts`

**Interfaces:**
- Produces (`src/data/types.ts`):

```ts
export type Element = 'fire' | 'ice' | 'lightning';
export type StatKey = 'maxHp' | 'armor' | 'speed' | 'power' | 'area' | 'cooldown' | 'duration'
  | 'amount' | 'projectileSpeed' | 'magnet' | 'luck' | 'greed' | 'statusPower' | 'recovery' | 'specialCooldown';
export type Stats = Record<StatKey, number>;
export interface StatMod { stat: StatKey; pct?: number; flat?: number }
export type Slot = 1 | 2 | 3 | 4 | 5 | 6;
export type TomeBehavior = 'projectile' | 'orbit' | 'aura' | 'zone' | 'cone' | 'nova';
export interface TomeParams { damage: number; cooldown: number; amount: number; area: number; speed: number;
  pierce: number; bounce: number; duration: number }
export type EvolutionExtra = 'infinitePierce' | 'persistentOrbit' | 'reflectProjectiles' | 'lingeringZone' | 'bidirectional' | 'doubleNova';
export interface EvolutionDef { id: string; name: string; mult: Partial<TomeParams>; extra: EvolutionExtra; texture: string }
export interface TomeDef { id: string; name: string; element: Element; slot: Slot; behavior: TomeBehavior;
  levels: TomeParams[] /* length 8, index 0 = nivel 1 */; passiveId: string; evolution: EvolutionDef; texture: string }
export interface PassiveDef { id: string; name: string; slot: Slot; maxLevel: 5; modsAt(level: number): StatMod[]; texture: string }
export type WeaponTrait = 'burnSpread' | 'slowedBonus' | 'chainExtra';
export type SpecialId = 'eruption' | 'blizzard' | 'lightningStep';
export type MageUnlock = { type: 'default' } | { type: 'gold'; cost: number } | { type: 'mission'; missionId: string };
export interface MageDef { id: 'pyro' | 'cryo' | 'electro'; name: string; element: Element; weaponName: string;
  trait: WeaponTrait; special: { id: SpecialId; name: string; cooldown: number }; mods: StatMod[];
  unlock: MageUnlock; startingTomeId: string; texture: string }
```

- Ids:
  - tomos: `${element}_${slot}` (por ejemplo `fire_1`, `lightning_6`);
  - evoluciones: `${tomeId}_evo`;
  - pasivas: `candle`, `grimoire`, `amulet`, `prism`, `rune`, `chalice` (slots 1–6 en ese orden);
  - magos: `pyro`, `cryo`, `electro`.
- Exports:
  - `TOMES: readonly TomeDef[]`, `tomeById(id): TomeDef`, `tomesForElement(el): TomeDef[]` (ordenados por slot);
  - `PASSIVES`, `passiveById`;
  - `MAGES`, `mageById`.

- [ ] **Step 1: Escribir los tests que fallan** (`tests/data/content.test.ts`)

```ts
test('18 tomos: 6 por elemento, slots 1..6, 8 niveles, evolución propia', () => {
  expect(TOMES).toHaveLength(18);
  for (const el of ['fire', 'ice', 'lightning'] as const)
    expect(tomesForElement(el).map(t => t.slot)).toEqual([1, 2, 3, 4, 5, 6]);
  for (const t of TOMES) {
    expect(t.levels).toHaveLength(8);
    expect(t.evolution.id).toBe(`${t.id}_evo`);
    expect(passiveById(t.passiveId).slot).toBe(t.slot);
    expect(t.evolution.mult.damage ?? 0).toBeGreaterThanOrEqual(1.5);
  }
});
test('cada nivel mejora al menos un parámetro', () => {
  for (const t of TOMES) for (let i = 1; i < 8; i++)
    expect(t.levels[i]).not.toEqual(t.levels[i - 1]);
});
test('valores de nivel 1 (§4.5)', () => {
  expect(tomeById('fire_1').levels[0]).toMatchObject({ damage: 10, cooldown: 1.2, amount: 1, speed: 180 });
  expect(tomeById('ice_1').levels[0].pierce).toBe(1);
  expect(tomeById('lightning_1').levels[0].bounce).toBe(2);
  expect(tomeById('fire_6').levels[0]).toMatchObject({ damage: 25, cooldown: 4, area: 70 });
});
test('nombres de la spec', () => {
  expect(tomeById('fire_1').name).toBe('Ascuas');
  expect(tomeById('ice_3').evolution.name).toBe('Cero Absoluto');
  expect(tomeById('lightning_4').evolution.name).toBe('Juicio Celestial');
});
test('prisma da +1 proyectil en los niveles 1, 3 y 5', () => {
  const amount = (l: number) => passiveById('prism').modsAt(l).find(m => m.stat === 'amount')?.flat ?? 0;
  expect([1, 2, 3, 4, 5].map(amount)).toEqual([1, 1, 2, 2, 3]);
});
test('magos (§4.4)', () => {
  expect(MAGES.map(m => m.id)).toEqual(['pyro', 'cryo', 'electro']);
  expect(mageById('cryo').unlock).toEqual({ type: 'gold', cost: 500 });
  expect(mageById('electro').unlock).toEqual({ type: 'mission', missionId: 'first_boss' });
  expect(mageById('pyro').startingTomeId).toBe('fire_1');
  expect(mageById('electro').special.cooldown).toBe(20);
});
```

- [ ] **Step 2: Ejecutar `npm test`** → FAIL.
- [ ] **Step 3: Implementar `tomes.ts`**
  - Tomar nombres de §4.5 y §4.7 y valores de nivel 1 de la tabla de §4.5:
    - en `area`: radio o alcance en px;
    - en slot 2 (orbe): `amount = 2`, `area = 40`, `speed` = vueltas/s 0.5, `cooldown = 0.5` (reimpacto al mismo enemigo);
    - en slot 3 (aura): `cooldown` = intervalo de tic de 0.5;
    - en slot 5: `area = 70`, ángulo de cono fijo de 60°; en Hielo y Rayo, línea de 120 px con `area = 120`.
  - Generar `levels` con un helper `buildLevels(base, deltas)`. Los deltas de los niveles 2..8 por comportamiento son:

| Comportamiento | N2 | N3 | N4 | N5 | N6 | N7 | N8 |
|---|---|---|---|---|---|---|---|
| projectile | amount+1 | damage+5 | amount+1 | pierce+1, bounce+1 | damage+5 | amount+1 | damage+10, cooldown×0.9 |
| orbit | amount+1 | damage+4 | area+8 | amount+1 | damage+4 | speed×1.25 | amount+1, damage+6 |
| aura | damage+2 | area+6 | damage+2 | area+6 | damage+3 | cooldown×0.85 | damage+4, area+8 |
| zone | amount+1 | damage+8 | area+6 | amount+1 | damage+8 | cooldown×0.85 | amount+2, damage+10 |
| cone | damage+6 | area+15 | cooldown×0.9 | damage+6 | area+15 | pierce+2 | damage+12 |
| nova | damage+10 | area+10 | cooldown×0.9 | damage+10 | area+10 | cooldown×0.9 | damage+20, area+15 |

  - Multiplicadores de evolución: `damage: 1.5` en todas. Además `area: 1.2` en aura, zone y nova; `amount: 1.5` (redondeado hacia abajo) en projectile y orbit. El `extra` según el slot, por orden: `infinitePierce`, `persistentOrbit`, `reflectProjectiles`, `lingeringZone`, `bidirectional`, `doubleNova`.
  - `texture`: `tome_${id}` y `tome_${id}_evo`.
- [ ] **Step 4: Implementar `passives.ts` y `mages.ts`**
  - Pasivas según §4.6, con `pct` por nivel × nivel:
    - Vela: `cooldown` −0.08;
    - Grimorio: `duration` +0.10;
    - Amuleto: `area` +0.10;
    - Prisma: `amount` flat `[1, 1, 2, 2, 3]`;
    - Runa: `power` +0.10;
    - Cáliz: `statusPower` +0.15.
  - Magos según §4.4. Modificadores:
    - pyro: `power` pct +0.10;
    - cryo: `maxHp` pct +0.20;
    - electro: `speed` pct +0.10.
  - Especiales: eruption 25 s, blizzard 30 s, lightningStep 20 s.
  - Rasgos: burnSpread, slowedBonus, chainExtra.
  - Texturas: `mage_${id}`, `passive_${id}`.
- [ ] **Step 5: Ejecutar `npm test`** → PASS.
- [ ] **Step 6: Commit** — `feat(data): mages, tomes with evolutions, passives`

---

### Task 4: Reglas del personaje en partida (estadísticas, niveles, evolución, estado de partida)

**Files:**
- Create: `src/core/stats.ts`, `src/core/leveling.ts`, `src/core/evolution.ts`, `src/core/run.ts`
- Test: `tests/core/stats.test.ts`, `tests/core/leveling.test.ts`, `tests/core/evolution.test.ts`, `tests/core/run.test.ts`

**Interfaces:**
- Consumes: Tarea 2 (`Rng`) y Tarea 3 (tipos, `TOMES`, `PASSIVES`, `MAGES`).
- Produces:

```ts
// stats.ts
export const BASE_STATS: Stats; // §4.2: maxHp 100, armor 0, speed 60, power 1, area 1, cooldown 1, duration 1, amount 0,
                                // projectileSpeed 1, magnet 30, luck 1, greed 1, statusPower 1, recovery 0, specialCooldown 1
export function computeStats(mods: StatMod[]): Stats; // base × (1 + Σpct) + Σflat
export function passiveMods(passives: Record<string, number>): StatMod[];
// leveling.ts
export interface BuildState { tomes: Record<string, number>; evolved: string[]; passives: Record<string, number> }
export type LevelUpOption =
  | { kind: 'newTome'; tomeId: string } | { kind: 'tomeUp'; tomeId: string }
  | { kind: 'newPassive'; passiveId: string } | { kind: 'passiveUp'; passiveId: string }
  | { kind: 'gold'; amount: 25 } | { kind: 'heal'; pct: 0.3 };
export function xpToNext(level: number): number;
export function upgradePool(build: BuildState, element: Element): LevelUpOption[];
export function rollLevelUpOptions(build: BuildState, element: Element, luck: number, rng: Rng): LevelUpOption[];
export function applyOption(build: BuildState, opt: LevelUpOption): BuildState; // inmutable; gold/heal no cambian el build
// evolution.ts
export function availableEvolutions(build: BuildState): string[]; // tomeIds
export type ChestReward = { kind: 'evolution'; tomeId: string } | { kind: 'upgrades'; options: LevelUpOption[] };
export function rollChest(build: BuildState, element: Element, rng: Rng, forceEvolution?: boolean): ChestReward;
export function applyChest(build: BuildState, reward: ChestReward): BuildState;
export function tomeParams(tomeId: string, build: BuildState): TomeParams; // nivel actual o evolución aplicada
// run.ts
export interface RunCounters { kills: number; burned: number; frozen: number; electrocuted: number;
  bosses: number; minibosses: number; evolutions: number }
export interface RunState { mageId: MageDef['id']; seed: number; elapsed: number; level: number; xp: number;
  hp: number; stats: Stats; metaMods: StatMod[]; build: BuildState; pendingLevelUps: number; rerollsLeft: number;
  gold: number; reviveUsed: boolean; specialReadyIn: number; invulnFor: number; counters: RunCounters }
export function createRun(mage: MageDef, metaMods: StatMod[], seed: number): RunState;
export function recomputeStats(run: RunState): void; // mage.mods + metaMods + passiveMods; ajusta hp si sube maxHp
export function addXp(run: RunState, amount: number): number; // niveles ganados; incrementa pendingLevelUps
export function revive(run: RunState): void; // hp = 50% maxHp, reviveUsed = true, invulnFor = 2
```

- [ ] **Step 1: Escribir los tests que fallan**

```ts
// stats
test('pct se suman y flat se añade al final', () => {
  const s = computeStats([{ stat: 'power', pct: 0.1 }, { stat: 'power', pct: 0.05 }, { stat: 'armor', flat: 2 }]);
  expect(s.power).toBeCloseTo(1.15); expect(s.armor).toBe(2); expect(s.maxHp).toBe(100);
});
test('vela nivel 3 reduce recarga un 24%', () => {
  expect(computeStats(passiveMods({ candle: 3 })).cooldown).toBeCloseTo(0.76);
});
// leveling
test('curva de XP (§4.1)', () => {
  expect([1, 2, 19, 20, 21].map(xpToNext)).toEqual([5, 15, 185, 198, 211]);
});
test('opciones distintas; 4 si suerte ≥ 1.2', () => {
  const b: BuildState = { tomes: { fire_1: 1 }, evolved: [], passives: {} };
  const o3 = rollLevelUpOptions(b, 'fire', 1, createRng(3));
  expect(o3).toHaveLength(3); expect(new Set(o3.map(o => JSON.stringify(o))).size).toBe(3);
  expect(rollLevelUpOptions(b, 'fire', 1.2, createRng(3))).toHaveLength(4);
});
test('respeta máximos: 6 tomos, nivel 8, 6 pasivas, nivel 5; no ofrece tomos evolucionados', () => {
  const b: BuildState = { tomes: { fire_1: 8, fire_2: 8, fire_3: 8, fire_4: 8, fire_5: 8, fire_6: 7 }, evolved: ['fire_1'],
    passives: { candle: 5, grimoire: 5, amulet: 5, prism: 5, rune: 5, chalice: 4 } };
  expect(upgradePool(b, 'fire')).toEqual([{ kind: 'tomeUp', tomeId: 'fire_6' }, { kind: 'passiveUp', passiveId: 'chalice' }]);
});
test('Review Focus 4: build completo ofrece oro y cura', () => {
  const full: BuildState = { tomes: Object.fromEntries(tomesForElement('ice').map(t => [t.id, 8])), evolved: [],
    passives: Object.fromEntries(PASSIVES.map(p => [p.id, 5])) };
  expect(rollLevelUpOptions(full, 'ice', 1, createRng(1))).toEqual([{ kind: 'gold', amount: 25 }, { kind: 'heal', pct: 0.3 }]);
});
// evolution
test('requiere nivel 8 y su pasiva emparejada', () => {
  expect(availableEvolutions({ tomes: { fire_1: 8 }, evolved: [], passives: { candle: 1 } })).toEqual(['fire_1']);
  expect(availableEvolutions({ tomes: { fire_1: 7 }, evolved: [], passives: { candle: 1 } })).toEqual([]);
  expect(availableEvolutions({ tomes: { fire_1: 8 }, evolved: [], passives: { rune: 1 } })).toEqual([]);
  expect(availableEvolutions({ tomes: { fire_1: 8 }, evolved: ['fire_1'], passives: { candle: 1 } })).toEqual([]);
});
test('cofre da evolución si hay; parámetros evolucionados ×1.5 de daño', () => {
  const b: BuildState = { tomes: { fire_1: 8 }, evolved: [], passives: { candle: 1 } };
  const r = rollChest(b, 'fire', createRng(1));
  expect(r).toEqual({ kind: 'evolution', tomeId: 'fire_1' });
  const after = applyChest(b, r);
  expect(after.evolved).toEqual(['fire_1']);
  expect(tomeParams('fire_1', after).damage).toBeCloseTo(tomeById('fire_1').levels[7].damage * 1.5);
});
test('Review Focus 4: cofre con build completo da oro', () => {
  const full: BuildState = { tomes: Object.fromEntries(tomesForElement('ice').map(t => [t.id, 8])),
    evolved: tomesForElement('ice').map(t => t.id), passives: Object.fromEntries(PASSIVES.map(p => [p.id, 5])) };
  const r = rollChest(full, 'ice', createRng(1));
  expect(r.kind).toBe('upgrades');
  if (r.kind === 'upgrades') expect(r.options.every(o => o.kind === 'gold')).toBe(true);
});
// run
test('Review Focus 1: mucha XP encola varias subidas', () => {
  const run = createRun(mageById('pyro'), [], 1);
  expect(addXp(run, 5 + 15 + 25 + 3)).toBe(3);
  expect(run.level).toBe(4); expect(run.xp).toBe(3); expect(run.pendingLevelUps).toBe(3);
});
test('createRun aplica mods del mago y tomo inicial', () => {
  const run = createRun(mageById('cryo'), [{ stat: 'maxHp', pct: 0.1 }], 1);
  expect(run.stats.maxHp).toBeCloseTo(130); expect(run.hp).toBeCloseTo(130);
  expect(run.build.tomes).toEqual({ ice_1: 1 }); expect(run.rerollsLeft).toBe(1);
});
test('revive', () => {
  const run = createRun(mageById('pyro'), [], 1); run.hp = 0; revive(run);
  expect(run.hp).toBe(50); expect(run.reviveUsed).toBe(true); expect(run.invulnFor).toBe(2);
});
```

- [ ] **Step 2: Ejecutar `npm test`** → FAIL.
- [ ] **Step 3: Implementar los cuatro módulos**
  - `upgradePool` sigue este orden: newTome de los slots que faltan, tomeUp, newPassive, passiveUp. Así el test de orden es determinista.
  - `rollLevelUpOptions`:
    - si el pool está vacío, devuelve oro y cura;
    - si no, `count = luck >= 1.2 ? 4 : 3` sin repetición (`rng.shuffle` + slice).
  - `rollChest`:
    - si hay evoluciones, `rng.pick` entre ellas;
    - si no, cantidad con `rng.weighted({1: 0.6, 2: 0.3, 3: 0.1})`, sacando opciones del pool sin repetir y aplicándolas en cadena;
    - si el pool está vacío, `{kind:'gold', amount:25}` por cada una.
  - `tomeParams` multiplica cada campo de `mult`. El campo `amount` se redondea hacia abajo.
- [ ] **Step 4: Ejecutar `npm test`** → PASS.
- [ ] **Step 5: Commit** — `feat(core): stats, leveling, evolution and run state`

---

### Task 5: Persistencia y meta-progresión

**Files:**
- Create: `src/data/upgrades.ts`, `src/data/missions.ts`, `src/meta/save.ts`, `src/meta/wallet.ts`, `src/meta/unlocks.ts`, `src/meta/missionTracker.ts`, `src/core/score.ts`
- Test: `tests/meta/save.test.ts`, `tests/meta/wallet.test.ts`, `tests/meta/missionTracker.test.ts`, `tests/core/score.test.ts`

**Interfaces:**
- Consumes: Tarea 3 (`MAGES`, `StatMod`) y Tarea 4 (`RunState`, `RunCounters`).
- Produces:

```ts
// data/upgrades.ts — §4.12; ids: vitality might haste armor magnet fortune greed focus
export interface UpgradeDef { id: string; name: string; maxLevel: number; baseCost: number; perLevel: StatMod; texture: string }
export const UPGRADES: readonly UpgradeDef[]; export function upgradeById(id: string): UpgradeDef;
// data/missions.ts — §4.12, 12 misiones
export type MissionMetric = 'totalKills' | 'bestSeconds' | 'totalMinibosses' | 'totalBosses' | 'totalEvolutions'
  | 'totalBurned' | 'totalFrozen' | 'totalElectrocuted' | 'bestLevel';
export interface MissionDef { id: string; name: string; metric: MissionMetric; target: number;
  reward: { gold: number } | { unlockMage: MageDef['id'] } }
export const MISSIONS: readonly MissionDef[];
// ids: kills_500 kills_5000 survive_5 survive_15 survive_30 first_miniboss first_boss evolve_1 burn_1000 freeze_500 shock_1000 level_40
// survive_* usan bestSeconds con target en segundos (300, 900, 1800); level_40 usa bestLevel
// meta/save.ts
export interface Settings { volume: number; muted: boolean; damageNumbers: boolean; screenShake: boolean }
export interface SaveData { version: 1; gold: number; upgrades: Record<string, number>; unlockedMages: MageDef['id'][];
  missionsClaimed: string[]; stats: Record<MissionMetric, number>;
  records: Partial<Record<MageDef['id'], { bestSeconds: number; bestScore: number }>>; settings: Settings }
export interface StorageLike { getItem(k: string): string | null; setItem(k: string, v: string): void }
export type SaveWarning = 'corrupt' | 'unavailable';
export function defaultSave(): SaveData; // gold 0, unlockedMages ['pyro'], volume 0.6
export function migrate(raw: unknown): SaveData; // lanza si no es reconocible
export function loadSave(getStorage: () => StorageLike | null, now?: () => number): { save: SaveData; warning?: SaveWarning };
export function writeSave(getStorage: () => StorageLike | null, save: SaveData): boolean; // false si falla
// meta/wallet.ts
export function upgradeCost(def: UpgradeDef, nextLevel: number): number; // baseCost × nextLevel
export function buyUpgrade(save: SaveData, id: string): { ok: boolean; save: SaveData };
export function metaMods(save: SaveData): StatMod[]; // un StatMod por mejora con nivel > 0: pct/flat del nivel × nivel
// meta/unlocks.ts
export function isMageUnlocked(save: SaveData, id: MageDef['id']): boolean;
export function buyMage(save: SaveData, id: MageDef['id']): { ok: boolean; save: SaveData };
// meta/missionTracker.ts
export function missionProgress(save: SaveData, m: MissionDef): { value: number; done: boolean; claimed: boolean };
export function claimMission(save: SaveData, id: string): { ok: boolean; save: SaveData };
export interface RunSummary { mageId: MageDef['id']; seconds: number; level: number; score: number; goldEarned: number; counters: RunCounters }
export function applyRunToSave(save: SaveData, run: RunSummary): { save: SaveData; newlyCompleted: string[]; newRecord: boolean };
// core/score.ts
export function computeScore(seconds: number, c: RunCounters): number; // §4.10
export function endOfRunGold(seconds: number, greed: number): number; // floor(seconds / 30 × greed)
```

- [ ] **Step 1: Escribir los tests que fallan**

```ts
// save — FakeStorage: Map con flags throwOnSet / throwOnGet
test('ida y vuelta', () => {
  const st = new FakeStorage(); const s = { ...defaultSave(), gold: 77 };
  expect(writeSave(() => st, s)).toBe(true);
  expect(loadSave(() => st).save.gold).toBe(77);
});
test('JSON corrupto: copia de seguridad, guardado nuevo y aviso', () => {
  const st = new FakeStorage(); st.setItem('arcana.save.v1', '{oops');
  const r = loadSave(() => st, () => 123);
  expect(r.warning).toBe('corrupt'); expect(r.save).toEqual(defaultSave());
  expect(st.getItem('arcana.save.corrupt.123')).toBe('{oops');
});
test('Review Focus 3: almacenamiento que lanza al acceder o al escribir', () => {
  expect(loadSave(() => { throw new Error('SecurityError'); }).warning).toBe('unavailable');
  const st = new FakeStorage(); st.throwOnSet = true;
  expect(writeSave(() => st, defaultSave())).toBe(false);
});
test('migrate rellena campos nuevos sin perder los existentes', () => {
  const s = migrate({ version: 1, gold: 5 });
  expect(s.gold).toBe(5); expect(s.unlockedMages).toEqual(['pyro']); expect(s.settings.volume).toBe(0.6);
});
// wallet / unlocks
test('coste creciente; sin oro o al máximo no compra', () => {
  expect(upgradeCost(upgradeById('vitality'), 3)).toBe(300);
  const s = { ...defaultSave(), gold: 250 };
  const r1 = buyUpgrade(s, 'vitality'); expect(r1.ok).toBe(true); expect(r1.save.gold).toBe(150);
  expect(buyUpgrade(r1.save, 'vitality').ok).toBe(false); // nivel 2 cuesta 200
  expect(buyUpgrade({ ...s, gold: 1e6, upgrades: { haste: 3 } }, 'haste').ok).toBe(false);
});
test('metaMods suma por nivel', () => {
  expect(metaMods({ ...defaultSave(), upgrades: { might: 2 } })).toContainEqual({ stat: 'power', pct: 0.1 });
});
test('cryo se compra con 500; electro no se compra', () => {
  expect(buyMage({ ...defaultSave(), gold: 500 }, 'cryo').save.unlockedMages).toContain('cryo');
  expect(buyMage({ ...defaultSave(), gold: 9999 }, 'electro').ok).toBe(false);
});
// missionTracker
test('applyRunToSave acumula totales, mejores y récords', () => {
  const c = { kills: 600, burned: 0, frozen: 0, electrocuted: 0, bosses: 1, minibosses: 2, evolutions: 0 };
  const { save, newlyCompleted, newRecord } = applyRunToSave(defaultSave(),
    { mageId: 'pyro', seconds: 400, level: 22, score: 9999, goldEarned: 40, counters: c });
  expect(save.gold).toBe(40); expect(save.stats.totalKills).toBe(600); expect(save.stats.bestSeconds).toBe(400);
  expect(newlyCompleted).toEqual(expect.arrayContaining(['kills_500', 'survive_5', 'first_miniboss', 'first_boss']));
  expect(newRecord).toBe(true); expect(save.records.pyro).toEqual({ bestSeconds: 400, bestScore: 9999 });
});
test('reclamar first_boss desbloquea electro; no se reclama dos veces', () => {
  const s = { ...defaultSave(), stats: { ...defaultSave().stats, totalBosses: 1 } };
  const r = claimMission(s, 'first_boss');
  expect(r.ok).toBe(true); expect(r.save.unlockedMages).toContain('electro');
  expect(claimMission(r.save, 'first_boss').ok).toBe(false);
  expect(claimMission(defaultSave(), 'first_boss').ok).toBe(false);
});
// score
test('puntuación y oro de fin de partida (§4.10, §4.12)', () => {
  const c = { kills: 100, burned: 0, frozen: 0, electrocuted: 0, bosses: 1, minibosses: 2, evolutions: 0 };
  expect(computeScore(60, c)).toBe(600 + 100 + 500 + 200);
  expect(endOfRunGold(95, 1.1)).toBe(3);
});
```

- [ ] **Step 2: Ejecutar `npm test`** → FAIL.
- [ ] **Step 3: Implementar**
  - Datos según §4.12.
  - `migrate` hace un *deep merge* sobre `defaultSave()` de los campos conocidos y comprueba sus tipos. Si no es un objeto o `version` no es 1, lanza.
  - `loadSave` captura cualquier excepción de `getStorage`/`getItem` → `unavailable`. Si `JSON.parse` o `migrate` fallan → `corrupt` (intenta la copia de seguridad dentro de `try`).
  - `applyRunToSave`: suma los totales, actualiza `bestSeconds`/`bestLevel` con `max` y suma el oro. `newlyCompleted` = misiones cuyo `done` pasa de `false` a `true`.
- [ ] **Step 4: Ejecutar `npm test`** → PASS.
- [ ] **Step 5: Commit** — `feat(meta): save system, upgrades, unlocks, missions and scoring`

---

### Task 6: Arte placeholder, escena de juego y movimiento del jugador

**Files:**
- Create: `src/data/textures.ts`, `src/art/palette.ts`, `src/art/placeholders.ts`, `src/ui/VirtualJoystick.ts`, `src/ui/OrientationOverlay.ts`, `src/ui/text.ts`, `src/systems/Player.ts`, `src/systems/Ground.ts`, `src/scenes/GameScene.ts`, `src/scenes/PauseScene.ts`, `src/events.ts`, `src/debug.ts`, `scripts/smoke.cjs`
- Modify: `src/main.ts`, `src/scenes/BootScene.ts`
- Test: `tests/data/textures.test.ts`

**Interfaces:**
- Consumes: Tareas 2–5.
- Produces:
  - `textures.ts`:
    - `TEXTURE_SPECS: readonly { key: string; w: number; h: number; kind: 'mage'|'enemy'|'elite'|'miniboss'|'boss'|'projectile'|'pickup'|'icon'|'decor'|'tile'|'ui'; color: number }[]`;
    - las claves se derivan de todos los datos más las fijas: `gem_small`, `gem_medium`, `gem_large`, `coin`, `chest`, `chicken`, `magnet`, `tile_grass`, `decor_tomb`, `decor_cross`, `decor_tree`, `decor_lamp`, `fx_ring`, `fx_bolt`, `enemy_shot`.
    - Tamaños según §5: mage, enemy y pickup 16; elite 24; miniboss 32; boss 48; projectile 8; icon 16; decor 16×24; tile 32.
  - `generatePlaceholders(scene: Phaser.Scene): void` crea, para cada spec, una textura de 2 fotogramas (`${key}` con frames `0` y `1`).
  - `GameScene` con:
    - `run: RunState`
    - `rng: Rng`
    - `paused: boolean`
    - `step(dt: number): void` (lógica de un paso fijo)
    - `player: Player`
  - `GameScene.init(data: { mageId: MageDef['id']; seed?: number })`.
  - `Player` con:
    - `x`, `y`
    - `facing: { x: number; y: number }` (último vector de movimiento no nulo, normalizado, por defecto `{x:1,y:0}`)
    - `update(dt, input: { x: number; y: number }, speed: number)`
  - `events.ts`: `const EV = { LevelUp: 'run:levelup', GameOver: 'run:over', Hud: 'run:hud', SpecialPressed: 'input:special' } as const` en `game.events`.
  - `debug.ts`:
    - `installDebug(game)` si `URLSearchParams` contiene `debug=1`. Expone `window.__arcana = { snapshot(): DebugSnapshot; fastForward(seconds: number): void; setGodMode(on: boolean): void; grantXp(n: number): void; spawnBoss(id: string): void }`.
    - `DebugSnapshot = { scene: string; elapsed: number; level: number; hp: number; enemies: number; projectiles: number; tomes: Record<string, number>; evolved: string[]; kills: number; fps: number; errors: string[] }`.
    - Parámetros de URL: `seed`, `autostart=<mageId>` (Boot salta directo a Game) y `autolevel=1` (se aplica la primera opción de subida sin abrir LevelUp).
    - `fastForward` llama a `step(FIXED_DT)` en bucle síncrono.
    - En esta tarea, `spawnBoss` y `grantXp` pueden ser *no-op* hasta que existan sus sistemas.

- [ ] **Step 1: Escribir el test que falla** (`tests/data/textures.test.ts`)

```ts
test('claves únicas y cubren todo el contenido', () => {
  const keys = TEXTURE_SPECS.map(s => s.key);
  expect(new Set(keys).size).toBe(keys.length);
  for (const k of [...TOMES.flatMap(t => [t.texture, t.evolution.texture]), ...MAGES.map(m => m.texture),
    ...PASSIVES.map(p => p.texture), 'gem_small', 'chest', 'tile_grass'])
    expect(keys).toContain(k);
});
```

  > Los enemigos se añaden a este test en la Tarea 7 y los jefes en la Tarea 10, cuando existan sus datos.

- [ ] **Step 2: Ejecutar `npm test`** → FAIL.
- [ ] **Step 3: Implementar `textures.ts`, `palette.ts` y `placeholders.ts`**
  - `palette.ts`: 16 colores de fantasía oscura, constantes nombradas (`BG`, `BONE`, `BLOOD`, `FIRE`, `ICE`, `VOLT`, `GOLD`, `XP`, `UI_DARK`, `UI_LIGHT`…).
  - `placeholders.ts`: dibuja con `Graphics` → `generateTexture` según `kind`:
    - mage: silueta con sombrero puntiagudo en el color de su elemento;
    - enemy: cuerpo más dos ojos;
    - elite: lo mismo más un contorno;
    - projectile: rombo;
    - gem: diamante;
    - tile: hierba oscura con ruido determinista;
    - decor: tumba, cruz, árbol o farola.

    El frame 1 desplaza 1 px las "patas" (movimiento) o aclara (brillo).
- [ ] **Step 4: Ejecutar `npm test`** → PASS.
- [ ] **Step 5: Implementar el juego jugable mínimo**
  - `BootScene`: llama a `generatePlaceholders`, carga el guardado (`loadSave(() => window.localStorage)`) en `game.registry` (`'save'`, `'saveWarning'`) y respeta `autostart`.
  - `GameScene`:
    - crea `run` con `createRun(mage, metaMods(save), seed)` y `createFixedStep`;
    - `update(_, deltaMs)` → `advance(deltaMs/1000, step)` salvo si `paused`;
    - `step` avanza `run.elapsed` y mueve al jugador.
  - `Ground` (§4.11):
    - `TileSprite` de `tile_grass` fijo a la cámara, con `tilePositionX/Y` = scroll;
    - decoración determinista por bloque de 256 px (semilla = `hash(bx, by, seed)`, de 0 a 3 objetos) en los bloques visibles más 1 de margen;
    - recicla los sprites de decoración.
  - Cámara con `startFollow(player, true, 0.15, 0.15)`.
  - Entrada:
    - WASD y flechas, normalizada;
    - `VirtualJoystick`:
      - aparece donde toca el puntero en la mitad izquierda; radio 28 px; zona muerta 0.15;
      - vector de salida limitado a una longitud de 1.
    - Esc o P → `PauseScene`, con los botones Continuar y Abandonar (vuelve a Menu).
  - Pausa automática: `document.visibilitychange` (hidden) y `window.blur` → abre `PauseScene` si se está jugando.
  - `OrientationOverlay`: si `innerHeight > innerWidth` en un dispositivo táctil, se muestra un `div` HTML "Gira el dispositivo" y el juego se pausa.
  - `debug.ts` y `scripts/smoke.cjs`:
    - `smoke.cjs` arranca `vite preview` como proceso hijo y abre `http://localhost:4173/workinprogress/?debug=1&seed=42&autostart=pyro&autolevel=1` con `require('playwright').chromium`;
    - recoge `console` de tipo error y `pageerror`;
    - ejecuta `setGodMode(true)` y `fastForward(60)`;
    - comprueba las condiciones de `SMOKE_ASSERTS` (un array en el propio script que amplían las tareas siguientes; aquí: `elapsed >= 60`, `scene === 'Game'`, sin errores);
    - guarda una captura en la ruta de `process.argv[2]` (por defecto `smoke.png`), sale con 0 o 1 y termina el proceso hijo.
- [ ] **Step 6: Verificar**
  - Ejecutar `npm test && npm run build && node scripts/smoke.cjs "$SCRATCH/smoke-t6.png"` → `SMOKE OK`.
  - Mirar la captura: jugador sobre hierba con decoración.
- [ ] **Step 7: Commit** — `feat(game): placeholder art, game scene, movement, map, pause and debug harness`

---

### Task 7: Enemigos básicos, colisiones, daño al jugador, XP y subida de nivel

**Files:**
- Create: `src/data/enemies.ts`, `src/core/damage.ts`, `src/systems/EnemySystem.ts`, `src/systems/PickupSystem.ts`, `src/systems/Spawner.ts`, `src/scenes/HUDScene.ts`, `src/scenes/LevelUpScene.ts`, `src/scenes/GameOverScene.ts` (mínima), `src/ui/Bar.ts`, `src/ui/Button.ts`, `src/ui/Panel.ts`
- Modify: `src/scenes/GameScene.ts`, `src/debug.ts`, `src/data/textures.ts`, `tests/data/textures.test.ts`, `scripts/smoke.cjs`
- Test: `tests/core/damage.test.ts`, `tests/data/enemies.test.ts`

**Interfaces:**
- Consumes: `SpatialHash`, `RunState`, `addXp`, `rollLevelUpOptions`, `applyOption`, `recomputeStats`.
- Produces:

```ts
// data/enemies.ts — §4.8; ids: bat skeleton zombie ghost ghoul gargoyle
export type EnemyBehavior = 'chase' | 'zigzag' | 'pack' | 'ranged';
export interface EnemyDef { id: string; name: string; hp: number; speed: number; damage: number; behavior: EnemyBehavior;
  knockbackResist: number; gem: 'small' | 'medium'; minMinute: number; ghost: boolean; texture: string }
// gemas: bat/skeleton → small; el resto → medium; élite → large
export const GEM_XP = { small: 1, medium: 5, large: 25 } as const;
// core/damage.ts
export function playerDamageTaken(raw: number, armor: number): number; // max(1, raw − armor)
export function knockbackDistance(base: number, resist: number): number; // base × (1 − resist)
// systems/EnemySystem.ts
export interface Enemy { active: boolean; id: number; def: EnemyDef; x: number; y: number; hp: number; maxHp: number;
  speedMul: number; damageMul: number; elite: boolean; boss: boolean; kbResist: number; status: StatusState;
  sprite: Phaser.GameObjects.Sprite; lastHitBy: Map<string, number> }
export class EnemySystem { readonly hash: SpatialHash<Enemy>; active(): readonly Enemy[];
  spawn(def: EnemyDef, x: number, y: number, opts?: { elite?: boolean; hpMul?: number; dmgMul?: number }): Enemy;
  damage(e: Enemy, amount: number, sourceId: string, kb?: { x: number; y: number }): boolean /* true si muere */;
  update(dt: number, px: number, py: number): void; }
// systems/PickupSystem.ts
export class PickupSystem { dropGem(x: number, y: number, kind: 'small'|'medium'|'large'): void;
  drop(kind: 'coin'|'chest'|'chicken'|'magnet', x: number, y: number): void;
  update(dt: number, px: number, py: number, magnet: number): PickupEvents }
export interface PickupEvents { xp: number; coins: number; chests: number; heal: number }
```

  `StatusState` se declara en esta tarea como `{}` en `core/status.ts`, y la Tarea 8 la completa. Así la interfaz `Enemy` ya es estable.

- [ ] **Step 1: Escribir los tests que fallan**

```ts
test('armadura resta daño con mínimo 1', () => {
  expect(playerDamageTaken(6, 2)).toBe(4); expect(playerDamageTaken(3, 5)).toBe(1);
});
test('enemigos de §4.8', () => {
  expect(ENEMIES.map(e => e.id)).toEqual(['bat', 'skeleton', 'zombie', 'ghost', 'ghoul', 'gargoyle']);
  expect(enemyById('zombie')).toMatchObject({ hp: 25, speed: 25, damage: 10, minMinute: 2 });
  expect(enemyById('ghost').ghost).toBe(true);
  expect(enemyById('bat').gem).toBe('small'); expect(enemyById('gargoyle').gem).toBe('medium');
});
```

- [ ] **Step 2: Ejecutar `npm test`** → FAIL.
- [ ] **Step 3: Implementar el contenido y `damage.ts`**
  - Añadir las texturas `enemy_*` (16 px) a `TEXTURE_SPECS` y ampliar el test de texturas con `ENEMIES.map(e => e.texture)`.
  - `npm test` → PASS.
- [ ] **Step 4: Implementar los sistemas**
  - `EnemySystem`:
    - pool de 400 sprites;
    - en cada paso reconstruye `hash` (celda 32);
    - movimiento hacia el jugador según el comportamiento:
      - `chase`: directo;
      - `zigzag`: suma `sin(t·4)·0.6` en perpendicular;
      - `pack`: embiste a 2× velocidad durante 0.5 s cuando está a menos de 50 px, con 2 s de enfriamiento;
      - `ranged`: se mantiene a unos 120 px y deja los disparos en un hook `onShoot` que se conecta en la Tarea 9;
    - separación: empuja 0.5 px por vecino a menos de 10 px (salvo `ghost`);
    - destello de 0.1 s al recibir daño;
    - empuje base de 6 px;
    - `lastHitBy` controla el reimpacto de orbes y auras;
    - con 400 activos y una petición de `spawn`, se recicla el más lejano.
  - `Spawner` (provisional, la Tarea 9 lo sustituye):
    - mantiene vivos `15 + 19·minuto` enemigos (con tope de 300);
    - aparecen en un anillo de radio `hypot(240,135) + 20` alrededor del jugador;
    - solo `bat` y `skeleton`.
  - Contacto: los enemigos a menos de 10 px del jugador hacen `playerDamageTaken(def.damage × damageMul, armor)` si `run.invulnFor <= 0`, y se aplican 0.3 s de invulnerabilidad. Con `godMode` se ignora el daño. La recuperación de vida se aplica en cada paso.
  - Al morir:
    - gema (large si es élite);
    - 5 % moneda, 0.5 % pollo y 0.2 % imán (§4.8), con `rng` y multiplicando las probabilidades por `luck`;
    - `counters.kills++`.
  - Cada paso resta `dt` a `run.invulnFor` y `run.specialReadyIn` (mínimo 0).
  - Cada moneda recogida suma `1 × stats.greed` a `run.gold` (sin redondear; se redondea hacia abajo al final de la partida).
  - `PickupSystem`:
    - las gemas dentro de `magnet` px vuelan hacia el jugador a 200 px/s y se recogen a 8 px;
    - el imán atrae todas las gemas activas;
    - con más de 500 gemas, la más antigua se fusiona en la gema grande más cercana (suma su XP en un campo `xp` de la gema).
  - Subida de nivel:
    - si `pendingLevelUps > 0` y no está en autolevel, se pausa `Game` y se lanza `LevelUp` con `rollLevelUpOptions`;
    - la elección llama a `applyOption` y `recomputeStats` (con gold → `run.gold += 25`; heal → `hp += 30 % maxHp`);
    - "Volver a tirar" usa `rerollsLeft`;
    - al cerrar, si quedan pendientes se vuelve a abrir.
  - `LevelUpScene`: tarjetas con icono, nombre, "Nuevo" o "Nv. X → Y" y una línea de efecto. Se maneja con teclas 1–4 y toque.
  - `HUDScene`: barra de XP arriba, vida bajo el jugador, tiempo `mm:ss`, nivel, eliminaciones y oro. Lee `scene.get('Game').run` en cada fotograma.
  - `GameOverScene` mínima: tiempo, nivel y botón Menú (la Tarea 12 la completa).
  - Debug: `grantXp` llama a `addXp`, y `snapshot` rellena `enemies`.
  - Smoke: añadir a `SMOKE_ASSERTS` `level >= 2`, `kills > 0` y `enemies > 0`.
- [ ] **Step 5: Verificar** — `npm test && npm run build && node scripts/smoke.cjs "$SCRATCH/smoke-t7.png"` → `SMOKE OK`.
- [ ] **Step 6: Commit** — `feat(game): enemies, contact damage, gems, xp, level-up and HUD`

---

### Task 8: Tomos, estados alterados, cofres y evoluciones en partida

**Files:**
- Create: `src/core/status.ts` (completa), `src/systems/ProjectileSystem.ts`, `src/systems/TomeSystem.ts`, `src/systems/DamageNumbers.ts`
- Modify: `src/core/damage.ts`, `src/scenes/GameScene.ts`, `src/scenes/HUDScene.ts`, `src/debug.ts`, `scripts/smoke.cjs`
- Test: `tests/core/status.test.ts`, `tests/core/damage.test.ts`

**Interfaces:**
- Produces:

```ts
// core/status.ts — §4.3
export interface StatusState { burnLeft: number; burnTick: number; burnDmg: number; slowStacks: number; slowLeft: number;
  frozenLeft: number; bossSlowLeft: number; stunLeft: number }
export function createStatus(): StatusState;
export interface HitResult { chain: boolean; froze: boolean; stunned: boolean; burned: boolean }
export function applyElementHit(s: StatusState, el: Element, hitDamage: number, statusPower: number, isBoss: boolean, rng: Rng): HitResult;
export function tickStatus(s: StatusState, dt: number): number; // daño de quemadura que toca en este paso
export function speedFactor(s: StatusState): number; // 0 si congelado/aturdido
export function isSlowed(s: StatusState): boolean; // slowStacks>0 || frozen || bossSlow
// core/damage.ts (añade)
export function hitDamage(base: number, power: number, trait: WeaponTrait, targetSlowed: boolean): number; // slowedBonus ×1.25
```

  - `TomeSystem.update(dt)` recorre `run.build.tomes`, usa `tomeParams` y aplica `stats.cooldown`, `area`, `amount` (+ `stats.amount`), `duration` y `projectileSpeed`. Cada comportamiento vive en una función privada de `TomeSystem`.
  - `ProjectileSystem`:
    - pool de 300;
    - `fire(spec: { tomeId: string; element: Element; x; y; vx; vy; damage; pierce; bounce; radius; life; texture })`;
    - en cada paso consulta `EnemySystem.hash` y llama a `onHit(enemy, proj)`.
  - Única ruta de daño: `GameScene.dealDamage(enemy, base, sourceId, element)`. Aplica `hitDamage` (con el rasgo del mago), `EnemySystem.damage`, `applyElementHit` y los contadores (`burned`/`frozen`/`electrocuted`). Contadores: `burned++` en cada golpe de fuego, `frozen++` cuando `froze`, `electrocuted++` cuando `chain || stunned`. Si `chain`, salta a `hash.nearest(…, 60, ≠e)` con el 50 % del daño, sin recursión adicional. Llama a `DamageNumbers.show`.
  - Los rasgos de mago se implementan aquí:
    - `slowedBonus` en `hitDamage`;
    - `chainExtra`: un salto adicional garantizado;
    - `burnSpread`: al morir un enemigo quemado, se aplica quemadura a los que estén a menos de 40 px.

- [ ] **Step 1: Escribir los tests que fallan**

```ts
test('hielo: 3 acumulaciones congelan 1.5 s y reinician', () => {
  const s = createStatus(), r = createRng(1);
  applyElementHit(s, 'ice', 10, 1, false, r); applyElementHit(s, 'ice', 10, 1, false, r);
  expect(speedFactor(s)).toBeCloseTo(0.6);
  expect(applyElementHit(s, 'ice', 10, 1, false, r).froze).toBe(true);
  expect(s.slowStacks).toBe(0); expect(speedFactor(s)).toBe(0);
  tickStatus(s, 1.5); expect(speedFactor(s)).toBe(1);
});
test('los jefes no se congelan: −40% durante 1.5 s', () => {
  const s = createStatus(), r = createRng(1);
  for (let i = 0; i < 3; i++) applyElementHit(s, 'ice', 10, 1, true, r);
  expect(speedFactor(s)).toBeCloseTo(0.6); tickStatus(s, 1.6); expect(speedFactor(s)).toBe(1);
});
test('quemadura: 15% del golpe cada 0.5 s durante 3 s; reaplicar renueva y conserva el mayor', () => {
  const s = createStatus(), r = createRng(1);
  applyElementHit(s, 'fire', 20, 1, false, r);
  let total = 0; for (let i = 0; i < 180; i++) total += tickStatus(s, 1 / 60);
  expect(total).toBeCloseTo(6 * 3);
  applyElementHit(s, 'fire', 40, 1, false, r); applyElementHit(s, 'fire', 10, 1, false, r);
  expect(s.burnDmg).toBeCloseTo(6); expect(s.burnLeft).toBeCloseTo(3);
});
test('rayo: probabilidades 20% salto, 10% aturdir, nunca aturde jefes', () => {
  const r = createRng(7); let chains = 0, stuns = 0, bossStuns = 0;
  for (let i = 0; i < 5000; i++) {
    const h = applyElementHit(createStatus(), 'lightning', 10, 1, false, r); chains += +h.chain; stuns += +h.stunned;
    bossStuns += +applyElementHit(createStatus(), 'lightning', 10, 1, true, r).stunned;
  }
  expect(chains / 5000).toBeCloseTo(0.2, 1); expect(stuns / 5000).toBeCloseTo(0.1, 1); expect(bossStuns).toBe(0);
});
test('slowedBonus +25% solo contra ralentizados', () => {
  expect(hitDamage(10, 1.2, 'slowedBonus', true)).toBeCloseTo(15);
  expect(hitDamage(10, 1.2, 'slowedBonus', false)).toBeCloseTo(12);
  expect(hitDamage(10, 1, 'burnSpread', true)).toBe(10);
});
```

- [ ] **Step 2: Ejecutar `npm test`** → FAIL.
- [ ] **Step 3: Implementar `status.ts` y `hitDamage`**
  - Los tics de quemadura acumulan tiempo y disparan con `>= 0.5 - 1e-9`, para que el sexto tic de 3 s no se pierda por error de coma flotante.
  - `npm test` → PASS.
- [ ] **Step 4: Implementar los 6 comportamientos de tomo** (todas las distancias × `stats.area`, las duraciones × `stats.duration` y las recargas × `stats.cooldown`)
  - `projectile`: dispara `amount` proyectiles hacia el más cercano (`hash.nearest`, 250 px), con ±8° de separación. Respeta `pierce` y `bounce`: al rebotar busca el siguiente más cercano no golpeado. Con `infinitePierce`, `pierce = ∞` y vida de 2 s.
  - `orbit`: `amount` orbes equidistantes a radio `area` que giran a `speed` vueltas/s. Están activos 3 s × duración y se recargan; con `persistentOrbit` siempre están activos y el radio oscila ±20 %. Golpean a cada enemigo como mucho cada `cooldown` s (`lastHitBy`).
  - `aura`: cada `cooldown` s daña a todos los que estén en `queryRadius(area)`. Se dibuja un círculo translúcido del color del elemento. `reflectProjectiles` destruye los disparos enemigos que entran en el aura (los disparos existen desde la Tarea 9).
  - `zone`: `amount` impactos en puntos al azar a menos de 150 px; cada uno con un aviso de 0.3 s y luego daño en `area`. Con `lingeringZone`, la zona permanece 2 s y hace tics cada 0.5 s.
  - `cone`: en la dirección de `player.facing`. Fuego (slot 5) es un cono de 60° con alcance `area`; Hielo y Rayo, un rectángulo de largo `area` y 10 px de ancho. Con `bidirectional` también hacia atrás.
  - `nova`: daño en `area` alrededor del jugador, con un anillo visual (`fx_ring`). Con `doubleNova` se repite a los 0.5 s.
  - Cofres:
    - al recogerlos, `rollChest` y luego `applyChest`;
    - se muestra un aviso breve en el HUD ("¡Evolución: Infierno!" o una lista de mejoras);
    - `counters.evolutions++` si evoluciona.
  - `DamageNumbers`:
    - pool de 60 textos de 6 px que suben y se desvanecen en 0.5 s;
    - color según el elemento;
    - se desactiva con `settings.damageNumbers`.
  - HUD: iconos de tomos y pasivas con su nivel en la esquina superior izquierda.
  - Debug: `snapshot.tomes`, `snapshot.evolved` y `projectiles`.
  - Smoke: añadir una segunda fase que recarga la URL con `autostart=cryo&autolevel=1`, hace `grantXp(5000)` y `fastForward(30)`, y comprueba que hay al menos 4 tomos distintos y `projectiles >= 0` sin errores.
- [ ] **Step 5: Verificar** — `npm test && npm run build && node scripts/smoke.cjs "$SCRATCH/smoke-t8.png"` → `SMOKE OK`. En la captura se ven varios efectos de tomo.
- [ ] **Step 6: Commit** — `feat(game): tomes, elemental statuses, chests and evolutions`

---

### Task 9: Oleadas, dificultad sin fin, élites, eventos y enemigos especiales

**Files:**
- Create: `src/data/waves.ts`, `src/core/difficulty.ts`
- Modify: `src/systems/Spawner.ts` (reescribir), `src/systems/EnemySystem.ts`, `src/systems/ProjectileSystem.ts`, `src/data/textures.ts`, `tests/data/textures.test.ts`, `scripts/smoke.cjs`
- Test: `tests/core/difficulty.test.ts`

**Interfaces:**
- Produces:

```ts
// data/waves.ts
export interface WaveBand { fromMinute: number; weights: Partial<Record<string, number>> } // vigente hasta la siguiente banda
export const WAVE_BANDS: readonly WaveBand[];
// 0: bat 1, skeleton 2 | 2: +zombie 1 | 4: +ghost 1 | 6: +ghoul 1 | 8: +gargoyle 0.5 | 12: bat 1, skeleton 1, zombie 2, ghost 1, ghoul 2, gargoyle 1
export interface WaveEvent { id: 'batRing' | 'zombieWall'; startMinute: number; every: number }
export const WAVE_EVENTS: readonly WaveEvent[]; // batRing 5/3, zombieWall 7/4
// core/difficulty.ts — §4.8, §4.9, §4.10
export function isBloodMoon(minute: number): boolean;            // minute >= 30
export function enemyHpMul(minute: number): number;              // (1 + 0.12m) × (bloodMoon ? 2 : 1)
export function enemyDmgMul(minute: number): number;             // (1 + 0.05m) × (bloodMoon ? 2 : 1)
export function targetAlive(minute: number, bossAlive: boolean): number; // 15→300 lineal en 0..15, luego 300; ×0.4 con jefe
export function eliteChance(minute: number): number;            // 0 si m<3; min(0.08, 0.01 + 0.005(m−3)); ×1.5 en Luna de Sangre
export function bandAt(minute: number): WaveBand;
export function eventsDue(prevSeconds: number, nowSeconds: number): WaveEvent['id'][];
```

- [ ] **Step 1: Escribir los tests que fallan**

```ts
test('escalado', () => {
  expect(enemyHpMul(10)).toBeCloseTo(2.2); expect(enemyHpMul(30)).toBeCloseTo(2 * 4.6);
  expect(enemyDmgMul(20)).toBeCloseTo(2);
  expect(targetAlive(0, false)).toBe(15); expect(targetAlive(15, false)).toBe(300);
  expect(targetAlive(40, false)).toBe(300); expect(targetAlive(15, true)).toBe(120);
});
test('élites', () => {
  expect(eliteChance(2)).toBe(0); expect(eliteChance(3)).toBeCloseTo(0.01);
  expect(eliteChance(25)).toBeCloseTo(0.08); expect(eliteChance(30)).toBeCloseTo(0.12);
});
test('bandas y eventos', () => {
  expect(bandAt(5).weights.ghost).toBe(1); expect(bandAt(1).weights.zombie).toBeUndefined();
  expect(eventsDue(299, 300)).toEqual(['batRing']);
  expect(eventsDue(479, 481)).toEqual(['batRing']); // minuto 8
  expect(eventsDue(419, 421)).toEqual(['zombieWall']); // minuto 7
  expect(eventsDue(100, 101)).toEqual([]);
});
```

- [ ] **Step 2: Ejecutar `npm test`** → FAIL.
- [ ] **Step 3: Implementar `waves.ts` y `difficulty.ts`** → `npm test` PASS.
- [ ] **Step 4: Integrar en el juego**
  - `Spawner` cada paso:
    - con `minute = elapsed/60`, rellena hasta `targetAlive` (como mucho 10 por paso) con `bandAt` y `rng.weighted`;
    - cada aparición aplica `enemyHpMul`/`enemyDmgMul` y `rng.chance(eliteChance(m))` para que sea élite (×5 vida, ×1.5 daño, `kbResist` a la mitad, escala 1.5, aura de color con tinte; al morir suelta `chest` y gema large).
  - Eventos:
    - `batRing`: 24 murciélagos en un círculo de radio 200 que van hacia el centro inicial;
    - `zombieWall`: 15 zombis en línea vertical, separados 16 px, desde un lado aleatorio, moviéndose en horizontal.
  - Gárgola: dispara `enemy_shot` (8 de daño × `damageMul`, 90 px/s, vida 4 s) cada 3 s, usando un pool separado de disparos enemigos dentro de `ProjectileSystem` (`fireEnemy`, `updateEnemyShots` contra el jugador).
  - Luna de Sangre: a partir del minuto 30, `cameras.main.setTint`/un rectángulo rojo con alpha 0.15 sobre el mundo y un aviso en el HUD.
  - `textures.ts`: añadir `elite_*` (24) y ampliar el test de texturas con ellas.
  - Los necrófagos (`pack`) aparecen siempre en grupos de 4, juntos en el mismo punto del anillo.
  - Smoke: fase con `fastForward(9*60)` en modo dios; comprobar que no hay errores y que `enemies <= 400`.
- [ ] **Step 5: Verificar** — `npm test && npm run build && node scripts/smoke.cjs "$SCRATCH/smoke-t9.png"` → `SMOKE OK`. Revisar el contador de fps del snapshot en la fase de 9 min: debe ser al menos 55 en Chromium sin limitación.
- [ ] **Step 6: Commit** — `feat(game): endless difficulty, wave bands, elites, events and ranged enemies`

---

### Task 10: Minijefes y jefes

**Files:**
- Create: `src/data/bosses.ts`, `src/systems/BossSystem.ts`
- Modify: `src/core/difficulty.ts`, `src/systems/Spawner.ts`, `src/scenes/HUDScene.ts`, `src/data/textures.ts`, `src/debug.ts`, `scripts/smoke.cjs`
- Test: `tests/core/difficulty.test.ts` (añadir)

**Interfaces:**
- Produces:

```ts
// data/bosses.ts — §4.9
export type BossKind = 'miniboss' | 'boss';
export interface BossDef { id: 'bone_golem' | 'swamp_witch' | 'headless_rider' | 'necromancer' | 'lich'; name: string;
  kind: BossKind; hp: number; speed: number; damage: number; coins: number; texture: string }
export const MINIBOSS_ROTATION: readonly BossDef['id'][]; // bone_golem, swamp_witch, headless_rider
export const BOSS_ROTATION: readonly BossDef['id'][];     // necromancer, lich
// core/difficulty.ts (añade)
export function bossScheduleAt(minute: number): { id: BossDef['id']; kind: BossKind; round: number } | null;
export function bossHpMul(round: number): number; // 1 + 0.6(round − 1)
```

  - `BossSystem`:
    - `spawn(id, round)`;
    - `update(dt)`;
    - `active(): { name: string; hp: number; maxHp: number } | null`.

    Los jefes son `Enemy` con `boss: true` gestionados por `EnemySystem`, para que reciban daño por la misma ruta. `BossSystem` añade su IA por encima.

- [ ] **Step 1: Escribir el test que falla**

```ts
test('calendario: minijefe cada 2 min salvo en minutos de jefe, jefe cada 10, rotación y vueltas', () => {
  expect(bossScheduleAt(1)).toBeNull();
  expect(bossScheduleAt(2)).toEqual({ id: 'bone_golem', kind: 'miniboss', round: 1 });
  expect(bossScheduleAt(6)).toEqual({ id: 'headless_rider', kind: 'miniboss', round: 1 });
  expect(bossScheduleAt(8)).toEqual({ id: 'bone_golem', kind: 'miniboss', round: 2 });
  expect(bossScheduleAt(10)).toEqual({ id: 'necromancer', kind: 'boss', round: 1 });
  expect(bossScheduleAt(12)?.id).toBe('swamp_witch');
  expect(bossScheduleAt(20)).toEqual({ id: 'lich', kind: 'boss', round: 1 });
  expect(bossScheduleAt(30)).toEqual({ id: 'necromancer', kind: 'boss', round: 2 });
  expect(bossHpMul(3)).toBeCloseTo(2.2);
});
```

  Algoritmo: el índice de minijefe es el número de minutos pares en (0, m] que no son múltiplos de 10, menos 1. El índice de jefe es m/10 − 1. `round = floor(index / rotation.length) + 1`.

- [ ] **Step 2: Ejecutar `npm test`** → FAIL.
- [ ] **Step 3: Implementar `bosses.ts` y `bossScheduleAt`** → `npm test` PASS.
- [ ] **Step 4: Implementar los patrones** (con los números de §4.9; vida × `bossHpMul(round)` × `enemyHpMul(m)`)
  - Gólem de Hueso: cada 4 s marca una línea roja hacia el jugador durante 1 s y luego carga a 3× velocidad durante 0.8 s.
  - Bruja del Pantano: cada 8 s invoca 6 zombis a su alrededor; cada 3 s deja un charco tóxico bajo el jugador (radio 20, 3 de daño cada 0.5 s, 5 s).
  - Jinete sin Cabeza: se coloca fuera de la pantalla y cruza en línea recta tras 1 s de aviso; se repite cada 3 s.
  - Nigromante:
    - F1: 8 esqueletos cada 6 s y un anillo de 12 disparos cada 3 s;
    - F2 (≤ 50 %): espiral de 3 brazos (un disparo cada 0.1 s durante 2 s, cada 4 s) y +30 % de velocidad.
  - Lich:
    - F1: zonas de hielo (radio 30, −40 % de velocidad al jugador, 4 s) cada 4 s y 3 disparos teledirigidos lentos (60 px/s, giro de 90°/s) cada 3 s;
    - F2: teletransporte cada 5 s a 80–140 px del jugador más una nova de radio 60 y 15 de daño al llegar.
  - Integración:
    - `Spawner` llama a `bossScheduleAt` al cruzar cada minuto entero; mientras haya un jefe activo, `targetAlive(…, true)`;
    - al morir: cofre (con `forceEvolution = true` para jefes, que usa la evolución si existe), `coins` monedas y `counters.bosses`/`minibosses`;
    - HUD: barra grande con el nombre arriba cuando `active()` no es null;
    - texturas `boss_*` (32 o 48), añadidas también al test de texturas;
    - Debug: `spawnBoss(id)`;
    - Smoke: `spawnBoss('necromancer')`, `fastForward(20)` en modo dios, sin errores y con `snapshot.enemies > 8` (invocaciones).
- [ ] **Step 5: Verificar** — `npm test && npm run build && node scripts/smoke.cjs "$SCRATCH/smoke-t10.png"` → `SMOKE OK`.
- [ ] **Step 6: Commit** — `feat(game): minibosses and bosses with phases`

---

### Task 11: Ataques especiales de los magos

**Files:**
- Create: `src/systems/SpecialSystem.ts`
- Modify: `src/scenes/GameScene.ts`, `src/scenes/HUDScene.ts`, `scripts/smoke.cjs`

**Interfaces:**
- Consumes:
  - `MageDef.special`, `run.specialReadyIn` y `stats.specialCooldown` (de la mejora `focus`: −5 % por nivel);
  - `GameScene.dealDamage`, `EnemySystem.hash`, `applyElementHit`.
- Produces:
  - `SpecialSystem.tryActivate(): boolean` (falso si está en recarga);
  - `SpecialSystem.update(dt)`.
  - Entrada: Espacio o el botón táctil (círculo de 22 px abajo a la derecha que solo se ve en táctil) emiten `EV.SpecialPressed`.
  - Debug: `snapshot.specialReadyIn`.

- [ ] **Step 1: Implementar los especiales** (§4.4; daño × `stats.power`)
  - **Erupción:**
    - anillo que crece de 0 a 120 px en 0.6 s;
    - cada enemigo recibe una vez 40 de daño y quemadura.
  - **Ventisca:**
    - todos los enemigos dentro de la vista de cámara (`hash.queryRadius` centrado en la cámara con radio `hypot(240,135)` + filtro de rectángulo) se congelan 2 s (`frozenLeft = 2`) y suman `counters.frozen`;
    - los jefes reciben `bossSlowLeft = 2`;
    - destello azul en pantalla.
  - **Paso Relámpago:**
    - teletransporte de 100 px según `player.facing`;
    - 30 de daño a los enemigos a menos de 12 px del segmento (`hash.queryRadius` sobre el punto medio con radio 62 y luego distancia punto-segmento);
    - `invulnFor = max(invulnFor, 2)`;
    - rastro `fx_bolt`.
  - Recarga = `special.cooldown × stats.specialCooldown`. HUD: icono con barrido radial de recarga.
- [ ] **Step 2: Añadir al smoke** una fase por mago (`autostart=<id>`) con `__arcana.useSpecial()` (añadir a debug), `fastForward(1)` y la comprobación de que `specialReadyIn > 0` sin errores.
- [ ] **Step 3: Verificar** — `npm test && npm run build && node scripts/smoke.cjs "$SCRATCH/smoke-t11.png"` → `SMOKE OK`.
- [ ] **Step 4: Commit** — `feat(game): mage special attacks`

---

### Task 12: Menús y meta-progresión en la interfaz

**Files:**
- Create: `src/scenes/CharacterSelectScene.ts`, `src/scenes/UpgradesScene.ts`, `src/scenes/MissionsScene.ts`
- Modify: `src/scenes/MenuScene.ts`, `src/scenes/GameOverScene.ts`, `src/scenes/PauseScene.ts`, `src/scenes/BootScene.ts`, `src/main.ts`, `scripts/smoke.cjs`

**Interfaces:**
- Consumes: todo `src/meta`, `computeScore` y `endOfRunGold`.
- Produces:
  - Helper `persist(scene, save)`: llama a `writeSave(() => window.localStorage, save)`, actualiza `registry('save')` y, si `writeSave` devuelve `false`, muestra una vez el aviso "No se pudo guardar el progreso" (`registry('saveFailWarned')`).

- [ ] **Step 1: Implementar las escenas** (todo en español; navegación con teclado y toque)
  - `MenuScene`:
    - botones Jugar, Mejoras, Misiones y Ajustes;
    - panel de Récords con el mejor tiempo y puntuación por mago;
    - el oro visible;
    - un punto en Misiones si hay alguna reclamable;
    - el aviso de `saveWarning` (`corrupt`: "Tu guardado estaba dañado; se ha creado uno nuevo."; `unavailable`: "El navegador no permite guardar; tu progreso se perderá al cerrar.").
  - Ajustes: panel con volumen −/+, silencio, números de daño y sacudida de pantalla. Se guarda al cambiar.
  - `CharacterSelectScene`: 3 tarjetas con nombre, elemento, arma, rasgo, especial y récord. Si el mago está bloqueado, muestra el requisito; si se puede comprar con oro, un botón "Desbloquear (500)" que usa `buyMage`.
  - `UpgradesScene`: cuadrícula de las 8 mejoras con su nivel, coste y botón Comprar (`buyUpgrade`). Desactivado si no hay oro suficiente o está al máximo.
  - `MissionsScene`: lista con barra de progreso (`missionProgress`) y botón Reclamar (`claimMission`).
  - `GameOverScene` completa:
    - muestra tiempo, nivel, eliminaciones, jefes, puntuación y oro ganado (`goldEarned = floor(run.gold) + endOfRunGold(seconds, stats.greed)`);
    - botones Menú y Reintentar. Al pulsar cualquiera de los dos se llama a `finalizeRun()`, que ejecuta `applyRunToSave` y `persist` **una sola vez** (bandera `finalized`). Después muestra durante 1.5 s "¡Nuevo récord!" y las misiones recién completadas, si las hay, y navega.
    - La partida se cierra al salir y no al entrar, porque la Tarea 13 añade "Revivir" en esta misma pantalla y una partida revivida no debe contarse dos veces.
  - `PauseScene`: añadir el panel de Ajustes.
  - Smoke: fase sin `autostart` que hace clic en Jugar, luego en el primer mago, y comprueba `scene === 'Game'`.
- [ ] **Step 2: Verificar** — `npm test && npm run build && node scripts/smoke.cjs "$SCRATCH/smoke-t12.png"` → `SMOKE OK`. Comprobar a mano en `npm run dev`: comprar una mejora, recargar la página y ver que se mantiene.
- [ ] **Step 3: Commit** — `feat(ui): menus, character select, upgrades, missions and game over flow`

---

### Task 13: Anuncios (revivir con recompensa y banner)

**Files:**
- Create: `src/ads/AdProvider.ts`, `src/ads/NoopAdProvider.ts`, `src/ads/AdSenseH5Provider.ts`, `src/ads/createAdProvider.ts`
- Modify: `index.html`, `src/scenes/BootScene.ts`, `src/scenes/GameOverScene.ts`, `src/scenes/GameScene.ts`, `src/scenes/MenuScene.ts`
- Test: `tests/ads/adsense.test.ts`, `tests/ads/noop.test.ts`

**Interfaces:**
- Produces:

```ts
export type RewardResult = 'rewarded' | 'dismissed' | 'unavailable';
export interface AdProvider { init(): Promise<void>; isRewardedAvailable(): boolean; showRewarded(): Promise<RewardResult>;
  showBanner(slot: 'menu' | 'gameover'): void; hideBanner(): void }
export class NoopAdProvider implements AdProvider { constructor(opts: { dev: boolean; delayMs?: number }) }
export interface AdWindow { adBreak?: (o: Record<string, unknown>) => void; adConfig?: (o: Record<string, unknown>) => void }
export class AdSenseH5Provider implements AdProvider {
  constructor(opts: { client: string; bannerSlot?: string; win: AdWindow; doc?: Document; timeoutMs?: number /*5000*/ }) }
export function createAdProvider(env: { client?: string; bannerSlot?: string; dev: boolean }): Promise<AdProvider>;
```

- [ ] **Step 1: Escribir los tests que fallan**

```ts
test('Noop: en desarrollo concede la recompensa; en producción no está disponible', async () => {
  expect(await new NoopAdProvider({ dev: true, delayMs: 0 }).showRewarded()).toBe('rewarded');
  const prod = new NoopAdProvider({ dev: false });
  expect(prod.isRewardedAvailable()).toBe(false); expect(await prod.showRewarded()).toBe('unavailable');
});
test('AdSense: flujo completo de recompensa', async () => {
  const win: AdWindow = { adConfig: () => {}, adBreak: (o: any) => { o.beforeReward(() => { o.adViewed(); o.adBreakDone({ breakStatus: 'viewed' }); }); } };
  expect(await new AdSenseH5Provider({ client: 'ca-pub-x', win }).showRewarded()).toBe('rewarded');
});
test('AdSense: cerrado antes de tiempo', async () => {
  const win: AdWindow = { adBreak: (o: any) => { o.beforeReward(() => { o.adDismissed(); o.adBreakDone({ breakStatus: 'dismissed' }); }); } };
  expect(await new AdSenseH5Provider({ client: 'c', win }).showRewarded()).toBe('dismissed');
});
test('AdSense: sin anuncio disponible', async () => {
  const win: AdWindow = { adBreak: (o: any) => o.adBreakDone({ breakStatus: 'frequencyCapped' }) };
  expect(await new AdSenseH5Provider({ client: 'c', win }).showRewarded()).toBe('unavailable');
});
test('Review Focus 5: adBreak nunca responde → unavailable por timeout', async () => {
  vi.useFakeTimers();
  const p = new AdSenseH5Provider({ client: 'c', win: { adBreak: () => {} }, timeoutMs: 5000 }).showRewarded();
  vi.advanceTimersByTime(5000); expect(await p).toBe('unavailable'); vi.useRealTimers();
});
test('AdSense: adBreak que lanza → unavailable', async () => {
  expect(await new AdSenseH5Provider({ client: 'c', win: { adBreak: () => { throw new Error('x'); } } }).showRewarded()).toBe('unavailable');
});
```

- [ ] **Step 2: Ejecutar `npm test`** → FAIL.
- [ ] **Step 3: Implementar**
  - `showRewarded` llama a `adBreak({ type: 'reward', name: 'revive', beforeAd, afterAd, beforeReward(showAdFn){ showAdFn() }, adDismissed, adViewed, adBreakDone })`:
    - se resuelve una sola vez;
    - `adBreakDone` sin `adViewed`/`adDismissed` previo → `'unavailable'`;
    - el timeout se cancela en cuanto se llama a `beforeReward`.
  - `beforeAd`/`afterAd` invocan los hooks opcionales `onPause`/`onResume`, que `GameOverScene` usa para silenciar el audio.
  - `createAdProvider`:
    - si no hay `client`, devuelve `NoopAdProvider({dev})`;
    - si lo hay, inserta `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=…" crossorigin="anonymous" data-ad-frequency-hint="30s">`;
    - define `window.adsbygoogle = window.adsbygoogle || []` y `adBreak = adConfig = o => adsbygoogle.push(o)`;
    - llama a `adConfig({ preloadAdBreaks: 'on', sound: 'on' })`;
    - si el script dispara `onerror` o no carga en 4 s, devuelve Noop.
  - Banner: `showBanner` rellena `#ad-banner` con `<ins class="adsbygoogle" data-ad-client data-ad-slot data-ad-format="horizontal" style="display:inline-block;width:320px;height:50px">` (solo la primera vez), hace `push({})` y lo muestra. `hideBanner` lo oculta. Sin `bannerSlot`, no hace nada.
  - Tests → PASS.
- [ ] **Step 4: Integrar**
  - `BootScene` crea el proveedor con `import.meta.env` y lo deja en `registry('ads')`.
  - `MenuScene` y `GameOverScene` muestran el banner al entrar y lo ocultan al salir. `GameScene` llama a `hideBanner()` en `create`.
  - `GameScene`: al llegar a `hp <= 0`, pausa y lanza `GameOverScene` con `{ canRevive: !run.reviveUsed }`.
  - `GameOverScene`, botón "Revivir (anuncio)":
    - desactivado con el texto "Anuncio no disponible" si `!isRewardedAvailable()`;
    - si da `rewarded`: `revive(run)`, onda de empuje de 150 px que aleja a los enemigos 80 px, y vuelve a Game;
    - en cualquier otro caso: mensaje breve y se queda en GameOver.

    Revivir no llama a `finalizeRun()` (Tarea 12): la partida sigue y se cerrará en la siguiente muerte.
- [ ] **Step 5: Verificar**
  - `npm test && npm run build && node scripts/smoke.cjs "$SCRATCH/smoke-t13.png"` → `SMOKE OK`.
  - Añadir el parámetro de debug `ads=devnoop`, que fuerza `NoopAdProvider({ dev: true, delayMs: 0 })` incluso en preview.
  - Añadir al smoke una fase con `ads=devnoop`: pone `hp = 0` mediante `__arcana.kill()` (añadir), pulsa Revivir y comprueba que vuelve a `scene === 'Game'` con `hp > 0`.
- [ ] **Step 6: Commit** — `feat(ads): rewarded revive and menu banner with AdSense H5 provider`

---

### Task 14: Audio, pulido y verificación final

**Files:**
- Create: `src/audio/sfx.ts`
- Modify: `src/scenes/GameScene.ts`, `src/systems/*` (llamadas a sonido y sacudida), `README.md`, `scripts/smoke.cjs`

**Interfaces:**
- Produces:
  - `sfx.play(id: 'hit' | 'gem' | 'levelup' | 'explosion' | 'boss' | 'hurt' | 'chest', volume?: number): void`.
  - Usa WebAudio sintetizado (oscilador + envolvente; ruido para explosiones).
  - El `AudioContext` se crea en el primer gesto del usuario.
  - Respeta `settings.volume` y `muted`.
  - Limita cada id a como mucho 1 reproducción cada 50 ms.

- [ ] **Step 1: Implementar `sfx.ts`** y conectarlo:
  - golpe: muestreado como mucho cada 50 ms;
  - recoger gema, subir de nivel, explosión de nova o erupción, aparición de jefe, daño al jugador, cofre.
- [ ] **Step 2: Pulido**
  - Sacudida de cámara (0.1 s, intensidad 0.004) al recibir daño y al aparecer un jefe, si `settings.screenShake`.
  - Aviso "¡Se acerca un jefe!" 3 s antes de que aparezca.
  - Al subir de nivel, pequeña onda que empuja a los enemigos a menos de 40 px.
- [ ] **Step 3: Verificación final completa**
  - `npm test` → todo PASS. Pegar el resumen de vitest.
  - `npx tsc --noEmit` → sin errores.
  - `npm run build` → OK; anotar el tamaño de `dist/assets/*.js`.
  - `node scripts/smoke.cjs "$SCRATCH/smoke-final.png"` → `SMOKE OK`, con todas las fases y sin errores de consola.
  - Prueba de rendimiento en el smoke: `fastForward(14*60)` y luego 5 s en tiempo real con `snapshot.fps` muestreado → media ≥ 55 en Chromium de escritorio. Si no se alcanza, perfilar (rejilla espacial, pools) antes de cerrar la tarea.
  - Comprobación de móvil: Playwright con `devices['Pixel 5']` en horizontal, toque y arrastre en la mitad izquierda; el jugador se mueve (`snapshot` de la posición; añadir `px`/`py` a `DebugSnapshot`). En vertical aparece el aviso de girar.
- [ ] **Step 4: README** — Controles, cómo cambiar el arte placeholder (misma clave en `BootScene.preload`) y cómo configurar las variables de AdSense en *Settings → Variables* del repo.
- [ ] **Step 5: Commit** — `feat: audio, game feel polish and final verification`
