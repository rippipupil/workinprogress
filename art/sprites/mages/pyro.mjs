// Piromante — explorador del desierto encapuchado, con pelo afro, y una lámpara mágica de la
// que brota fuego. Mira a la derecha (el juego lo voltea). '.' = transparente; el contorno
// se añade solo. Los 3 fotogramas de caminar cambian pies y llama.
const legend = {
  N: '7a3045', // capucha y capa granate
  n: '45293f', // capucha y capa en sombra
  L: '9e4539', // brillo de la capucha
  M: '45293f', // manga
  H: '3e3546', // pelo afro
  h: '625565', // brillo del pelo
  S: 'cd683d', // piel
  s: '9e4539', // piel en sombra
  E: '2e222f', // ojos
  T: 'ab947a', // túnica de arena
  t: '966c6c', // túnica en sombra
  R: 'b33831', // fajín
  r: '6e2727', // nudo del fajín
  Y: 'f9c22b', // oro (ribete, lámpara) / núcleo de la llama
  O: 'f79617', // oro en sombra
  B: '694f62', // botas
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
    '......nNNNn',
    '....nNNNNNNLn',
    '...nNNNNNNNNLn',
    '...nNNNNHhHhHHN',
    '...nNNNHhHHhHhHN',
    '...nNNNHHhHHhHHh',
    '...nNNHhHHSSSSSH',
    '...nNNHHhHSESESN',
    '...nNNNHHHSSSSSN',
    '...nNNNNHHsSSSsN',
    '...nNNNNNNNsssN......F',
    '....nNNNNNNNNn.......Ff',
    '....nnNYTTTYNn........F',
    '...nnNNYTTTYNNn....Y..O',
    '...nnNNYTTTYNNMn..OYO.Y',
    '...nnNNRRrRRNMMSSYYfYYY',
    '...nnNNYTTTYNNn..OYYYO',
    '...nnNNYTTTYNNn...OOO',
    '...nNNNYTTTYNNNn',
    '...nNNNYTTtYNNNn',
    '...nnnnYTTtYnnnn',
    '.....BB....BB',
    '',
  ],
  [
    '',
    '......nNNNn',
    '....nNNNNNNLn',
    '...nNNNNNNNNLn',
    '...nNNNNHhHhHHN',
    '...nNNNHhHHhHhHN',
    '...nNNNHHhHHhHHh',
    '...nNNHhHHSSSSSH',
    '...nNNHHhHSESESN',
    '...nNNNHHHSSSSSN',
    '...nNNNNHHsSSSsN......F',
    '...nNNNNNNNsssN......fF',
    '....nNNNNNNNNn.......FY',
    '....nnNYTTTYNn........F',
    '...nnNNYTTTYNNn....Y..O',
    '...nnNNYTTTYNNMn..OYO.Y',
    '...nnNNRRrRRNMMSSYYfYYY',
    '...nnNNYTTTYNNn..OYYYO',
    '...nnNNYTTTYNNn...OOO',
    '...nNNNYTTTYNNNn',
    '...nNNNYTTtYNNNn',
    '...nnnnYTTtYnnnn',
    '....BB......BB',
    '',
  ],
  [
    '',
    '......nNNNn',
    '....nNNNNNNLn',
    '...nNNNNNNNNLn',
    '...nNNNNHhHhHHN',
    '...nNNNHhHHhHhHN',
    '...nNNNHHhHHhHHh',
    '...nNNHhHHSSSSSH',
    '...nNNHHhHSESESN',
    '...nNNNHHHSSSSSN',
    '...nNNNNHHsSSSsN',
    '...nNNNNNNNsssN......F',
    '....nNNNNNNNNn.......Ff',
    '....nnNYTTTYNn........F',
    '...nnNNYTTTYNNn....Y..O',
    '...nnNNYTTTYNNMn..OYO.Y',
    '...nnNNRRrRRNMMSSYYfYYY',
    '...nnNNYTTTYNNn..OYYYO',
    '...nnNNYTTTYNNn...OOO',
    '...nNNNYTTTYNNNn',
    '...nNNNYTTtYNNNn',
    '...nnnnYTTtYnnnn',
    '......BB.BB',
    '',
  ],
  ],
  anim: [0, 1, 0, 2],
  fps: 6,
};
