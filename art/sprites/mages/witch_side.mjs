// Bruja del viento — chica joven, bruja de Viento + Psíquico. Pelo rosa al viento, capita
// menta, vestido morado, medias a rayas y botitas. No camina: vuela sentada en su escoba y
// lleva un libro de hechicería abierto que desprende brillo psíquico.
// Los 3 fotogramas son de vuelo (balanceo arriba y abajo, estelas de viento y chispas).
// Vista de lado: mira a la derecha (el juego la voltea). '.' = transparente; el contorno
// se añade solo.
export const legend = {
  H: 'ed8099', // pelo rosa
  h: 'cf657f', // pelo rosa en sombra
  S: 'fdcbb0', // piel
  s: 'fca790', // piel en sombra
  q: 'f68181', // mejillas
  E: '2e222f', // ojos
  W: 'ffffff', // brillo de los ojos / páginas del libro
  C: '8ff8e2', // capita menta
  c: '30e1b9', // capita en sombra
  P: '905ea9', // vestido morado
  p: '6b3e75', // vestido en sombra
  X: 'eaaded', // raya clara de las medias
  K: '45293f', // botitas
  B: '0eaf9b', // tapas del libro
  b: '0b8a8f', // lomo del libro
  a: 'a884f3', // chispa psíquica
  A: 'eaaded', // chispa psíquica brillante
  y: 'e6904e', // paja de la escoba en sombra
  Y: 'fbb954', // paja de la escoba
  r: 'b33831', // atadura de la escoba
  O: '966c6c', // palo de la escoba
  o: '694f62', // palo en sombra
  w: 'c7dcd0', // estela de viento
};

export default {
  key: 'mage_witch_side',
  name: 'Bruja del viento (lado)',
  size: [24, 24],
  legend,
  frames: [
    [
      '',
      '',
      '.........HHHH',
      '.......hHHHHHHh',
      '.....hhHHHHHHHHH',
      '...hhHHHHHHHSSSS',
      '....hHHHHHHHSWES',
      '.....hHHHHHHSEES',
      '......hHHHHHSqSS',
      '........hHHHsSSs',
      '............s......A',
      '.........cCCCC...a',
      '..w.....cCPPPPc.WWbWW',
      '........cPPPPPPSBBBBB',
      '.......pPPPPPPP',
      '.yYY..pPPPPPPPPp',
      'yYYYYYrOOOOOOOOOOOOo',
      '.yYY.......XP',
      '...........PX',
      'ww.........XP',
      '...........KKK',
      '',
      '',
      '',
    ],
    [
      '',
      '.........HHHH',
      '.......hHHHHHHh',
      '.....hhHHHHHHHHH',
      '...hhHHHHHHHSSSS',
      '....hHHHHHHHSWES',
      '.....hHHHHHHSEES',
      '......hHHHHHSqSS',
      '........hHHHsSSs',
      '............s.....A',
      '...ww....cCCCC......a',
      '........cCPPPPc.WWbWW',
      '........cPPPPPPSBBBBB',
      '.......pPPPPPPP',
      '.yYY..pPPPPPPPPp',
      'yYYYYYrOOOOOOOOOOOOo',
      '.yYY.......XP',
      '...........PX',
      '.w.........XP',
      '...........KKK',
    ],
    [
      '',
      '',
      '',
      '.........HHHH',
      '.......hHHHHHHh',
      '.....hhHHHHHHHHH',
      '...hhHHHHHHHSSSS',
      '....hHHHHHHHSWES',
      '.....hHHHHHHSEES',
      '......hHHHHHSqSS',
      '........hHHHsSSs',
      '............s...a',
      '.........cCCCC.....A',
      '.ww.....cCPPPPc.WWbWW',
      '........cPPPPPPSBBBBB',
      '.......pPPPPPPP',
      '.yYY..pPPPPPPPPp',
      'yYYYYYrOOOOOOOOOOOOo',
      '.yYY.......XP',
      '...........PX',
      '...........XP',
      '..w........KKK',
    ],
  ],
  anim: [0, 1, 0, 2],
  fps: 6,
};
