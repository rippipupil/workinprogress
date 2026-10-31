// Árbol humanoide — mago de Tierra + Planta. Copa frondosa con una flor rosa, cara de corteza
// con ojos que brillan, barba de musgo, piedras en los hombros, brazos de rama que acaban en
// hojas y raíces por pies (los 3 fotogramas de caminar mueven las raíces; cae alguna hoja).
// Vista de lado: mira a la derecha (el juego la voltea). '.' = transparente; el contorno
// se añade solo.
export const legend = {
  g: '165a4c', // hojas en sombra
  G: '239063', // hojas
  l: '91db69', // brillo de las hojas
  f: 'f04f78', // flor
  B: '966c6c', // corteza
  b: '694f62', // corteza en sombra
  c: 'ab947a', // vetas y nudos claros de la corteza
  k: '4c3e24', // nudo oscuro
  Y: 'd5e04b', // ojos que brillan
  M: '547e64', // musgo
  m: '374e4a', // musgo en sombra
  R: '9babb2', // piedra
  r: '7f708a', // piedra en sombra
};

export default {
  key: 'mage_tree_side',
  name: 'Árbol humanoide (lado)',
  size: [24, 24],
  legend,
  frames: [
    [
      '',
      '.......gGGlg',
      '.....gGGlGGGg',
      '....gGGGGGlGGg',
      '....GGlGGGGGGGg',
      '....gGGGGfGGGGG',
      '.....gGGGGGGGGg',
      '.......bBBBBBB',
      '.......bBkBBYB',
      '..l....bBBBBBBc',
      '.......bBmMMMB',
      '.......bmMMMm',
      '.....RRbBBcBBb',
      '.....rRbBcBBBbBBBb',
      '......bBBcBBB.bbBgG',
      '......bBcBBBBb...gGl',
      '......bBcBMBBb',
      '......bBBcMMBb',
      '.....bBBBcBBBb',
      '.....bbBBBBBbb',
      '......bB..Bb',
      '.....bBB..BBb',
      '....bb......bb',
      '',
    ],
    [
      '',
      '.......gGGlg',
      '.....gGGlGGGg',
      '....gGGGGGlGGg',
      '....GGlGGGGGGGg',
      '....gGGGGfGGGGG',
      '.....gGGGGGGGGg',
      '.......bBBBBBB',
      '.......bBkBBYB',
      '.......bBBBBBBc',
      '.......bBmMMMB',
      '.G.....bmMMMm',
      '.....RRbBBcBBb',
      '.....rRbBcBBBbBBBb',
      '......bBBcBBB.bbBgG',
      '......bBcBBBBb...gGl',
      '......bBcBMBBb',
      '......bBBcMMBb',
      '.....bBBBcBBBb',
      '.....bbBBBBBbb',
      '.....bB....Bb',
      '....bBB....BBb',
      '...bb........bb',
      '',
    ],
    [
      '',
      '.......gGGlg',
      '.....gGGlGGGg',
      '....gGGGGGlGGg',
      '....GGlGGGGGGGg',
      '....gGGGGfGGGGG',
      '.....gGGGGGGGGg',
      '.......bBBBBBB',
      '.......bBkBBYB',
      '.......bBBBBBBc',
      '.......bBmMMMB',
      '.......bmMMMm',
      '.....RRbBBcBBb',
      '..l..rRbBcBBBbBBBb',
      '......bBBcBBB.bbBgG',
      '......bBcBBBBb...gGl',
      '......bBcBMBBb',
      '......bBBcMMBb',
      '.....bBBBcBBBb',
      '.....bbBBBBBbb',
      '.......bBBb',
      '......bBBBb',
      '.....bb...bb',
      '',
    ],
  ],
  anim: [0, 1, 0, 2],
  fps: 6,
};
