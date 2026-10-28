// Mago reptiliano — hechicero oscuro psíquico. Reptiliano sin gorro, con cresta de púas,
// hocico largo y mandíbula clara; túnica negra con ribete morado y cola asomando por detrás.
// Concentra un orbe de energía psíquica delante de la garra.
// Mira a la derecha (el juego lo voltea). '.' = transparente; el contorno se añade solo.
const legend = {
  d: '165a4c', // escamas en sombra
  g: '239063', // escamas
  G: '1ebc73', // escamas claras
  l: '91db69', // brillo de escamas
  P: 'cddf6c', // mandíbula y garganta
  p: 'a2a947', // mandíbula en sombra
  Y: 'd5e04b', // ojo de reptil
  E: '2e222f', // pupila / fosa nasal / boca
  K: '3e3546', // túnica negra
  k: '313638', // túnica en sombra
  h: '625565', // brillo de la túnica
  V: '905ea9', // ribete psíquico
  v: '6b3e75', // ribete en sombra
  A: 'a884f3', // orbe psíquico
  O: '905ea9', // borde del orbe
  w: 'eaaded', // brillo psíquico
};
export default {
  key: 'mage_reptile',
  name: 'Mago reptiliano',
  size: [24, 24],
  legend,
  frames: [
  [
    '',
    '.......d..d',
    '......dl.dlG',
    '.......dGlGGd',
    '......dGGgGGdd',
    '......dGgGGYEGG',
    '......dGGgGGGGGlEl',
    '......dgGGGGdddddd',
    '......dgGGGPPPPPp',
    '.......dgGPPPp',
    '........dgPp',
    '......kKKVVKKk........w',
    '.....kKhKVKKKKk....ww',
    '....kKhKKVKKKKKk..wAAO',
    '....kKhKKVKKKKKKk.AAAO',
    '....kKhKKVKKKKKkgG.OO',
    '....kKhKKVKKKKKkG',
    '....kKhKKVKKKKk',
    '...kKhKKKVKKKKk',
    '...kKhKKKVKKKKKk',
    '.dGkKhKKKVKKKKKk',
    'dGgkvvvvvvvvvvvk',
    '.....gG...gG',
    '',
  ],
  [
    '',
    '.......d..d',
    '......dl.dlG',
    '.......dGlGGd',
    '......dGGgGGdd',
    '......dGgGGYEGG',
    '......dGGgGGGGGlEl',
    '......dgGGGGdddddd',
    '......dgGGGPPPPPp',
    '.......dgGPPPp',
    '........dgPp',
    '......kKKVVKKk...w',
    '.....kKhKVKKKKk....wA',
    '....kKhKKVKKKKKk..AwAO',
    '....kKhKKVKKKKKKk.AAAO',
    '....kKhKKVKKKKKkgG.OO',
    '....kKhKKVKKKKKkG.....w',
    '....kKhKKVKKKKk',
    '...kKhKKKVKKKKk',
    '.dGkKhKKKVKKKKKk',
    'dG.kKhKKKVKKKKKk',
    'd..kvvvvvvvvvvvk',
    '....gG.....gG',
    '',
  ],
  [
    '',
    '.......d..d',
    '......dl.dlG',
    '.......dGlGGd',
    '......dGGgGGdd',
    '......dGgGGYEGG',
    '......dGGgGGGGGlEl',
    '......dgGGGGdddddd',
    '......dgGGGPPPPPp',
    '.......dgGPPPp',
    '........dgPp',
    '......kKKVVKKk........w',
    '.....kKhKVKKKKk....ww',
    '....kKhKKVKKKKKk..wAAO',
    '....kKhKKVKKKKKKk.AAAO',
    '....kKhKKVKKKKKkgG.OO',
    '....kKhKKVKKKKKkG',
    '....kKhKKVKKKKk',
    '...kKhKKKVKKKKk',
    '...kKhKKKVKKKKKk',
    '.dGkKhKKKVKKKKKk',
    'dGgkvvvvvvvvvvvk',
    '......gG.gG',
    '',
  ],
  ],
  anim: [0, 1, 0, 2],
  fps: 6,
};
