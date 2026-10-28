# Notas de diseño (decisiones del autor)

Decisiones que el autor va tomando y que mandan sobre la spec
(`docs/superpowers/specs/2026-10-27-magos-survivors-design.md`) hasta que esta se actualice.

## Arte

- Sprites de personajes y enemigos de **24×24**.
- Paleta **Resurrect 64**.
- **Contorno negro de 1 px**, que se añade automáticamente con el color `#2e222f`.
- **3 fotogramas de caminar**, en el ciclo 0-1-0-2.
- Las fuentes de los sprites están en `art/sprites/**.mjs` y se construyen con `node scripts/sprites/build.mjs`.
- Aprobados: **Piromante** (v9, explorador del desierto con capucha, pelo afro y lámpara mágica de fuego).

## Elementos

- **La lista de elementos la define el autor.** No se añade ninguno por iniciativa propia.
- De momento, **sin mecánicas especiales** por elemento (sin estados alterados definidos), hasta que el autor diga lo contrario.
- **Sin interacciones** entre elementos: ni combos ni tabla de ventajas.
- **Un mago puede tener 2 elementos.**
- Cuántos elementos tendrá el MVP: **por decidir**.
- Lista de elementos: *pendiente de que el autor la indique.*
