# Notas de diseño (decisiones del autor)

Decisiones que el autor va tomando y que mandan sobre la spec
(`docs/superpowers/specs/2026-10-27-magos-survivors-design.md`) hasta que esta se actualice.

## Arte

- Sprites de personajes y enemigos de **24×24**.
- Paleta **Resurrect 64**.
- **Contorno negro de 1 px**, que se añade automáticamente con el color `#2e222f`.
- **3 fotogramas de caminar**, en el ciclo 0-1-0-2.
- **3 vistas por personaje:** `_side` (de lado, mirando a la derecha; se voltea para ir a la izquierda), `_down` (de frente, para ir hacia abajo) y `_up` (de espaldas, para ir hacia arriba). Cada vista tiene sus 3 fotogramas.
- Las fuentes de los sprites están en `art/sprites/**.mjs` y se construyen con `node scripts/sprites/build.mjs`.
- Aprobados (3 vistas cada uno): **Piromante**, **Mago reptiliano**, **Cíborg** y **Bruja del viento**.
- Los personajes que vuelan (como la Bruja del viento) usan sus 3 fotogramas para el balanceo en vuelo en lugar de caminar.

## Elementos

- **La lista de elementos la define el autor.** No se añade ninguno por iniciativa propia.
- De momento, **sin mecánicas especiales** por elemento (sin estados alterados definidos), hasta que el autor diga lo contrario.
- **Sin interacciones** entre elementos: ni combos ni tabla de ventajas.
- **Un mago puede tener 2 elementos.**
- Cuántos elementos tendrá el MVP: **por decidir**.
- Lista de elementos (12), en el orden en que los dio el autor:
  1. Fuego
  2. Agua
  3. Tierra
  4. Arena
  5. Psíquico
  6. Fantasma
  7. Sangre
  8. Hielo
  9. Eléctrico
  10. Viento
  11. Acero
  12. Luz
- Los magos y sus elementos los va definiendo el autor uno a uno.

## Magos

| Mago | Elementos | Aspecto | Estado |
|---|---|---|---|
| Piromante | Fuego + Arena | Explorador del desierto con capucha a medio echar, pelo afro, pañuelo rojo, túnica de arena y lámpara mágica de fuego | Aprobado: lado (v9), frente y espaldas |
| Mago reptiliano (nombre provisional) | Psíquico | Hechicero oscuro reptiliano sin gorro, escamas en varios verdes, ojo psíquico morado, túnica negra con ribete morado, cola y báculo cuya punta fragmentada abraza un orbe hasta la mitad | Aprobado: lado (v2), frente y espaldas |
| Cíborg (nombre provisional) | Acero + Luz | Mitad humano y mitad cíborg, estilo roquero/gánster nada tenebroso: cara humana con placa de cromo en sien y pómulo, oreja de cromo, cresta rubia, gafas de sol negras, sonrisa con diente de oro, chaqueta de cuero roja con cuello levantado y tachuelas, camiseta blanca, cadena de oro con colgante de luz, sol dorado en la espalda, vaqueros rotos, zapatillas con suela luminosa y mano de cromo que emite luz | Aprobado: lado, frente y espaldas (v5) |
| Bruja del viento (nombre provisional) | Viento + Psíquico | Bruja joven con aire maduro (inspirada en el estilo general de una referencia del autor, sin copiarla): pelo largo y liso lila con flequillo recto, ojos sencillos y labios rosas, chaqueta azul marino con hombreras y cuello alto blanco, blusa negra, colgante verde azulado, guantes blancos, pantalón y botas; no camina, vuela sentada en su escoba (sus 3 fotogramas son de vuelo) con un gran libro de hechicería de tapas magenta y esquinas doradas que desprende brillo psíquico | Aprobada: lado, frente y espaldas (v3) |
