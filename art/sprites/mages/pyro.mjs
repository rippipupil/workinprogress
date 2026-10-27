// Piromante — mago de fuego con Bastón de Brasas. Mira a la derecha (el juego lo voltea).
// '.' = transparente. El contorno se añade automáticamente.
const legend = {
  r: '6e2727', // túnica/sombrero oscuro
  R: 'b33831', // túnica/sombrero
  L: 'ea4f36', // brillo de la túnica
  Y: 'f9c22b', // banda dorada / núcleo de la brasa
  O: 'f79617', // sombra dorada
  S: 'fdcbb0', // piel
  s: 'fca790', // piel en sombra
  E: '2e222f', // ojos
  H: '3e3546', // pelo
  B: '625565', // botas
  W: '9e4539', // madera del bastón
  w: '7a3045', // madera en sombra
  F: 'fb6b1d', // llama
  f: 'fbff86', // brillo de la llama
};

const body = [
  '........................',
  '......rr.......F',
  '......rRr.....FfF',
  '.......rRr....FYF',
  '.......rRLr...OFO',
  '........rRLr...Ww',
  '.......rRRRLr..Ww',
  '......rOYYYYYr.Ww',
  '....rrRRRRRRRRrrw',
  '......HSSSSSSs.Ww',
  '......HSSESSES.Ww',
  '......HSSESSES.Ww',
  '.......sSSSSs..Ww',
  '......rRRLLRRr.Ww',
  '.....rRRRLRRRrSWw',
  '.....rRRRLRRRrsWw',
  '....rRRRRLRRRRrWw',
  '....rRRRRLRRRRrWw',
  '....rRRRRLRRRRrWw',
  '...rRRRRRLRRRRRrw',
  '...rOOOOOOOOOOOrw',
];

// 3 fotogramas de caminar: neutro, pie delantero adelantado, pies juntos.
const feet = [
  '.....BB...BB....w',
  '....BB.....BB...w',
  '......BB.BB.....w',
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
