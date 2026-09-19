# Formik + Panda CSS — Ni reinventar la rueda ni importarla ya hecha

Proyecto chico y didáctico para demostrar un patrón puntual: un **input
nativo del navegador** (radio, checkbox, range) puede cambiar completamente
de apariencia — sin perder nada de su comportamiento nativo (foco, teclado,
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

## Por qué Panda CSS

Más allá de la estética, elegimos Panda por cinco ventajas concretas que se
confirmaron construyendo este mismo proyecto, no solo en la teoría:

1. **Aislamiento.** El diseño (`cva`, tokens) vive en un bloque separado del
   comportamiento (Formik, JSX) dentro de cada archivo. Corregir un color no
   requiere leer ni tocar la lógica del componente.
2. **Validación en tiempo de compilación (`strictTokens`).** Un valor que no
   existe en el sistema de diseño (`button.bg`, un `margin: 0` mal tipado) no
   compila — se corrige en el editor, no mirando la pantalla después. Varios
   bugs reales de este proyecto se atraparon así.
3. **Accesibilidad heredada, no escrita a mano.** Como el motor de cada
   componente sigue siendo un input nativo, el foco, la navegación por
   teclado y el anuncio para lectores de pantalla vienen gratis del
   navegador — Panda solo se encarga de que ese foco también se *vea* cuando
   el input está oculto (`_focusVisibleWithin`).
4. **Trazabilidad de las excepciones.** Cuando un valor genuinamente no tiene
   token (`'[50%]'`, `'[fit-content]'`), la sintaxis de corchetes lo marca de
   forma visible y buscable — a diferencia de un valor arbitrario en
   Tailwind, indistinguible del resto del código.
5. **Autocompletado real.** Ctrl+Espacio muestra las variantes válidas de un
   `cva` o los tokens disponibles en el momento de escribir, sin memorizar
   nombres ni ir a la documentación.

## Casos

### Segmented Control (`SegmentedControl`)
Un **segmented control** de N opciones (por ejemplo `free | pro |
enterprise`) — no un radio group con aspecto default, sino un radio group
*renderizado* como pestañas. Cada `<input type="radio">` sigue existiendo en
el DOM, oculto visualmente (`srOnly`) pero completamente funcional: el grupo
recibe foco con `Tab`, se navega y activa con las flechas del teclado, y un
lector de pantalla lo sigue anunciando como lo que es. El `recipe` (`cva`)
define las variantes visuales según cuál opción está seleccionada.

Inspirado en el componente Segmented Control de Zag.js. Zag construye este
componente sobre un radio group real, con un input nativo oculto por cada
opción — el mismo patrón que usamos acá.

Genérico: recibe `name` y `options` como props, tipadas con un genérico
(`<T extends string>`), así que sirve para cualquier conjunto de opciones.

### Estrellas de calificación (`StarRating`)
Un radio group de 5 opciones, renderizado como estrellas. El estado
"cuántas estrellas se ven llenas" se calcula en JS (`Number(field.value) >=
value`) y se pasa como variante al `cva` — el mismo mecanismo que Segmented
Control, aplicado a una escala en vez de a opciones nombradas.

### Chips de filtro (`FilterChips`)
Checkboxes de multi-selección, renderizados como chips. Usa `<Field
type="checkbox" value={option}>` de Formik, que resuelve automáticamente
`field.checked` comparando contra el array de valores seleccionados — sin
lógica manual de agregar/quitar del array.

Genérico, igual que Segmented Control: recibe `options` desde afuera.

### Barra de relleno (`RangeFill`)
Un `<input type="range">` real, invisible (`opacity: 0`, no `srOnly`, para
seguir recibiendo clicks y arrastre en su posición), con una barra de
progreso y un thumb dibujados encima que reaccionan al valor. El arrastre
horizontal, las flechas de teclado y el foco siguen siendo los del input
nativo — solo cambia por completo su apariencia.

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