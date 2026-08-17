# English Classroom Hub

Prompt: Plataforma "English Classroom" (estilo Phidias) con acceso por rol

Actúa como desarrollador frontend senior especializado en plataformas de gestión académica. Constrúyeme un sitio web estático (HTML + CSS + JS, sin backend) para un curso de inglés, inspirado visualmente en Phidias Académico (plataforma de gestión escolar colombiana): diseño corporativo, limpio, en tonos azul/marino, con sidebar de navegación, tarjetas de resumen tipo dashboard y "boletines" de notas oficiales.

1. Fuente de datos

Usa como base real el cronograma del segundo semestre 2026 (agosto–diciembre), tomado de un Excel con dos tablas:

Programación de clases: columnas Tipo (Normal / Reposición / Clase Adicional / Cambio de Día / Primera Sesión), Fecha, Hora, Tema/Unidad.

Eventos importantes: columnas Fecha, Descripción (control de lectura, exámenes, recomendaciones de notas, último día para mejorar notas), Fecha Límite.

Agrupa las sesiones en unidades temáticas (ej.: Python, Letter, Web Pages & AI, Minecraft, Proyecto Final) aunque una unidad se extienda por más de un mes.

2. Control de acceso por rol

Pantalla de login con usuario y contraseña (autenticación simulada en el navegador, ya que es un sitio estático — sin base de datos real).

Rol Estudiante: ve el cronograma, las fechas importantes y sus notas (solo lectura).

Rol Profesor: además de lo anterior, tiene un panel para editar/registrar notas por actividad y clase.

Mientras una nota no haya sido registrada, mostrar siempre "N.A." (nunca 0 ni vacío).

3. Estructura de contenido

Login (usuario + contraseña, mensaje de error si son incorrectos).

Dashboard: promedio general, próxima clase, próxima fecha límite, unidades aprobadas.

Cronograma: pestañas por mes (agosto–diciembre) con cada sesión (tipo, fecha, hora, tema), incluyendo eventos especiales no lectivos (curso gratuito, semana de receso).

Fechas importantes / Eventos: línea de tiempo con descripción, fecha y fecha límite, con indicador de días restantes.

Notas por tema: acordeón de unidades — al hacer clic en una unidad se despliegan sus clases, y dentro de cada clase, sus actividades con la nota (o "N.A."). Mostrar el promedio de cada clase, de cada unidad y el promedio general, con un sello "Aprobado/Reprobado" (umbral configurable, por defecto 3.0/5.0). El promedio debe ignorar las notas "N.A." al calcularse.

Panel docente (solo rol profesor): tabla editable para ingresar notas por actividad y clase, con botón guardar. Como no hay backend, incluir exportar/importar notas en JSON para poder conservar los cambios entre sesiones.

4. Estilo visual

Paleta corporativa azul marino / blanco, con un acento cálido dorado usado con moderación (para sellos y estados destacados) — evita el look genérico de fondo crema + acento terracota.

Tipografía: una fuente display geométrica para títulos, una fuente de texto neutra para cuerpo, y una fuente monoespaciada para las notas numéricas (que se sientan como datos oficiales de un boletín).

Sidebar de navegación + topbar con el nombre y rol del usuario activo.

Responsive, con foco de teclado visible y prefers-reduced-motion respetado.

5. Entregables

Tres archivos: index.html, style.css, script.js, autocontenidos y sin dependencias de backend, listos para desplegar en cualquier hosting estático (GitHub Pages, Netlify, etc.).


Cosas adicionales:
Me gustaría saber si desde la página puedo modificar las notas y actividades. Otra cosa, NO mostrar acceso de demostración para Estudiante y Profesores. Sino que haya una opción de Cerrar Sesión, y Login. Necesito que primero aparezca el login, y después la pantalla principal. No mostrar el login y uno hace scroll y ya está la pantalla principal (Necesito que eso no pase). Y hay alguno opción de que cuando ya uno inició sesión, no tengo que volver a inciar?
1.Son dos estudiantes: Andy y Tommy
2.La nota es de 1 a 5 en decimal
3.Poder agregar y modificar el nombre de las actividades + las notas. Porque NO siempre van a ser Vocabulary, Speaking, Listening y Writing, si?
4.La idea es que ellos realizen las actividades desde Google Classroom, entonces que yo mismo pueda hacer una configuración en la página poninedo el link de Google Classroom para que cuando le den click se les las actividad donde van a hacer habra Classroom.
5.Si se puede exportar las notas, que no sea en .json, sino en PDF, en excel o ambos.
6.Necesito saber si se puede que los estudiantes le den click al link y ingresen a la reunión de Google Meet: https://meet.google.com/fhu-ffxo-egr?
7.Saber si se puede chatear como tipo hablar por chat, dar información general (tipo avisos parroquiales), y saber si se puede poner en la parte de "Curso Gratuito de Excel Daxus" poner: Para más información registrar el nombre y correo en: https://lp.hashtagcapacitaciones.com/excel/semana/inscripcion?fonte=pmax-col&conversion=lcto-lexcap-co&utm_source=google-ads&origemurl=&origemads=&utm_campaign=24111917444&utm_medium=&utm_content=&utm_term=&gad_source=2&gad_campaignid=24106354272&gbraid=0AAAAA-IFriA0GM0dCbwJDmykxFX_QXHjp&wbraid=CmgKCAjwv4XUBhAvElgA1sSoWDsizQZ6Gngj9Ko8RYmsl-JRwId1z0kBRawKbefaXr4qLsqC_J2W0zx6YuujnnFhyQZhFZt1Tth02ePVBgkFXL2BA3gn3NX4gPAwaGZVFCnermQfGgKVDg&curso=excel

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://academy-sidekick.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/93f0338a-3c0c-4dc4-8e73-c6a65139e341).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
