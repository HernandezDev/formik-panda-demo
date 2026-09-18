# Formik + Panda CSS — Ni reinventar la rueda ni importarla ya hecha

Proyecto chico y didáctico para explorar un patrón: usar los **inputs nativos
del navegador** (radio, checkbox, text) como motor de estado y accesibilidad,
y **Panda CSS** para dibujar encima exactamente la UI que hace falta — sin
depender de una librería de componentes pre-armados que solo te deja
personalizar hasta donde ella decidió permitirlo.

## Por qué no usamos una librería de UI

El navegador ya resuelve el 80% del trabajo de un componente interactivo:
navegación con teclado, foco, el modelo de datos (`FormData`), y el anuncio
correcto para lectores de pantalla. Cuando envolvés un `<input type="radio">`
real en tu propio `<label>` estilizado, no estás mintiéndole al DOM sobre qué
es ese elemento — sigue siendo, semánticamente, lo que dice ser. Solo le
cambiás la piel.

Eso es distinto del clásico "checkbox hack": ahí el input representaba algo
que no tenía relación real con su significado (un checkbox fingiendo ser el
botón de un menú). Acá el input siempre representa exactamente lo que el
usuario está eligiendo — el patrón es legítimo, no un parche.

**Regla que seguimos en todo el proyecto:** los inputs nativos de formulario
se usan solo para representar *datos* reales del usuario. El estado de
interfaz (¿está en modo edición? ¿está abierto un menú?) se maneja con
`useState`, nunca con un input disfrazado.

## Los tres casos

Cada uno muestra un ángulo distinto del mismo patrón, y cada `recipe` de
Panda tiene variantes visuales reales para justificar su existencia — no son
cajas de texto planas.

### 1. Segmented Control (`SegmentedControl`)
Un **segmented control** de 3 opciones (`free | pro | enterprise`) — no un
radio group con aspecto default, sino un radio group *renderizado* como
pestañas. El caso más simple: un solo valor, dentro de un conjunto cerrado
de opciones nombradas.

Inspirado en el componente **Segmented Control** de
[Zag.js](https://zagjs.com/components/react/segmented-control) — no en su
componente `Tabs` (ese usa `<button>` + atributos ARIA manuales, sin input
nativo por debajo). Segmented Control construye su UI sobre
`@zag-js/radio-group`, con un `<input type="radio">` oculto por cada opción
(`getItemHiddenInputProps`) — el mismo patrón que usamos acá.

### 2. Editable (`Editable`)
Inspirado en el componente homónimo de [Zag.js](https://zagjs.com). Mezcla,
en un mismo componente, las dos reglas del proyecto:
- `editing` (¿se está editando?) → estado de UI → `useState`.
- El valor confirmado → dato real de formulario → Formik.

Incluye un botón "Guardar" con una variante `dirty` (activo solo si el
borrador difiere del valor guardado).

### 3. Password Strength Meter (`PasswordStrength`)
Validación **escrita a mano**, sin Yup ni Zod ni Valibot — a propósito: un
schema declarativo esconde cómo se arma la regla; escribirla a mano expone
la lógica para quien está aprendiendo el patrón. El resultado alimenta una
barra de fortaleza con variantes `weak | medium | strong`.

## Stack

- [Vite](https://vitejs.dev) + React + TypeScript
- [Formik](https://formik.org) — estado y validación de formularios
- [Panda CSS](https://panda-css.com) — generación de CSS estático en build
  time, sin runtime de estilos

## Desarrollo

\`\`\`bash
pnpm install
pnpm dev
\`\`\`