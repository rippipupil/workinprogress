// Vampiro — mago de Sangre, elegante. Viste un traje rojo a medida: sombrero de ala ancha con
// hebilla dorada, chaqueta de levita con cuello alto levantado que le tapa la boca, solapas,
// pañuelo blanco al cuello, doble fila de botones dorados, faldones detrás, pantalón rojo y
// zapatos negros. Casi no se le ve la cara: sombra bajo el ala, ojos rojos que brillan y
// colmillos. Junto a su mano pálida flotan gotas de sangre (cambian en cada fotograma).
// Vista de lado: mira a la derecha (el juego la voltea). '.' = transparente; el contorno
// se añade solo.
export const legend = {
  R: 'ae2334', // ropa roja
  L: 'e83b3b', // brillo de la ropa
  r: '6e2727', // ropa en sombra
  C: '831c5d', // cuello alto de la chaqueta
  c: '45293f', // interior del cuello
  h: '45293f', // sombra del ala del sombrero
  P: 'c7dcd0', // piel pálida
  p: '9babb2', // piel pálida en sombra
  E: 'f04f78', // ojos rojos que brillan
  F: 'ffffff', // colmillos
  W: 'ffffff', // pañuelo blanco
  Y: 'f9c22b', // broche y hebilla dorados
  k: '3e3546', // zapatos, cinta del sombrero, pelo y nudo del pañuelo
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
      '......rRRCCCC.......e',
      '.......RRRrW',
      '......RRRRrW......D',
      '......RRRLRkRRRPp',
      '......RRRLRY.......d',
      '.....rRRRLRR',
      '....rRRRRRR',
      '...rRr.RRRR',
      '...rr...rRR',
      '........rRR',
      '.......rR.Rr',
      '......kkk.kkk',
      '',
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
      '......rRRCCCC.....e',
      '.......RRRrW',
      '......RRRRrW.......D',
      '......RRRLRkRRRPp',
      '......RRRLRY........D',
      '.....rRRRLRR',
      '....rRRRRRR',
      '...rRr.RRRR',
      '...rr...rRR',
      '........rRR',
      '......rR..Rr',
      '.....kkk...kkk',
      '',
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
      '......CkkkhCCF.....d',
      '......rRRCCCC',
      '.......RRRrW......e',
      '......RRRRrW',
      '......RRRLRkRRRPp...D',
      '......RRRLRY',
      '.....rRRRLRR',
      '....rRRRRRR',
      '...rRr.RRRR',
      '...rr...rRR',
      '........rRR',
      '........rRr',
      '........kkkk',
      '',
      '',
      '',
    ],
  ],
  anim: [0, 1, 0, 2],
  fps: 6,
};
