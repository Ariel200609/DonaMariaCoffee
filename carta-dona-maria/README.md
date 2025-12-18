# Carta Doña Maria

Breve proyecto frontend para mostrar la carta de Doña Maria Coffee.

**Descripción:**
- **Proyecto:** Interfaz web (SPA) que carga una hoja de cálculo pública (CSV) y muestra la carta agrupada por categorías.
- **Lenguaje / Framework:** React + TypeScript, creado con Vite.
- **Estilos:** Tailwind CSS con una paleta de colores personalizada.

**Estructura principal:**
- `carta-dona-maria/`: app React creada con Vite.
- `carta-dona-maria/src`: código fuente (componentes, `App.tsx`, `main.tsx`, `index.css`).
- `carta-dona-maria/public` o `src/assets`: imágenes y recursos (logo, granos de café, etc.).

**Stack / dependencias clave:**
- `react`, `react-dom` — UI.
- `vite` — bundler / dev server.
- `typescript` — tipado estático.
- `tailwindcss`, `postcss`, `autoprefixer` — estilos.
- `papaparse` — parseo CSV desde Google Sheets publicado.
- `lucide-react` — iconos.

**Archivos importantes:**
- `index.html` — carga la app y las fuentes (Google Fonts).
- `src/App.tsx` — lógica principal: carga CSV, agrupa por `categoria` y renderiza la carta.
- `tailwind.config.js` — configuración de las fuentes y la paleta de marca (`brand` colors).
- `package.json` — scripts y dependencias.

Cómo ejecutar (desde `carta-dona-maria`):

```bash
# instalar dependencias
npm install

# servidor de desarrollo (hot reload)
npm run dev

# build de producción
npm run build

# vista previa del build
npm run preview
```

Configuración importante:
- En `src/App.tsx` hay una constante `SHEET_URL` que debe apuntar al CSV público de Google Sheets:

```ts
const SHEET_URL = 'TU_LINK_CSV_PÚBLICO';
```

- Asegúrate de que las imágenes referenciadas existan en `src/assets` o en `public` y que las rutas en `App.tsx` sean correctas.

Notas de diseño y despliegue:
- Tailwind ya está integrado; los estilos personalizados y fuentes se cargan desde `tailwind.config.js` e `index.html`.
- El proyecto usa módulos ES (Vite), por lo que se recomienda desplegar en servicios compatibles con SPA (Netlify, Vercel, Surge, GitHub Pages con configuración, etc.).

Posibles siguientes pasos:
- Extraer la URL del CSV a una variable de entorno para no editar código al cambiar la hoja.
- Añadir tests simples y CI (lint + build) antes del deploy.
- Soportar imágenes por producto vía campo `imagen_url` en la hoja de cálculo.

Contacto
- Autor: Doña Maria Coffee (repositorio local)

---
Este README fue generado automáticamente a partir del análisis del código existente en `carta-dona-maria`.
