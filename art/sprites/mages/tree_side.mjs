// Árbol humanoide — mago de Tierra + Planta: árbol embrujado y delgado. Cuernos de ramas
// desnudas con matas de hojas en las puntas, cara de corteza con dos ojos que brillan,
// brazos de rama que acaban en grandes matas de hojas con garras de raíz, una piedra
// incrustada en el tronco y cuatro patas de raíz largas y abiertas (al caminar levanta un
// par u otro; cae alguna hoja).
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
  W: 'fbff86', // centro brillante de los ojos
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
      '...Gb.....bG',
      '....bb...b',
      '.....bb..b',
      '......bB.Bb',
      '.......bBBbgl',
      '........bBgGBb',
      '........bBBcBBb',
      '........bBBBYWb',
      '.a......bBcBBBb',
      '.........bBBBb',
      '.........bBcBbbbb',
      '.....gGG..bcBB..GlGg',
      '....gGGb..bBcB.gGGlGG',
      '..........bcRB.GaGGGg',
      '..........bBcB..bBbB',
      '..........bBBb..b.b',
      '..........bcBB',
      '.........bbBBbb',
      '.......bb.bBBbbb',
      '.....bb..b...b..bb',
      '....b...b.....b...b',
      '...b...b.......b...b',
      '',
    ],
    [
      '',
      '...Gb.....bG',
      '....bb...b',
      '.....bb..b',
      '......bB.Bb',
      '.......bBBbgl',
      '........bBgGBb',
      '........bBBcBBb',
      '........bBBBYWb',
      '........bBcBBBb',
      '.........bBBBb',
      '.o.......bBcBbbbb',
      '.....gGG..bcBB..GlGg',
      '....gGGb..bBcB.gGGlGG',
      '..........bcRB.GaGGGg',
      '..........bBcB..bBbB',
      '..........bBBb..b.b',
      '..........bcBB',
      '.........bbBBbb',
      '.......bb.bBBbbb',
      '.....bb..b...b..bb',
      '.....b..b.....b...b',
      '...............b...b',
      '',
    ],
    [
      '',
      '...Gb.....bG',
      '....bb...b',
      '.....bb..b',
      '......bB.Bb',
      '.......bBBbgl',
      '........bBgGBb',
      '........bBBcBBb',
      '........bBBBYWb',
      '........bBcBBBb',
      '.........bBBBb',
      '.........bBcBbbbb',
      '.....gGG..bcBB..GlGg',
      '..l.gGGb..bBcB.gGGlGG',
      '..........bcRB.GaGGGg',
      '..........bBcB..bBbB',
      '..........bBBb..b.b',
      '..........bcBB',
      '.........bbBBbb',
      '.......bb.bBBbbb',
      '.....bb..b...b..bb',
      '....b...b.....b..b',
      '...b...b',
      '',
    ],
  ],
  anim: [0, 1, 0, 2],
  fps: 6,
};
