# Formik + Panda CSS — Ni reinventar la rueda ni importarla ya hecha

Proyecto chico y didáctico para demostrar un patrón puntual: un **input
nativo del navegador** (radio, checkbox) puede cambiar completamente de
apariencia — sin perder nada de su comportamiento nativo (foco, teclado,
semántica para lectores de pantalla) — usando **Panda CSS** para dibujar
encima exactamente la UI que hace falta. No hace falta una librería de
componentes pre-armados que solo deja personalizar hasta donde ella decidió
permitirlo, ni reconstruir ese comportamiento desde cero con `div`s y
atributos ARIA a mano.

**La tesis específica que este proyecto demuestra:** el input real sigue
ahí, sigue siendo funcionalmente el mismo elemento — solo que nadie lo
reconocería a simple vista. No es un componente nuevo con estilo de input;
es el input de siempre, redisfrazado por completo.

## Por qué no usamos una librería de UI

El navegador ya resuelve buena parte del trabajo de un componente
interactivo: navegación con teclado, foco, el modelo de datos (`FormData`), y
el anuncio correcto para lectores de pantalla. Cuando envolvés un `<input type="radio">`
real en tu propio `<label>` estilizado, no estás mintiéndole al DOM sobre qué
es ese elemento — sigue siendo, semánticamente, lo que dice ser. Solo le
cambiás la piel.

Eso es distinto del clásico "checkbox hack": ahí el input representaba algo
que no tenía relación real con su significado (un checkbox fingiendo ser el
botón de un menú). Acá el input siempre representa exactamente lo que el
usuario está eligiendo — el patrón es legítimo, no un parche.

**Regla que seguimos en todo el proyecto:** los inputs nativos de formulario
se usan solo para representar *datos* reales del usuario. El estado de
interfaz (¿está abierto un menú? ¿está en modo edición?) se maneja con
`useState`, nunca con un input disfrazado — este proyecto no mezcla las dos
cosas en ningún componente.

## Casos

### Caso 1 — Segmented Control (`SegmentedControl`)
Un **segmented control** de N opciones (por ejemplo `free | pro |
enterprise`) — no un radio group con aspecto default, sino un radio group
*renderizado* como pestañas. Cada `<input type="radio">` sigue existiendo en
el DOM, oculto visualmente (`srOnly`) pero completamente funcional: recibe
foco con Tab, se activa con teclado, y un lector de pantalla lo sigue
anunciando como lo que es. El único trabajo de Panda es dibujar el `<label>`
que lo envuelve con el aspecto de pestaña — el `recipe` (`cva`) define las
variantes visuales según cuál opción está seleccionada.

Inspirado en el componente **Segmented Control** de
[Zag.js](https://zagjs.com/components/react/segmented-control). Segmented Control construye su UI sobre
`@zag-js/radio-group`, con un `<input type="radio">` oculto por cada opción
(`getItemHiddenInputProps`) — el mismo patrón que usamos acá.

El componente es genérico: recibe `name` y `options` como props, tipadas con
un genérico (`<T extends string>`), así que sirve para cualquier conjunto de
opciones, no solo para un selector de plan.

> Otros casos (Editable, Password Strength Meter) se evaluaron y se
> descartaron del alcance: aunque usaban Formik + Panda, no demostraban esta
> tesis puntual — el input de esos casos no cambiaba de apariencia, solo
> convivía al lado de otros elementos.

## Stack

- [Vite](https://vitejs.dev) + React + TypeScript
- [Formik](https://formik.org) — estado y validación de formularios
- [Panda CSS](https://panda-css.com) — generación de CSS estático en build
  time, sin runtime de estilos

## Desarrollo

```bash
pnpm install
pnpm dev
```