// Piromante — hechicero del desierto: shemagh rojo y blanco con agal, bisht con ribete
// dorado sobre thobe claro y fajín rojo. Bastón de Brasas (garra de hueso con brasa).
// Mira a la derecha (el juego lo voltea). '.' = transparente; el contorno se añade solo.
const legend = {
  Q: 'c7dcd0', // shemagh claro
  X: 'b33831', // dibujo rojo del shemagh
  A: '3e3546', // agal (cordón)
  T: 'c7dcd0', // thobe
  t: '9babb2', // thobe en sombra
  N: '9e4539', // bisht (capa) rojo óxido
  n: '7a3045', // bisht en sombra
  M: '7a3045', // manga
  R: 'b33831', // fajín
  r: '6e2727', // nudo del fajín
  Y: 'f9c22b', // oro / núcleo de la brasa
  O: 'f79617', // oro en sombra
  S: 'e6904e', // piel
  s: 'cd683d', // piel en sombra
  E: '2e222f', // ojos
  D: '3e3546', // barba
  B: '9e4539', // sandalias
  W: '966c6c', // madera del bastón
  w: '694f62', // madera en sombra
  K: 'c7dcd0', // garra de hueso
  k: '9babb2', // hueso en sombra
  F: 'fb6b1d', // llama
  f: 'fbff86', // brillo de la llama
};

const body = [
  '..................F',
  '.................FYF',
  '........QQQQ...kFYfYFk',
  '.......QXQQXQ..KOFYFOK',
  '......AAAAAAAA.KkOFOkK',
  '......QQXQQXQQ..kKKKk',
  '.....QQXssssssQ..kk',
  '.....QQQSSSSSSQ..Ww',
  '.....QXQSSESESQ..Ww',
  '.....QQQSSSSSs...Ww',
  '....QQXQSDDDDS...Ww',
  '....QQQQ.sDDDs...Ww',
  '....QXQQ..DD.....Ww',
  '.....nNYTTTYNn...Ww',
  '....nNNYTTTYNNn..Ww',
  '....nNNYTTTYNNMSSWw',
  '....nNNYTTTYNMMs.Ww',
  '....nNNRRrRRNNn..Ww',
  '....nNNYTTTYNNn..Ww',
  '...nNNNYTTTYNNNn.Ww',
  '...nNNNYTTtYNNNn.Ww',
  '...nnnnYTTtYnnnn.Ww',
];

// 3 fotogramas de caminar: neutro, pasos abiertos, pies juntos.
const feet = [
  '.....BB....BB',
  '....BB......BB',
  '......BB.BB',
];

export default {
  key: 'mage_pyro',
  name: 'Piromante',
  size: [24, 24],
  legend,
  frames: feet.map((f) => [...body, f]),
  anim: [0, 1, 0, 2],
  fps: 6,
};
