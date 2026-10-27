// Piromante — mago de fuego con Bastón de Brasas (garra de hueso que sujeta una brasa).
// Mira a la derecha (el juego lo voltea). '.' = transparente; el contorno se añade solo.
const legend = {
  r: '6e2727', // túnica/sombrero oscuro
  R: 'b33831', // túnica/sombrero
  L: 'ea4f36', // brillo de la túnica
  M: 'ae2334', // manga
  c: '45293f', // forro de la capa
  b: '4c3e24', // cinturón de cuero
  Y: 'f9c22b', // oro / núcleo de la brasa
  O: 'f79617', // oro en sombra
  S: 'fdcbb0', // piel
  s: 'fca790', // piel en sombra
  E: '2e222f', // ojos
  H: '3e3546', // pelo
  B: '625565', // botas
  W: '9e4539', // madera del bastón
  w: '7a3045', // madera en sombra
  K: 'c7dcd0', // garra de hueso
  k: '9babb2', // hueso en sombra
  F: 'fb6b1d', // llama
  f: 'fbff86', // brillo de la llama
};

const body = [
  '..................F',
  '......rr.........FYF',
  '......rRr......kFYfYFk',
  '.......rRr.....KOFYFOK',
  '.......rRLr....KkOFOkK',
  '........rRLr....kKKKk',
  '.......rRRRLr....kk',
  '......rOYYYYYr...Ww',
  '....rrRRRRRRRRrr.Ww',
  '......HSSSSSSs...Ww',
  '......HSSESSES...Ww',
  '......HSSESSES...Ww',
  '.......sSSSSs....Ww',
  '...c.rRLYYLRr....Ww',
  '...crLRRRRRRrr...Ww',
  '...crLRRRRRrRMMSSWw',
  '...crLRRRRRrMMMs.Ww',
  '..ccrObbYbbbOr...Ww',
  '..ccrLRRRrRRRr...Ww',
  '..crLRRRRRrRRRr..Ww',
  '..crLRRRRRrRRRRr.Ww',
  '...rOOOOOOOOOOOr.Ww',
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
