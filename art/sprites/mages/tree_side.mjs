// Árbol humanoide — mago de Tierra + Planta, delgado. Copa irregular de hojas variadas
// (verdes, oliva, amarillentas y alguna otoñal) con ramitas y flores rosas, cara de corteza
// con ojos que brillan, barba de musgo, piedras en los hombros, brazos de rama que acaban en
// hojas y raíces por pies (los 3 fotogramas de caminar mueven las raíces; cae alguna hoja).
// Vista de lado: mira a la derecha (el juego la voltea). '.' = transparente; el contorno
// se añade solo.
export const legend = {
  g: '165a4c', // hojas en sombra
  G: '239063', // hojas
  l: '91db69', // brillo de las hojas
  f: 'f04f78', // flor
  a: 'a2a947', // hojas oliva
  y: 'cddf6c', // hojas verde amarillento
  o: 'e6904e', // hoja otoñal
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
      '.......gl..Ga.b',
      '.....gGGlGaaG.gb',
      '....gGlGGGaGGyGg',
      '...ogGgGGfGGGlGG',
      '....gGaGGGGGgGG',
      '....bg.gGG.gGl',
      '.........bBBBB',
      '.........bkBYB',
      '..a......bBBBBc',
      '.........bmMMm',
      '.........mMm',
      '.......RrbBBb',
      '........bBcBbBBb',
      '........bcBB...bbG',
      '........bBcB.....Gl',
      '........bBMB',
      '........bcBB',
      '........bBcB',
      '.......bbBBbb',
      '.......bB.Bb',
      '......bB...Bb',
      '.....bb.....bb',
      '',
    ],
    [
      '',
      '.......gl..Ga.b',
      '.....gGGlGaaG.gb',
      '....gGlGGGaGGyGg',
      '...ogGgGGfGGGlGG',
      '....gGaGGGGGgGG',
      '....bg.gGG.gGl',
      '.........bBBBB',
      '.........bkBYB',
      '.........bBBBBc',
      '.........bmMMm',
      '.o.......mMm',
      '.......RrbBBb',
      '........bBcBbBBb',
      '........bcBB...bbG',
      '........bBcB.....Gl',
      '........bBMB',
      '........bcBB',
      '........bBcB',
      '.......bbBBbb',
      '......bB...Bb',
      '.....bB.....Bb',
      '....bb.......bb',
      '',
    ],
    [
      '',
      '.......gl..Ga.b',
      '.....gGGlGaaG.gb',
      '....gGlGGGaGGyGg',
      '...ogGgGGfGGGlGG',
      '....gGaGGGGGgGG',
      '....bg.gGG.gGl',
      '.........bBBBB',
      '.........bkBYB',
      '.........bBBBBc',
      '.........bmMMm',
      '.........mMm',
      '.......RrbBBb',
      '..l.....bBcBbBBb',
      '........bcBB...bbG',
      '........bBcB.....Gl',
      '........bBMB',
      '........bcBB',
      '........bBcB',
      '.......bbBBbb',
      '........bBBb',
      '.......bB.Bb',
      '......bb...bb',
      '',
    ],
  ],
  anim: [0, 1, 0, 2],
  fps: 6,
};
