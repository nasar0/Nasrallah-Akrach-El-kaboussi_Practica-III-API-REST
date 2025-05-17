# Proyecto Recetas

## Descripción

Esta es una aplicación web para buscar, mostrar y gestionar recetas de comida usando la API pública [TheMealDB](https://www.themealdb.com/api.php). Permite al usuario:

- Navegar por categorías de recetas.
- Visualizar detalles de cada receta en un modal, incluyendo instrucciones e ingredientes.
- Guardar recetas favoritas en el navegador usando `localStorage`.
- Consultar y gestionar las recetas favoritas en una sección aparte.

## Tecnologías usadas

- **HTML5** para la estructura.
- **CSS3** para el diseño y estilos personalizados.
- **JavaScript (ES6)** para la lógica y manipulación dinámica.
- **Bootstrap 5** (tema Morph de Bootswatch) para estilos responsivos y componentes UI.
- **API externa**: TheMealDB para obtener datos de categorías y recetas.

## Archivos principales

- `index.html`: Página principal donde se muestran las categorías y recetas según selección.
- `favorito.html`: Página donde se muestran las recetas que el usuario ha marcado como favoritas.
- `script.js`: Script para `index.html` que carga categorías, muestra recetas y controla la selección.
- `script2.js`: Script para `favorito.html` que muestra las recetas favoritas y permite gestionarlas.
- `style.css`: Estilos personalizados para la navegación, encabezado y alertas.

## Funcionamiento

1. **Carga de categorías**: Al iniciar `index.html`, se cargan las categorías disponibles en un menú desplegable.
2. **Mostrar recetas**: Cuando el usuario selecciona una categoría, se listan las recetas correspondientes con imagen y título.
3. **Detalles y modal**: Al hacer clic en "Ver receta", se abre un modal que muestra imagen, instrucciones y lista de ingredientes con cantidades.
4. **Favoritos**: Desde el modal, el usuario puede agregar o eliminar la receta de sus favoritos. Esto se guarda en `localStorage`.
5. **Página de favoritos**: En `favorito.html` se listan las recetas guardadas, permitiendo ver detalles y eliminar recetas favoritas.
6. **Alertas**: Se muestran alertas flotantes para informar al usuario sobre la acción realizada (agregar o eliminar favoritos).

## Cómo usar

1. Abrir `index.html` en un navegador.
2. Seleccionar una categoría en el menú desplegable.
3. Explorar las recetas mostradas y hacer clic en "Ver receta" para detalles.
4. Agregar recetas a favoritos mediante el botón en el modal.
5. Navegar a `favorito.html` para revisar y gestionar tus recetas favoritas.

## Dependencias externas

- Bootstrap 5 (desde CDN, tema Morph de Bootswatch).
- API TheMealDB para obtener datos de recetas.

## Mejoras posibles

- Añadir búsqueda por nombre de receta.
- Permitir eliminar favoritos directamente desde la lista sin abrir modal.
- Mejorar diseño móvil y accesibilidad.
- Agregar soporte para múltiples usuarios o sincronización en servidor.
