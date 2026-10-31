// Vampiro — mago de Sangre. Viste de rojo: sombrero de ala ancha con hebilla dorada, cuello alto que le tapa la boca
// y capa con el bajo en forma de alas de murciélago. Casi no se le ve la cara: solo una franja de
// piel pálida, los ojos rojos que brillan en la sombra y los colmillos asomando sobre el cuello.
// Mano pálida con garras rodeada de gotas de sangre flotantes (cambian en cada fotograma).
// Vista de lado: mira a la derecha (el juego la voltea). '.' = transparente; el contorno
// se añade solo.
export const legend = {
  R: 'ae2334', // ropa roja
  L: 'e83b3b', // brillo de la ropa
  r: '6e2727', // ropa en sombra
  C: '831c5d', // cuello alto
  c: '45293f', // interior del cuello
  h: '45293f', // sombra del ala del sombrero
  P: 'c7dcd0', // piel pálida
  p: '9babb2', // piel pálida en sombra
  E: 'f04f78', // ojos rojos que brillan
  F: 'ffffff', // colmillos
  Y: 'f9c22b', // broche y hebilla dorados
  k: '3e3546', // chaleco, botas, cinta del sombrero y pelo
  K: '313638', // botas en sombra
  D: 'c32454', // gota de sangre
  d: '831c5d', // gota de sangre oscura
  e: 'f68181', // brillo de la sangre
};

export default {
  key: 'mage_vampire_side',
  name: 'Vampiro (lado)',
  size: [24, 24],
  legend,
  frames: [
    [
      '',
      '.......rRRr',
      '.......rLRr',
      '.......rRRr',
      '.......kkYk',
      '...rrRRRRRRRRRRr',
      '......Ckkkhhh',
      '......CkkkhEP',
      '......CkkkhCCF',
      '......rRRCCCC',
      '....rRRRRRrY.......e',
      '...rRRRRRRrkk',
      '..rRRLRRRRrkRRR..D',
      '..rRRLRRRRrkRrPp',
      '.rRRRLRRRRrkk.....d',
      '.rRRRLRRRRrkk',
      '.rRRRRLRRRrkk',
      '.rRRRRRRRRrkk',
      '.rRrRRrRRRrkk',
      '.r..r..rRrkK',
      '..........kKK',
      '.........kkKKk',
      '',
      '',
    ],
    [
      '',
      '.......rRRr',
      '.......rLRr',
      '.......rRRr',
      '.......kkYk',
      '...rrRRRRRRRRRRr',
      '......Ckkkhhh',
      '......CkkkhEP',
      '......CkkkhCCF',
      '......rRRCCCC....e',
      '....rRRRRRrY',
      '...rRRRRRRrkk.....D',
      '..rRRLRRRRrkRRR',
      '..rRRLRRRRrkRrPp....D',
      '.rRRRLRRRRrkk',
      '.rRRRLRRRRrkk',
      '.rRRRRLRRRrkk',
      '.rRRRRRRRRrkk',
      '.rRrRRrRRRrkk',
      '.r..r..rRrkKK',
      '.........kK.Kk',
      '........kkK',
      '',
      '',
    ],
    [
      '',
      '.......rRRr',
      '.......rLRr',
      '.......rRRr',
      '.......kkYk',
      '...rrRRRRRRRRRRr',
      '......Ckkkhhh',
      '......CkkkhEP',
      '......CkkkhCCF....d',
      '......rRRCCCC',
      '....rRRRRRrY.....e',
      '...rRRRRRRrkk',
      '..rRRLRRRRrkRRR....D',
      '..rRRLRRRRrkRrPp',
      '.rRRRLRRRRrkk',
      '.rRRRLRRRRrkk',
      '.rRRRRLRRRrkk',
      '.rRRRRRRRRrkk',
      '.rRrRRrRRRrkk',
      '.r..r..rRrkK',
      '...........kK',
      '...........kkK',
      '',
      '',
    ],
  ],
  anim: [0, 1, 0, 2],
  fps: 6,
};
