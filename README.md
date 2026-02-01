# Football Analytics

Plataforma profesional de analisis de futbol para apuestas deportivas. Obtiene estadisticas detalladas, metricas avanzadas y predicciones basadas en datos reales.

## Caracteristicas

- **Busqueda de Equipos** - Busca cualquier equipo de las principales ligas del mundo
- **Estadisticas en Vivo** - Datos actualizados de partidos y rendimiento
- **Metricas de Apuestas** - Analisis detallado para Over/Under, BTTS, Tarjetas y Corners
- **Analisis xG** - Datos de Expected Goals para evaluar rendimiento real vs esperado
- **Equipos Favoritos** - Guarda tus equipos favoritos para acceso rapido
- **Historial de Busquedas** - Accede rapidamente a tus busquedas recientes
- **Modo Oscuro/Claro** - Interfaz adaptable a tus preferencias

## Metricas Disponibles

| Categoria | Metricas |
|-----------|----------|
| Goles | Over 0.5, 1.5, 2.5, 3.5 / BTTS / Clean Sheets |
| Tarjetas | Promedio amarillas/rojas / Over 1.5, 2.5, 3.5, 4.5 |
| Corners | Promedio total/favor/contra / Over 7.5, 8.5, 9.5, 10.5 |
| xG | xG promedio / xGA / Diferencia / Sobre-rendimiento |

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4, Radix UI
- **Estado:** Zustand
- **Data Fetching:** TanStack Query
- **Animaciones:** Framer Motion
- **API:** API-Football (api-sports.io)

## Requisitos Previos

- Node.js 18+
- API Key de [API-Football](https://www.api-football.com/)

## Instalacion

1. Clona el repositorio:

```bash
git clone https://github.com/anthoniriv/football-analytics.git
cd football-analytics
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura las variables de entorno:

```bash
cp .env.example .env.local
```

Edita `.env.local` y agrega tu API key:

```env
API_FOOTBALL_KEY=tu_api_key_aqui
```

4. Inicia el servidor de desarrollo:

```bash
npm run dev
```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts Disponibles

| Comando | Descripcion |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la build de produccion |
| `npm run start` | Inicia el servidor de produccion |
| `npm run lint` | Ejecuta el linter |

## Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── api/               # API Routes
│   │   └── football/      # Endpoints de la API
│   ├── favorites/         # Pagina de favoritos
│   ├── team/[id]/         # Pagina de detalle del equipo
│   └── page.tsx           # Pagina principal
├── components/
│   ├── common/            # Componentes reutilizables
│   ├── layout/            # Header, navegacion
│   ├── metrics/           # Tarjetas de metricas
│   ├── search/            # Barra de busqueda
│   ├── team/              # Componentes del equipo
│   └── ui/                # Componentes base (shadcn/ui)
├── hooks/                 # Custom hooks
├── lib/                   # Utilidades y API client
├── stores/                # Estado global (Zustand)
└── types/                 # Tipos de TypeScript
```

## API

La aplicacion consume datos de [API-Football](https://www.api-football.com/) que incluye:

- Informacion de equipos y estadios
- Partidos y resultados
- Estadisticas detalladas por partido
- Datos de jugadores

> **Nota:** La API tiene limites de requests dependiendo del plan. Revisa la [documentacion oficial](https://www.api-football.com/documentation-v3) para mas detalles.

## Capturas de Pantalla

### Pagina Principal
Busqueda de equipos con sugerencias en tiempo real, equipos favoritos y busquedas recientes.

### Panel del Equipo
Estadisticas completas del equipo incluyendo:
- Informacion del equipo y estadio
- Partidos recientes organizados por liga
- Metricas de apuestas con niveles de confianza
- Plantilla de jugadores con estadisticas

## Deploy

La forma mas sencilla de desplegar es usando [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/anthoniriv/football-analytics)

No olvides configurar la variable de entorno `API_FOOTBALL_KEY` en tu proyecto de Vercel.

## Licencia

MIT

---

Desarrollado con Next.js y API-Football
