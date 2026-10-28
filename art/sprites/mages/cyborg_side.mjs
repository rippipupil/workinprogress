// Cíborg — mago de Acero y Luz, mitad humano y mitad cíborg (estilizado, nada realista).
// La mitad derecha del cuerpo es de acero (cabeza, brazo y pierna); la izquierda es humana.
// Abrigo azul marino con ribete dorado y núcleo de luz en el pecho; la mano de acero emite luz.
// Vista de lado: mira a la derecha y enseña la mitad de acero, con la cara humana asomando
// por delante (el juego la voltea).
// '.' = transparente; el contorno se añade solo.
export const legend = {
  H: '9e4539', // pelo castaño rojizo
  h: 'cd683d', // brillo del pelo
  S: 'fdcbb0', // piel
  s: 'fca790', // piel en sombra
  E: '2e222f', // ojo / boca
  M: '9babb2', // acero
  m: '7f708a', // acero en sombra
  l: 'c7dcd0', // brillo del acero
  o: '625565', // remaches y juntas
  L: 'fbff86', // luz
  W: 'ffffff', // núcleo de luz
  C: '484a77', // abrigo azul marino
  c: '323353', // abrigo en sombra
  Y: 'f9c22b', // ribete dorado
  P: '3e3546', // pantalón
  B: '625565', // bota
};

export default {
  key: 'mage_cyborg_side',
  name: 'Cíborg (lado)',
  size: [24, 24],
  legend,
  frames: [
    [
      '',
      '',
      '........HHhH',
      '.......HhHHHH',
      '.......HMMMMMHH',
      '.......mMMlMMSS',
      '.......mMoMMMSS',
      '.......mMMMMLWS',
      '.......mMMoMMSs',
      '.......mmMMMmEs',
      '........mmMMss',
      '.........oMo',
      '......cCCCCCCY',
      '.....cCCCCCCCY',
      '.....cCCCMMMMMMl...L',
      '.....cCCCmmmmmmMLW',
      '.....cCCCCCCCY',
      '.....cCCCCCCCY',
      '....cCCCCCCCCY',
      '....cCCCCCCCCY',
      '....cYYYYYYYYY',
      '......PP..Mm',
      '.....BBB..mMM',
      '',
    ],
    [
      '',
      '',
      '........HHhH',
      '.......HhHHHH',
      '.......HMMMMMHH',
      '.......mMMlMMSS',
      '.......mMoMMMSS',
      '.......mMMMMLWS',
      '.......mMMoMMSs',
      '.......mmMMMmEs',
      '........mmMMss',
      '.........oMo',
      '......cCCCCCCY',
      '.....cCCCCCCCY.....W',
      '.....cCCCMMMMMMl',
      '.....cCCCmmmmmmMLW..L',
      '.....cCCCCCCCY.....L',
      '.....cCCCCCCCY',
      '....cCCCCCCCCY',
      '....cCCCCCCCCY',
      '....cYYYYYYYYY',
      '.....PP....Mm',
      '....BBB....mMM',
      '',
    ],
    [
      '',
      '',
      '........HHhH',
      '.......HhHHHH',
      '.......HMMMMMHH',
      '.......mMMlMMSS',
      '.......mMoMMMSS',
      '.......mMMMMLWS',
      '.......mMMoMMSs',
      '.......mmMMMmEs',
      '........mmMMss',
      '.........oMo',
      '......cCCCCCCY',
      '.....cCCCCCCCY',
      '.....cCCCMMMMMMl...L',
      '.....cCCCmmmmmmMLW',
      '.....cCCCCCCCY',
      '.....cCCCCCCCY',
      '....cCCCCCCCCY',
      '....cCCCCCCCCY',
      '....cYYYYYYYYY',
      '.......PPMm',
      '.......BBmMM',
      '',
    ],
  ],
  anim: [0, 1, 0, 2],
  fps: 6,
};
