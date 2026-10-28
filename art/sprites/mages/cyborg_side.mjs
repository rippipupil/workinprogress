// Cíborg — mago de Acero y Luz, mitad humano y mitad cíborg (estilizado, nada realista),
// pinta de roquero/gánster: cresta rubia, gafas de sol negras, sonrisa con diente de oro,
// chaqueta de cuero roja con cuello levantado y tachuelas, camiseta blanca, cadena de oro
// con colgante de luz, vaqueros rotos y zapatillas con suela luminosa. La mitad derecha del
// cuerpo es de acero y la mano de acero emite luz. Vista de lado: mira a la derecha y enseña
// la mitad de acero, con la cara humana asomando por delante (el juego la voltea).
// '.' = transparente; el contorno se añade solo.
export const legend = {
  H: 'fbb954', // cresta rubia
  h: 'e6904e', // cresta en sombra
  S: 'fdcbb0', // piel
  s: 'fca790', // piel en sombra
  E: '2e222f', // comisura de la sonrisa
  G: '2e222f', // gafas de sol negras
  M: 'c7dcd0', // cromo
  m: '9babb2', // cromo en sombra
  l: 'ffffff', // brillo del cromo / tachuelas
  o: '7f708a', // remaches y juntas
  L: 'fbff86', // luz
  W: 'ffffff', // núcleo de luz / brillo de las gafas
  J: 'e83b3b', // chaqueta de cuero roja
  j: 'b33831', // cuero en sombra
  k: 'ae2334', // borde del cuero
  T: 'ffffff', // camiseta blanca / dientes / zapatillas
  t: 'c7dcd0', // camiseta en sombra / roto del vaquero
  Y: 'f9c22b', // cadena, diente y sol dorados
  D: '4d65b4', // vaqueros
  d: '484a77', // vaqueros en sombra
};

export default {
  key: 'mage_cyborg_side',
  name: 'Cíborg (lado)',
  size: [24, 24],
  legend,
  frames: [
    [
      '',
      '........hH.Hh',
      '.......HHhHHhH',
      '.......MMMMMMSS',
      '.......mMMlMMSS',
      '.......mMoMMMSS',
      '.......mMGGGGWGG',
      '.......mMMMMGGGG',
      '.......mMMoMTYT',
      '.......mmMMMmss',
      '........kmMMss',
      '.......kJoMo',
      '......kJJJJTTY',
      '.....kJlJJTTYT',
      '.....kJJJMMMMMMl...L',
      '.....kJJJmmmmmmMLW',
      '.....kJJJJTTTt',
      '.....kJJJJtTTt',
      '.....kJJJJJJJk',
      '......DDd.MMm',
      '......DtD.MMm',
      '......Dd..Mm',
      '.....TTL..mMM',
      '',
    ],
    [
      '',
      '........hH.Hh',
      '.......HHhHHhH',
      '.......MMMMMMSS',
      '.......mMMlMMSS',
      '.......mMoMMMSS',
      '.......mMGGGGWGG',
      '.......mMMMMGGGG',
      '.......mMMoMTYT',
      '.......mmMMMmss',
      '........kmMMss',
      '.......kJoMo',
      '......kJJJJTTY',
      '.....kJlJJTTYT.....W',
      '.....kJJJMMMMMMl',
      '.....kJJJmmmmmmMLW..L',
      '.....kJJJJTTTt.....L',
      '.....kJJJJtTTt',
      '.....kJJJJJJJk',
      '......DDd.MMm',
      '......DtD.MMm',
      '.....Dd....Mm',
      '....TTL....mMM',
      '',
    ],
    [
      '',
      '........hH.Hh',
      '.......HHhHHhH',
      '.......MMMMMMSS',
      '.......mMMlMMSS',
      '.......mMoMMMSS',
      '.......mMGGGGWGG',
      '.......mMMMMGGGG',
      '.......mMMoMTYT',
      '.......mmMMMmss',
      '........kmMMss',
      '.......kJoMo',
      '......kJJJJTTY',
      '.....kJlJJTTYT',
      '.....kJJJMMMMMMl...L',
      '.....kJJJmmmmmmMLW',
      '.....kJJJJTTTt',
      '.....kJJJJtTTt',
      '.....kJJJJJJJk',
      '......DDd.MMm',
      '......DtD.MMm',
      '.......DdMm',
      '.......TLmMM',
      '',
    ],
  ],
  anim: [0, 1, 0, 2],
  fps: 6,
};
