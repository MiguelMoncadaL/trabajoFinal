# Futbol Dashboard

Página web para mostrar información de jugadores de futbol.

## Descripción

Esta es una página que muestra información de algunos jugadores de fútbol, la página cuenta con buscador, opción de poner modo oscuro y modo claro a preferencia del usuario, sistema para agregar jugador favorito, opción de eliminar jugador favorito y mostrar jugadores favoritos en una lista, ordenar la lista por orden ascendente o descendente de goles, asistencias, edad o rating. También se puede organizar alfabéticamente según el nombre
de los jugadores o nombre del equipo.

## Instalación

En GitBash usé:
- npm install
- npm run dev

## Hooks utilizados y su propósito

- useState: Usado para guardar información que puede cambiar, lo usé principalmente para guardar el término de búsqueda, si el modo oscuro está activo o no, cuáles jugadores están en favoritos, etc.
- useEffect: Lo usé más que nada para el tema de la búsqueda, espera una pequeña cantidad de tiempo antes de filtrar resultados, además lo uso cuando el usuario pone modo claro/oscuro y para resetear la página cuando cambia el filtro
- useMemo: Lo usé para calcular los jugadores filtrados y ordenados, y las estadísticas del panel.

## Estructura del proyecto

- src/
  - components/
    - SearchBar.jsx
    - PlayerTable.jsx
    - PlayerRow.jsx
    - Pagination.jsx
    - StatsPanel.jsx
    - Modal.jsx
    - ThemeToggle.jsx
  - data/
    - players.js
  - App.jsx
  - App.css

## Autor

- Miguel Angel Moncada Lopez

## Deploy

https://proyectofinalpg4.netlify.app

## Tecnologías utilizadas

- React 
- JavaScript
- HTML 
- CSS
- Git
- Netlify

## IA Utilizada

- Principalmente Claude, de Anthropic.
- También usé superficialmente ChatGPT de OpenAI, más que nada para dudas pequeñas sobre conceptos.