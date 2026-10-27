# Especificación de diseño — Juego survivor de magos (MVP)

- **Fecha:** 2026-10-27
- **Estado:** pendiente de revisión
- **Título provisional:** *Arcana Nocturna* (cambiable; no afecta a la arquitectura)

## 1. Propósito y contexto

Juego web de supervivencia contra hordas al estilo *Vampire Survivors*, en pixel art y con temática de fantasía oscura. Lo publica el autor en su propia web y lo monetiza con anuncios.

Toma como referencia de diseño [PokéSurvivor](https://pokesurvivor.com/): ataques definidos como "movimientos", tipos elementales, menús de colección y mejoras. **No reutiliza su código ni sus recursos.** Su código está bajo PolyForm Noncommercial y sus sprites son propiedad de terceros. Todo el código y el arte de este proyecto son originales.

### Criterios de éxito del MVP

1. Una partida completa se puede jugar en el navegador de PC (teclado) y de móvil horizontal (táctil).
2. Rendimiento:
   - Al menos **55 fps en PC** con 300 enemigos y 200 proyectiles en pantalla.
   - Al menos **45 fps en un móvil de gama media**.
3. Los 3 magos, los 18 tomos, las 18 evoluciones, los 6 enemigos con sus variantes élite, los 3 minijefes y los 2 jefes funcionan como se describe aquí.
4. Funciona la progresión entre partidas: oro, mejoras permanentes, desbloqueos, misiones y récords. Persiste al recargar la página.
5. Anuncios:
   - El anuncio para revivir y el banner del menú funcionan con el proveedor real si el dominio está aprobado.
   - Con un bloqueador de anuncios el juego sigue funcionando sin errores.
6. Cada push a `main` despliega el juego en GitHub Pages.

### Fuera de alcance del MVP

- Cuentas, guardado en la nube y rankings online.
- Multijugador.
- Gacha y compras con dinero real.
- Arte final: se usan placeholders generados por código.
- Música: solo efectos de sonido sintetizados sencillos.
- Mapas con obstáculos y varios mapas.
- Tabla de tipos con ventajas y debilidades.

## 2. Decisiones tomadas

| Tema | Decisión |
|---|---|
| Monetización | Web propia con anuncios: recompensa para revivir y banner solo en menús |
| Temática | Fantasía oscura; todos los personajes son magos elementales |
| Arte | Placeholders generados en código con las mismas claves y tamaños que tendrá el arte final |
| Plataformas | PC y móvil en horizontal |
| Motor | Phaser 3 + TypeScript + Vite |
| Hosting | GitHub Pages, desplegado con GitHub Actions |
| Modo de juego | Sin fin |
| Persistencia | `localStorage` |

## 3. Arquitectura

### 3.1 Base técnica

- **Phaser 3.90** con física *Arcade* desactivada para enemigos y proyectiles. Las colisiones usan un sistema propio (ver 3.4).
- **Resolución lógica 480×270.** Se escala con `Phaser.Scale.FIT` y `pixelArt: true` / `roundPixels: true`. El canvas se centra con bandas negras.
- **Orientación horizontal.** En móvil vertical se muestra una capa a pantalla completa que pide girar el dispositivo, y el juego se pausa.
- **Entrada:**
  - PC: WASD o flechas para moverse, Espacio para el especial, Esc o P para pausar.
  - Móvil: joystick virtual flotante en la mitad izquierda, botón de especial abajo a la derecha y botón de pausa arriba a la derecha.
- **Pausa automática** al perder el foco (`visibilitychange` / `blur`).
- **Despliegue:** GitHub Actions ejecuta `npm ci && npm test && npm run build` y publica `dist/` en Pages. Vite configura `base: '/workinprogress/'`, sobreescribible con la variable de entorno `BASE_PATH` para dominio propio.

### 3.2 Escenas

| Escena | Responsabilidad |
|---|---|
| `BootScene` | Genera las texturas placeholder (`src/art`), carga el guardado y pasa a `MenuScene` |
| `MenuScene` | Jugar, Mejoras, Misiones, Récords, Ajustes; contiene el banner |
| `CharacterSelectScene` | Elegir mago: muestra arma, rasgo, especial, si está bloqueado y su récord |
| `UpgradesScene` | Comprar mejoras permanentes con oro |
| `MissionsScene` | Lista de misiones con progreso y botón de reclamar recompensa |
| `GameScene` | Simulación de la partida |
| `HUDScene` | Capa sobre `GameScene`: vida, barra de XP, nivel, tiempo, eliminaciones, oro, iconos de tomos y pasivas, recarga del especial, barra del jefe |
| `LevelUpScene` | Capa modal: 3 opciones (4 con suerte alta), botón para volver a tirar (1 por partida) |
| `PauseScene` | Capa modal: continuar, ajustes, abandonar |
| `GameOverScene` | Resumen, oro ganado, ofrecer revivir con anuncio (si no se usó), banner, volver al menú |

### 3.3 Estructura de carpetas

```
src/
  main.ts                 # configuración de Phaser y registro de escenas
  config.ts               # constantes globales (resolución, límites, versión de guardado)
  data/                   # definiciones puras, sin dependencias de Phaser
    mages.ts
    tomes.ts              # 18 tomos + 18 evoluciones
    passives.ts
    enemies.ts            # básicos, variantes élite, minijefes, jefes
    waves.ts              # tabla de aparición por minuto + eventos
    upgrades.ts           # mejoras permanentes
    missions.ts
  core/                   # lógica pura y testeable
    stats.ts              # cálculo de estadísticas finales (base + meta + pasivas)
    leveling.ts           # curva de XP y generación de opciones de subida
    evolution.ts          # reglas de evolución
    difficulty.ts         # escalado sin fin y Luna de Sangre
    status.ts             # quemadura / ralentizar / congelar / electrocutar
    spatialHash.ts        # rejilla espacial para colisiones y búsquedas
    rng.ts                # PRNG con semilla
    score.ts
  meta/
    save.ts               # carga, guardado, versión, migraciones, recuperación ante corrupción
    wallet.ts
    unlocks.ts
    missionTracker.ts     # escucha eventos de partida y avanza misiones
  systems/                # dependen de Phaser; usan core/
    EnemySystem.ts        # aparición, IA de movimiento, pooling
    ProjectileSystem.ts   # pooling y movimiento de proyectiles, áreas y auras
    TomeSystem.ts         # ejecuta los tomos equipados según su comportamiento
    SpecialSystem.ts      # ataque especial del arma
    PickupSystem.ts       # gemas, oro, cofres, comida, imán
    BossSystem.ts         # minijefes y jefes, patrones y fases
    DamageNumbers.ts
  ads/
    AdProvider.ts         # interfaz
    NoopAdProvider.ts     # desarrollo y fallback
    AdSenseH5Provider.ts  # API de anuncios para juegos HTML5 de Google
  art/
    palette.ts
    placeholders.ts       # genera cada textura por clave con Graphics/canvas
  audio/
    sfx.ts                # efectos sintetizados con WebAudio
  ui/                     # componentes reutilizables (botón, panel, barra, joystick)
  scenes/
tests/                    # Vitest para core/, meta/ y data/
```

**Regla de dependencias:**
- `data/` y `core/` no importan Phaser.
- `systems/` y `scenes/` usan `core/`.
- `meta/` solo depende de `data/` y `core/`.

### 3.4 Rendimiento

- **Pooling** de enemigos, proyectiles, gemas y números de daño. No se crean objetos en el bucle de juego.
- **Rejilla espacial** con celdas de 32 px, que se reconstruye cada fotograma. Se usa para:
  - golpes de proyectiles y áreas contra enemigos;
  - contacto de enemigos con el jugador;
  - separación ligera entre enemigos (para que no se amontonen en un punto);
  - buscar el enemigo más cercano.
- **Límites:**
  - 400 enemigos activos. Si se alcanza el tope, se recicla el enemigo vivo más lejano.
  - 300 proyectiles.
  - 500 gemas. Si se supera, las gemas se fusionan en una "gema grande" con la XP sumada.
- **Simulación con paso fijo de 1/60 s**, con acumulador y un máximo de 4 pasos por fotograma.

### 3.5 Anuncios

```ts
interface AdProvider {
  init(): Promise<void>;
  isRewardedAvailable(): boolean;
  showRewarded(): Promise<'rewarded' | 'dismissed' | 'unavailable'>;
  showBanner(slot: 'menu' | 'gameover'): void;
  hideBanner(): void;
}
```

- **`AdSenseH5Provider`:**
  - Usa `adConfig` / `adBreak({ type: 'reward', ... })` de la API de anuncios para juegos HTML5 de AdSense.
  - El banner es un `<ins class="adsbygoogle">` en un `div` HTML que se superpone al canvas. Solo se ve en Menú y GameOver.
  - El ID de cliente se lee de `VITE_ADSENSE_CLIENT`. Si no existe, se usa `NoopAdProvider`.
- **`NoopAdProvider`:**
  - `showRewarded` devuelve `'rewarded'` tras 1 s en modo desarrollo (para probar el flujo) y `'unavailable'` en producción.
- **Fallos:** si el script no carga (por un bloqueador), el anuncio da error o no está disponible:
  - el botón de revivir se muestra desactivado con el texto "Anuncio no disponible";
  - el juego continúa sin excepciones.
- **Durante el anuncio** el juego está pausado y el audio silenciado.
- **Nota operativa:** AdSense no aprueba subdominios `*.github.io`. Para monetizar se necesita un **dominio propio** apuntando a GitHub Pages. Esto es configuración, no código.

### 3.6 Guardado

- **Clave:** `arcana.save.v1` en `localStorage`. El objeto incluye `version`.
- **Contenido:**
  - oro;
  - niveles de mejoras permanentes;
  - magos desbloqueados;
  - progreso y estado reclamado de misiones;
  - estadísticas acumuladas (eliminaciones totales, congelaciones, jefes derrotados, etc.);
  - récords por mago (mejor tiempo y mejor puntuación);
  - ajustes (volumen, números de daño, sacudida de pantalla).
- **Migraciones:** función `migrate(raw)` encadenada por versión.
- **Guardado corrupto o JSON inválido:**
  - se copia a `arcana.save.corrupt.<timestamp>`;
  - se crea un guardado nuevo;
  - se muestra un aviso no bloqueante.
- **Cuándo se guarda:** al terminar la partida, al comprar, al reclamar una misión y al cambiar ajustes.
- Si `localStorage` no está disponible (navegación privada estricta), se juega en memoria y se muestra un aviso.

## 4. Diseño de juego

### 4.1 Bucle de partida

1. El jugador elige un mago y empieza en el cementerio con su arma (rasgo y especial) y su **tomo inicial** (la posición 1 de su elemento).
2. Los tomos se lanzan solos al terminar su recarga. El especial se lanza a mano.
3. Los enemigos sueltan gemas de XP (pequeña 1, mediana 5, grande 25). Al recogerlas se acumula XP.
4. Al subir de nivel se pausa el juego y se ofrecen 3 opciones aleatorias entre:
   - aprender un tomo nuevo de su elemento (si tiene menos de 6);
   - subir de nivel un tomo que ya tiene (máximo 8);
   - pasiva nueva o subir una que ya tiene (máximo 6 pasivas, nivel máximo 5).

   Si no queda nada que mejorar, las opciones son "+25 oro" o "curar 30 %".
5. Los cofres (de élites y minijefes) dan una evolución disponible si la hay. Si no, dan 1–3 mejoras aleatorias.
6. La partida termina cuando la vida llega a 0. Se ofrece revivir con anuncio una vez por partida:
   - vuelves con el 50 % de vida;
   - una onda empuja a los enemigos;
   - tienes 2 s de invulnerabilidad.
7. Al final:
   - se convierte el oro recogido;
   - se avanzan las misiones;
   - se actualizan los récords.

**Curva de XP:** XP para pasar del nivel *n* al *n+1* = `5 + 10·(n−1)` hasta el nivel 20; a partir de ahí `+13` por nivel.

### 4.2 Estadísticas del jugador

Estadísticas base de un mago (antes de modificadores):

| Estadística | Valor |
|---|---|
| Vida máxima | 100 |
| Armadura (resta daño plano) | 0 |
| Velocidad | 60 px/s |
| Poder (multiplicador de daño) | 1.0 |
| Área | 1.0 |
| Recarga (multiplicador) | 1.0 |
| Duración | 1.0 |
| Proyectiles extra | 0 |
| Velocidad de proyectil | 1.0 |
| Radio del imán | 30 px |
| Suerte | 1.0 |
| Ganancia de oro | 1.0 |
| Fuerza de estados | 1.0 |
| Recuperación | 0 vida/s |

**Valor final** = base × (1 + suma de bonus porcentuales de mejoras permanentes, pasivas y mago) + bonus planos. Lo calcula `core/stats.ts`.

### 4.3 Estados alterados

| Elemento | Estado | Efecto |
|---|---|---|
| Fuego | Quemadura | 3 s; cada 0,5 s hace un daño del 15 % del golpe que la aplicó × fuerza de estados. Si se reaplica, se renueva la duración y se queda el valor mayor |
| Hielo | Ralentizar / Congelar | Cada golpe pone 1 acumulación de −20 % velocidad durante 2 s (máximo 3). Con 3 acumulaciones el enemigo se congela 1,5 s y las acumulaciones se reinician. Los jefes no se congelan: sufren un −40 % de velocidad durante 1,5 s |
| Rayo | Electrocutar | Cada golpe tiene un 20 % de probabilidad de **saltar** a otro enemigo a menos de 60 px con el 50 % del daño, y un 10 % de **aturdir** 0,5 s (los jefes no se aturden) |

### 4.4 Magos

| Mago | Elemento | Arma y rasgo único | Especial (recarga base) | Modificadores | Desbloqueo |
|---|---|---|---|---|---|
| Piromante | Fuego | **Bastón de Brasas:** al morir un enemigo quemado, contagia la quemadura a los enemigos a menos de 40 px | **Erupción** (25 s): anillo que se expande desde el jugador hasta 120 px, con daño 40 × poder; aplica quemadura | +10 % poder | Disponible desde el inicio |
| Criomante | Hielo | **Orbe Glacial:** los enemigos ralentizados o congelados reciben +25 % de daño | **Ventisca** (30 s): congela 2 s a todos los enemigos en pantalla (a los jefes los ralentiza un 40 %) | +20 % vida | 500 de oro |
| Electromante | Rayo | **Varita de Tormenta:** cada impacto salta además a 1 enemigo a menos de 60 px con el 50 % del daño (aparte del salto por estado) | **Paso Relámpago** (20 s): teletransporte de 100 px en la dirección de movimiento, 2 s de invulnerabilidad, daño 30 × poder a todo lo que esté en la línea | +10 % velocidad | Misión "Derrota a tu primer jefe" |

### 4.5 Tomos

Cada posición tiene el mismo comportamiento en los tres elementos. Cambia el estado que aplica y los valores. Todos tienen niveles 1–8. Cada nivel mejora uno o dos parámetros: daño, cantidad, área, recarga o perforación. Los valores exactos se definen en `data/tomes.ts` y se ajustarán probando el juego.

| Pos. | Comportamiento | Fuego | Hielo | Rayo | Pasiva emparejada |
|---|---|---|---|---|---|
| 1 | Proyectil hacia el enemigo más cercano | Ascuas | Fragmento Helado (perfora 1) | Chispa (rebota 2) | Vela |
| 2 | Orbes que giran alrededor del jugador | Espiral Ígnea | Cristales Orbitantes | Esferas Voltaicas | Grimorio |
| 3 | Aura continua alrededor del jugador | Calor Abrasador | Campo de Escarcha | Campo Estático | Amuleto |
| 4 | Impactos en zonas al azar cerca del jugador | Lluvia de Meteoros | Granizo | Rayo | Prisma |
| 5 | Ataque en cono o línea en la dirección de movimiento, perforante | Aliento de Dragón | Lanza de Hielo | Látigo Voltaico | Runa |
| 6 | Explosión periódica centrada en el jugador | Nova Solar | Pulso Glacial | Sobrecarga | Cáliz |

**Valores de referencia de nivel 1** (iguales para los tres elementos salvo ajuste posterior):

| Pos. | Daño | Recarga | Otros |
|---|---|---|---|
| 1 | 10 | 1,2 s | 1 proyectil, 180 px/s |
| 2 | 8 por contacto | — | 2 orbes, radio 40 px, 1 vuelta/2 s, golpe al mismo enemigo cada 0,5 s |
| 3 | 4 por tic | 0,5 s por tic | radio 36 px |
| 4 | 20 | 2,5 s | 2 impactos, radio 24 px, a menos de 150 px del jugador |
| 5 | 14 | 1,8 s | cono de 60° y 70 px / línea de 120 px |
| 6 | 25 | 4 s | radio 70 px |

### 4.6 Pasivas

| Pasiva | Efecto por nivel (máx. 5) | Evoluciona la posición |
|---|---|---|
| Vela | −8 % recarga | 1 |
| Grimorio | +10 % duración | 2 |
| Amuleto | +10 % área | 3 |
| Prisma | +1 proyectil en los niveles 1, 3 y 5 | 4 |
| Runa | +10 % poder | 5 |
| Cáliz | +15 % fuerza de estados | 6 |

### 4.7 Evoluciones

- **Requisitos:** el tomo está a nivel 8, tienes su pasiva emparejada (a cualquier nivel) y abres un cofre.
- **Efecto:** el tomo se sustituye por su evolución. Los valores del nivel 8 se multiplican (daño ×1,5 como mínimo) y se añade un efecto extra:

| Pos. | Fuego | Hielo | Rayo | Efecto extra (por comportamiento) |
|---|---|---|---|---|
| 1 | Infierno | Tormenta de Agujas | Chispa Errante | Proyectiles ilimitados en perforación o rebote |
| 2 | Corona Solar | Anillo de Invierno | Anillo de Plasma | Los orbes no desaparecen y su radio crece y se reduce |
| 3 | Pira | Cero Absoluto | Jaula de Faraday | El aura además repele proyectiles enemigos |
| 4 | Cataclismo | Glaciación | Juicio Celestial | Los impactos dejan una zona persistente 2 s |
| 5 | Ira del Dragón | Lanza del Norte | Látigo del Trueno | Ataca a la vez hacia delante y hacia atrás |
| 6 | Supernova | Era de Hielo | Tormenta Eléctrica | La explosión se repite una segunda vez 0,5 s después |

### 4.8 Enemigos

| Enemigo | Vida base | Velocidad | Daño por contacto | Comportamiento | Aparece desde |
|---|---|---|---|---|---|
| Murciélago | 4 | 75 | 4 | Va directo, rápido | min 0 |
| Esqueleto | 10 | 40 | 6 | Va directo | min 0 |
| Zombi | 25 | 25 | 10 | Va directo, lento, empuje reducido | min 2 |
| Fantasma | 12 | 45 | 6 | Zigzag; atraviesa a los demás enemigos | min 4 |
| Necrófago | 18 | 50 | 8 | Aparece en grupos; embiste cuando está cerca | min 6 |
| Gárgola | 20 | 35 | 6 | Mantiene unos 120 px de distancia y dispara un proyectil (8 de daño) cada 3 s | min 8 |

- **Élites:**
  - Cualquier enemigo básico puede salir como élite: escala ×1,5, aura de color, ×5 de vida, ×1,5 de daño, empuje reducido a la mitad y **siempre suelta cofre**.
  - Probabilidad: 1 % en el minuto 3, que sube +0,5 % cada minuto hasta un máximo del 8 %.
- **Botín:**
  - Gema según el tipo de enemigo.
  - 5 % de probabilidad de moneda (1 de oro × ganancia de oro).
  - 0,5 % de pollo asado (cura 30).
  - 0,2 % de imán.

### 4.9 Minijefes y jefes

- **Minijefe cada 2 minutos** (minutos 2, 4, 6, 8, 12, 14…, saltando los minutos que tienen jefe). Rotan en este orden:
  1. **Gólem de Hueso:** vida 300; anuncia una carga en línea recta (1 s de aviso) y la ejecuta a 3× velocidad.
  2. **Bruja del Pantano:** vida 250; invoca 6 zombis cada 8 s y deja charcos tóxicos (3 de daño cada 0,5 s) que duran 5 s.
  3. **Jinete sin Cabeza:** vida 280; cruza la pantalla en pasadas rápidas, con 1 s de aviso por pasada.

  Sueltan un cofre y 10 monedas.
- **Jefe cada 10 minutos** (minutos 10, 20, 30…). Rotan en este orden:
  1. **Nigromante:** vida 3000.
     - Fase 1: invoca 8 esqueletos cada 6 s y lanza ráfagas de 12 proyectiles en círculo.
     - Fase 2 (≤ 50 % de vida): ráfagas en espiral y se mueve más rápido.
  2. **Lich:** vida 3500.
     - Fase 1: crea zonas de hielo que ralentizan al jugador y lanza proyectiles teledirigidos lentos.
     - Fase 2: se teletransporta cada 5 s y deja una nova al llegar.

  Sueltan un cofre con evolución garantizada (si hay alguna disponible) y 50 monedas.
- **Mientras haya un jefe vivo:**
  - la horda normal aparece al 40 %;
  - se muestra una barra de vida grande en el HUD.
- **Escalado:** la vida de minijefes y jefes se multiplica por `1 + 0,6 × (vuelta − 1)`, donde *vuelta* = cuántas veces ha aparecido ese jefe o minijefe.

### 4.10 Dificultad sin fin

- **Vida de los enemigos** = base × `(1 + 0,12·m)`, donde *m* = minutos transcurridos.
- **Daño de los enemigos** = base × `(1 + 0,05·m)`.
- **Ritmo de aparición:**
  - un objetivo de enemigos vivos que crece de 15 (minuto 0) a 300 (minuto 15);
  - se reponen en anillo, fuera de la pantalla;
  - la mezcla de tipos por minuto se define en `data/waves.ts`.
- **Eventos periódicos** (`data/waves.ts`):
  - círculo de murciélagos que se cierra sobre el jugador (cada 3 min a partir del 5);
  - muro de zombis desde un lado (cada 4 min a partir del 7).
- **Luna de Sangre** (a partir del minuto 30):
  - filtro rojo;
  - vida y daño ×2 adicionales;
  - +50 % de élites.

  Garantiza que las partidas terminen.
- **Puntuación** = segundos sobrevividos × 10 + eliminaciones + 500 × jefes derrotados + 100 × minijefes derrotados.

### 4.11 Mapa

- Cementerio infinito.
- El suelo se repite en mosaico y se dibuja con un TileSprite que sigue a la cámara.
- La decoración (tumbas, cruces, árboles secos, farolas) se coloca de forma determinista por bloques de 256 px a partir de una semilla. No tiene colisión.
- La cámara sigue al jugador con un ligero suavizado.

### 4.12 Meta-progresión

**Oro:** se gana recogiendo monedas, matando minijefes y jefes, y al final de la partida (+1 de oro por cada 30 s sobrevividos). Todo se multiplica por la ganancia de oro.

**Mejoras permanentes** (coste del nivel *k* = base × *k*):

| Mejora | Por nivel | Niveles | Coste base |
|---|---|---|---|
| Vitalidad | +10 % vida | 5 | 100 |
| Poder | +5 % poder | 5 | 150 |
| Celeridad | +5 % velocidad | 3 | 120 |
| Armadura | +1 armadura | 3 | 200 |
| Magnetismo | +20 % radio del imán | 3 | 80 |
| Fortuna | +10 % suerte | 3 | 150 |
| Codicia | +10 % ganancia de oro | 5 | 120 |
| Concentración | −5 % recarga del especial | 3 | 200 |

La suerte aumenta la probabilidad de botín, de élites con cofre y de tener una 4.ª opción al subir de nivel (con suerte ≥ 1,2).

**Misiones (12)**, progreso acumulado entre partidas:

| Misión | Recompensa |
|---|---|
| Elimina 500 enemigos | 100 oro |
| Elimina 5000 enemigos | 400 oro |
| Sobrevive 5 minutos | 50 oro |
| Sobrevive 15 minutos | 200 oro |
| Sobrevive 30 minutos | 600 oro |
| Derrota a tu primer minijefe | 100 oro |
| Derrota a tu primer jefe | Desbloquea Electromante |
| Evoluciona un tomo | 150 oro |
| Quema 1000 enemigos | 150 oro |
| Congela 500 enemigos | 150 oro |
| Electrocuta 1000 enemigos | 150 oro |
| Llega al nivel 40 en una partida | 300 oro |

**Récords:** mejor tiempo y mejor puntuación por mago. Se muestran en un panel de `MenuScene` y en `CharacterSelectScene` (no tienen escena propia).

## 5. Arte placeholder y audio

- **Tamaños:** sprites de 16×16 (jugador, enemigos básicos, recogibles), 24×24 (élites a escala), 32×32 (minijefes) y 48×48 (jefes). Proyectiles de 8×8.
- **Generación:** `art/placeholders.ts` dibuja cada textura con formas simples y una paleta limitada de fantasía oscura de 16 colores (`art/palette.ts`). Las animaciones de 2 fotogramas se hacen con una ligera variación (caminar) y destellos (golpe).
- **Claves:** son estables (`mage_pyro`, `enemy_bat`, `tome_ember_proj`…). Para cambiar al arte final basta con cargar un PNG o un atlas con la misma clave en `BootScene`.
- **Fuente:** pixel art con licencia OFL. Se usa *Pixelify Sans* (licencia OFL, apta para uso comercial), incluida en el repositorio.
- **Audio:** efectos sintetizados con WebAudio (golpe, recoger gema, subir de nivel, explosión, aparición de jefe), con volumen ajustable y silencio. Sin música en el MVP.

## 6. Errores y casos límite

| Situación | Comportamiento |
|---|---|
| Bloqueador de anuncios o script que no carga | `NoopAdProvider`; revivir desactivado con mensaje; banner oculto |
| El anuncio con recompensa se cierra antes de tiempo | No se revive; se sigue mostrando GameOver |
| Guardado corrupto | Copia de seguridad + guardado nuevo + aviso (ver 3.6) |
| `localStorage` no disponible | Partida en memoria + aviso |
| Pestaña en segundo plano o pérdida de foco | Pausa automática |
| Móvil en vertical | Capa "Gira el dispositivo" + pausa |
| Caída de fps | El paso fijo limita la simulación a 4 pasos por fotograma; los topes de entidades evitan la acumulación |
| Subidas de nivel encadenadas (mucha XP de golpe) | Se encolan y se muestran una tras otra |

## 7. Pruebas

- **Vitest** para `core/`, `meta/` y la validación de `data/`:
  - `stats`: combinación de bonus base, meta, pasivas y mago.
  - `leveling`: curva de XP; generación de opciones según lo que se tiene (respeta los máximos de 6 y 8; ofrece oro o cura si no queda nada).
  - `evolution`: requisitos correctos; un tomo ya evolucionado no vuelve a evolucionar.
  - `difficulty`: fórmulas de escalado, programación de minijefes y jefes (saltando minutos con jefe) y Luna de Sangre.
  - `status`: acumulación y reinicio de la congelación, renovación de la quemadura, inmunidades de los jefes.
  - `spatialHash`: consultas por radio y búsqueda del más cercano.
  - `save`: guardado y carga completos, migración, recuperación ante corrupción, funcionamiento sin `localStorage`.
  - `missionTracker`: avance y reclamación de recompensas.
  - Integridad de `data/`: cada tomo tiene 8 niveles y su evolución; cada pasiva empareja con una posición existente; las claves de textura son únicas.
- **Prueba de humo con Playwright** (Chromium preinstalado):
  - arranca el build;
  - entra en una partida con una semilla fija;
  - simula 60 s con movimiento;
  - comprueba que no hay errores en la consola y que se puede subir de nivel;
  - hace una captura.
- **CI:** `npm test` y `npm run build` antes de desplegar.

## 8. Orden de construcción sugerido (lo detallará el plan)

1. Esqueleto: Vite + Phaser + TS, escalado, escenas vacías, CI y Pages.
2. Núcleo de partida: jugador, entrada (teclado y táctil), cámara, mapa, un enemigo, colisiones con rejilla, XP y subida de nivel.
3. Tomos y estados: 6 comportamientos × 3 elementos, pasivas, evoluciones y cofres.
4. Enemigos, élites, oleadas, dificultad sin fin, minijefes y jefes.
5. Magos, especiales y rasgos de arma.
6. Meta: guardado, oro, mejoras, misiones, desbloqueos, récords y escenas de menú.
7. Anuncios (interfaz, Noop y AdSense), revivir y banner.
8. Pulido: números de daño, sacudida, sonidos, pausa y avisos; prueba de humo.
