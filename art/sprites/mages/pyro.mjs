// Piromante — explorador del desierto con la capucha echada hacia atrás, pelo afro, pañuelo rojo, túnica de
// arena, fajín y pantalón; lleva una lámpara mágica de la que brota fuego. Mira a la derecha (el juego lo voltea). '.' = transparente; el contorno
// se añade solo. Los 3 fotogramas de caminar cambian pies y llama.
const legend = {
  N: '7a3045', // capucha y capa granate
  n: '45293f', // capucha y capa en sombra
  P: '694f62', // pantalón
  p: '45293f', // pantalón en sombra
  L: '9e4539', // luz de la capucha (arriba a la izquierda)
  K: 'a24b6f', // borde enrollado de la abertura
  H: '3e3546', // pelo afro
  h: '625565', // brillo del pelo
  S: 'cd683d', // piel
  s: '9e4539', // piel en sombra
  E: '2e222f', // ojos
  T: 'ab947a', // túnica de arena
  t: '966c6c', // túnica en sombra
  R: 'b33831', // pañuelo y fajín
  r: '6e2727', // nudos
  Y: 'f9c22b', // oro (ribete, lámpara) / núcleo de la llama
  O: 'f79617', // oro en sombra
  B: '4c3e24', // botas
  F: 'fb6b1d', // llama
  f: 'fbff86', // brillo
};

export default {
  key: 'mage_pyro',
  name: 'Piromante',
  size: [24, 24],
  legend,
  frames: [
  [
    '',
    '....nNL..HhHhH',
    '....nLLKHhHHhHH',
    '....nLLKHHhHHhHh',
    '....nLNKhHHhHHhHH',
    '....nNNKHHhHHhHHh',
    '....nNNKHhHHhHHhH',
    '....nNNnKHSSSSSH',
    '....nNNnKHSESES',
    '....nNnnnKSSSSS',
    '.....nnnnKsSSs',
    '.....nnnK..ss........F',
    '....nNRRRRrRRR.......Ff',
    '....nNTRRRRRRTT.......F',
    '...nNTTTTYTTTTt....Y..O',
    '...nNTTTTYTTTttt..OYO.Y',
    '...nNRRRRrRRRRtSSYYfYYY',
    '...nNTTTTYTTTt...OYYYO',
    '...nNTTTTYTTTt....OOO',
    '....nPPPPpPPP',
    '.....PPP..PPP',
    '.....PPp..PPp',
    '.....BBB..BBB',
    '',
  ],
  [
    '',
    '....nNL..HhHhH',
    '....nLLKHhHHhHH',
    '....nLLKHHhHHhHh',
    '....nLNKhHHhHHhHH',
    '....nNNKHHhHHhHHh',
    '....nNNKHhHHhHHhH',
    '....nNNnKHSSSSSH',
    '....nNNnKHSESES',
    '....nNnnnKSSSSS',
    '.....nnnnKsSSs........F',
    '.....nnnK..ss........fF',
    '....nNRRRRrRRR.......FY',
    '....nNTRRRRRRTT.......F',
    '...nNTTTTYTTTTt....Y..O',
    '...nNTTTTYTTTttt..OYO.Y',
    '...nNRRRRrRRRRtSSYYfYYY',
    '...nNTTTTYTTTt...OYYYO',
    '...nNTTTTYTTTt....OOO',
    '....nPPPPpPPP',
    '.....PPP..PPP',
    '.....PPp..PPp',
    '....BBB....BBB',
    '',
  ],
  [
    '',
    '....nNL..HhHhH',
    '....nLLKHhHHhHH',
    '....nLLKHHhHHhHh',
    '....nLNKhHHhHHhHH',
    '....nNNKHHhHHhHHh',
    '....nNNKHhHHhHHhH',
    '....nNNnKHSSSSSH',
    '....nNNnKHSESES',
    '....nNnnnKSSSSS',
    '.....nnnnKsSSs',
    '.....nnnK..ss........F',
    '....nNRRRRrRRR.......Ff',
    '....nNTRRRRRRTT.......F',
    '...nNTTTTYTTTTt....Y..O',
    '...nNTTTTYTTTttt..OYO.Y',
    '...nNRRRRrRRRRtSSYYfYYY',
    '...nNTTTTYTTTt...OYYYO',
    '...nNTTTTYTTTt....OOO',
    '....nPPPPpPPP',
    '.....PPP..PPP',
    '.....PPp..PPp',
    '......BBBBBB',
    '',
  ],
  ],
  anim: [0, 1, 0, 2],
  fps: 6,
};
