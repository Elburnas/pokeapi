Proyecto React – Consumo de API

Este proyecto fue creado como una introducción práctica a **React**, enfocado en aprender cómo consumir una API y mostrar información en pantalla de forma sencilla.

La aplicación obtiene datos desde una API externa y los muestra en una **tabla con paginado**, permitiendo cambiar de página y ver cómo React actualiza la información automáticamente.

El objetivo principal es entender los conceptos básicos de React sin entrar en configuraciones complejas.

¿Qué se aprende en este proyecto?

- Cómo crear una aplicación con **React y Vite**
- Cómo consumir una **API** usando `fetch`
- Uso de:
  - `useState` para manejar datos y estados
  - `useEffect` para cargar información al iniciar la aplicación
- Renderizar información en una tabla
- Manejar paginado de datos
- Despliegue del proyecto en **GitHub Pages**

Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js versión 18
- npm (incluido con Node.js) 

Descargar o clonar el repositorio

Puedes obtener el proyecto de dos formas:

Opción 1: Clonar el repositorio
```bash
-git clone https://github.com/elburnas/pokeapi.git
Opción 2: Usar pull
-git pull origin main (En caso de ya tener el repositorio clonado).
-Paso seguido, acceder a la carpeta del proyecto "cd nombre-del-proyecto"
-Instalación de dependencias con (npm install)
-Ejecutar el proyecto de manera local, con la siguiente linea de comando npm run dev
-Construcción del proyecto con el comando npm run build
-Y por ultimo despliegue en github pages. npm run deploy


Notas.
-- Si utilizas versiones muy recientes de Vite o Node, podrías tener problemas al ejecutar el proyecto.
-- En este momento esta aplicación esta corriendo en el siguiente enlace. https://elburnas.github.io/pokeapi/
