// Cíborg — mago de Acero y Luz, mitad humano y mitad cíborg (estilizado, nada realista),
// con mucha actitud: cresta rubia, gafas de sol grandes con reflejos, sonrisa chulesca,
// chaqueta de cuero negra con cuello levantado y tachuelas, camiseta blanca, cadena de oro
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
  G: '2e222f', // montura de las gafas de sol
  g: '8fd3ff', // reflejo azul de las gafas
  q: 'f04f78', // reflejo rosa de las gafas
  M: '9babb2', // acero
  m: '7f708a', // acero en sombra
  l: 'c7dcd0', // brillo del acero / tachuelas
  o: '625565', // remaches y juntas
  L: 'fbff86', // luz
  W: 'ffffff', // núcleo de luz
  J: '3e3546', // chaqueta de cuero negra
  j: '313638', // cuero en sombra
  k: '625565', // borde y brillo del cuero
  T: 'ffffff', // camiseta blanca / dientes / zapatillas
  t: 'c7dcd0', // camiseta en sombra / roto del vaquero
  Y: 'f9c22b', // cadena y sol dorados
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
      '.......mMMGGgqG',
      '.......mMMGGLGGG',
      '.......mMMoMTTE',
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
      '.......mMMGGgqG',
      '.......mMMGGLGGG',
      '.......mMMoMTTE',
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
      '.......mMMGGgqG',
      '.......mMMGGLGGG',
      '.......mMMoMTTE',
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
