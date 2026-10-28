// Bruja del viento — bruja de Viento + Psíquico, joven pero con aire maduro. Pelo largo y liso
// lila rosado con flequillo recto, ojos con eyeliner, labios rosas; chaqueta azul marino con
// hombreras y cuello alto blanco, blusa negra, colgante verde azulado, guantes blancos,
// pantalón oscuro y botas. No camina: vuela sentada en su escoba con un libro de hechicería
// que desprende brillo psíquico. Los 3 fotogramas son de vuelo (balanceo, estelas, chispas).
// Vista de lado: mira a la derecha (el juego la voltea). '.' = transparente; el contorno
// se añade solo.
export const legend = {
  H: 'eaaded', // pelo lila rosado
  h: 'a884f3', // pelo en sombra (lavanda)
  S: 'fdcbb0', // piel
  s: 'fca790', // piel en sombra
  q: 'ed8099', // sombra de ojos y colorete
  L: 'cf657f', // labios
  E: '2e222f', // eyeliner
  a: 'a884f3', // iris violeta / chispa psíquica
  A: 'eaaded', // chispa psíquica brillante
  W: 'ffffff', // páginas del libro
  w: 'c7dcd0', // cuello blanco / estela de viento
  g: 'c7dcd0', // guantes blancos
  N: '484a77', // chaqueta azul marino
  n: '323353', // chaqueta en sombra / pantalón
  l: '4d65b4', // brillo de la chaqueta
  k: '3e3546', // blusa negra
  T: '0eaf9b', // colgante verde azulado
  K: '45293f', // botas
  B: '0eaf9b', // tapas del libro
  b: '0b8a8f', // lomo del libro
  y: 'e6904e', // paja de la escoba en sombra
  Y: 'fbb954', // paja de la escoba
  r: 'b33831', // atadura de la escoba
  O: '966c6c', // palo de la escoba
  o: '694f62', // palo en sombra
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
      '......hHHHHHHHHH',
      '.hhhHHHHHHHHHHHH',
      '..hhHHHHHHHHSEaS',
      '...hhHHHHHHHSSSS',
      '....hhHHHHHHSqLs',
      '......hHHHHHsSs',
      '......hHHHHwws.....A',
      '.....hHnNNwwk....a',
      'w....hHnNlNNkT..WWbWW',
      '.....hnNNlNNNNggBBBBB',
      '......nNNNNNNN',
      '.yYY..nNNNNNNNNn',
      'yYYYYYrOOOOOOOOOOOOo',
      '.yYY.......nN',
      '...........nN',
      'ww.........nN',
      '...........KKK',
      '',
      '',
      '',
    ],
    [
      '',
      '.........HHHH',
      '.......hHHHHHHh',
      '......hHHHHHHHHH',
      '.hhhHHHHHHHHHHHH',
      '..hhHHHHHHHHSEaS',
      '...hhHHHHHHHSSSS',
      '....hhHHHHHHSqLs',
      '......hHHHHHsSs',
      '......hHHHHwws....A',
      '.ww..hHnNNwwk.......a',
      '.....hHnNlNNkT..WWbWW',
      '.....hnNNlNNNNggBBBBB',
      '......nNNNNNNN',
      '.yYY..nNNNNNNNNn',
      'yYYYYYrOOOOOOOOOOOOo',
      '.yYY.......nN',
      '...........nN',
      '.w.........nN',
      '...........KKK',
    ],
    [
      '',
      '',
      '',
      '.........HHHH',
      '.......hHHHHHHh',
      '......hHHHHHHHHH',
      '.hhhHHHHHHHHHHHH',
      '..hhHHHHHHHHSEaS',
      '...hhHHHHHHHSSSS',
      '....hhHHHHHHSqLs',
      '......hHHHHHsSs',
      '......hHHHHwws..a',
      '.....hHnNNwwk......A',
      '.....hHnNlNNkT..WWbWW',
      'ww...hnNNlNNNNggBBBBB',
      '......nNNNNNNN',
      '.yYY..nNNNNNNNNn',
      'yYYYYYrOOOOOOOOOOOOo',
      '.yYY.......nN',
      '...........nN',
      '...........nN',
      '..w........KKK',
    ],
  ],
  anim: [0, 1, 0, 2],
  fps: 6,
};
