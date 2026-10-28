// Mago reptiliano — hechicero oscuro psíquico. Reptiliano sin gorro, con cresta de púas,
// hocico largo y mandíbula clara; túnica negra con ribete morado y cola asomando por detrás.
// Ojo psíquico morado. Lleva un báculo de madera oscura cuya punta se abre en fragmentos
// que abrazan un orbe psíquico hasta la mitad.
// Mira a la derecha (el juego lo voltea). '.' = transparente; el contorno se añade solo.
const legend = {
  d: '165a4c', // escamas en sombra
  g: '239063', // escamas
  G: '1ebc73', // escamas claras
  l: '91db69', // brillo de escamas
  P: 'cddf6c', // mandíbula y garganta
  p: 'a2a947', // mandíbula en sombra
  E: '2e222f', // pupila / fosa nasal / boca
  K: '3e3546', // túnica negra
  k: '313638', // túnica en sombra
  h: '625565', // brillo de la túnica
  V: '905ea9', // ribete psíquico
  v: '6b3e75', // ribete en sombra
  A: 'a884f3', // orbe y ojo psíquico
  W: '966c6c', // madera del báculo
  x: '694f62', // madera en sombra
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
    '.......d..d.....w.AwA',
    '......dl.dlG.....AwAAO',
    '.......dGlGGd...WAAAAOW',
    '......dGGgGGdd..xWOOOWx',
    '......dGgGGwAGG..W.W.W',
    '......dGGgGGGGGlElWx',
    '......dgGGGGddddddWx',
    '......dgGGGPPPPPp.Wx',
    '.......dgGPPPp....Wx',
    '........dgPp......Wx',
    '......kKKVVKKk....Wx',
    '.....kKhKVKKKKk...Wx',
    '....kKhKKVKKKKKk..Wx',
    '....kKhKKVKKKKKKk.Wx',
    '....kKhKKVKKKKKkgGWx',
    '....kKhKKVKKKKKkG.Wx',
    '....kKhKKVKKKKk...Wx',
    '...kKhKKKVKKKKk...Wx',
    '...kKhKKKVKKKKKk..Wx',
    '.dGkKhKKKVKKKKKk..Wx',
    'dGgkvvvvvvvvvvvk..Wx',
    '.....gG...gG',
    '',
  ],
  [
    '',
    '.......d..d.......AwA.w',
    '......dl.dlG.....AwAAO',
    '.......dGlGGd...WAAAAOW',
    '......dGGgGGdd..xWOOOWx',
    '......dGgGGwAGG..W.W.W',
    '......dGGgGGGGGlwlWx',
    '......dgGGGGddddddWx',
    '......dgGGGPPPPPp.Wx',
    '.......dgGPPPp....Wx',
    '........dgPp......Wx',
    '......kKKVVKKk....Wx',
    '.....kKhKVKKKKk...Wx',
    '....kKhKKVKKKKKk..Wx',
    '....kKhKKVKKKKKKk.Wx',
    '....kKhKKVKKKKKkgGWx',
    '....kKhKKVKKKKKkG.Wx',
    '....kKhKKVKKKKk...Wx',
    '...kKhKKKVKKKKk...Wx',
    '.dGkKhKKKVKKKKKk..Wx',
    'dG.kKhKKKVKKKKKk..Wx',
    'd..kvvvvvvvvvvvk..Wx',
    '....gG.....gG',
    '',
  ],
  [
    '',
    '.......d..d.....w.AwA',
    '......dl.dlG.....AwAAO',
    '.......dGlGGd...WAAAAOW',
    '......dGGgGGdd..xWOOOWx',
    '......dGgGGwAGG..W.W.W',
    '......dGGgGGGGGlElWx',
    '......dgGGGGddddddWx',
    '......dgGGGPPPPPp.Wx',
    '.......dgGPPPp....Wx',
    '........dgPp......Wx',
    '......kKKVVKKk....Wx',
    '.....kKhKVKKKKk...Wx',
    '....kKhKKVKKKKKk..Wx',
    '....kKhKKVKKKKKKk.Wx',
    '....kKhKKVKKKKKkgGWx',
    '....kKhKKVKKKKKkG.Wx',
    '....kKhKKVKKKKk...Wx',
    '...kKhKKKVKKKKk...Wx',
    '...kKhKKKVKKKKKk..Wx',
    '.dGkKhKKKVKKKKKk..Wx',
    'dGgkvvvvvvvvvvvk..Wx',
    '......gG.gG',
    '',
  ],
  ],
  anim: [0, 1, 0, 2],
  fps: 6,
};
