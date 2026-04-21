# Global Conflict Monitor - Frontend

## URLs Públicas
- **Frontend**: https://conflict-front-end-jose-ribelles.vercel.app
- **Backend**: https://joseribelles-backend.onrender.com

## Arquitectura

### Frontend (Vue 3 + Vite)
- **Framework**: Vue 3 + Vite
- **State Management**: Pinia
- **Routing**: Vue Router
- **HTTP Client**: Fetch API

### Backend (Spring Boot)
- **Framework**: Spring Boot
- **Database**: PostgreSQL (Render)
- **API**: REST con endpoints `/api/v1/...`

## Configuración de Variables de Entorno

### Local (.env.local)
VITE_API_URL=http://localhost:8080/api/v1


### Vercel (Environment Variables)
VITE_API_URL=https://joseribelles-backend.onrender.com/api/v1

## Modificaciones Realizadas

### Frontend (Vue)
1. **Problema**: API hardcodeada como `/api/v1` (solo funcionaba con proxy local)
   - **Solución**: Cambiar a variable de entorno `VITE_API_URL`
   - **Archivo**: `src/stores/conflict.js` (línea 4)
   - **Cambio**:
   ```javascript
   // Antes:
   const API_URL = "/api/v1";
   
   // Después:
   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";
Problema: Errores 404 al refrescar rutas internas

Solución: Crear vercel.json para SPA routing
Archivo: vercel.json (nuevo)
Contenido:
JSON
{
  "rewrites": [
{
"source": "/(.*)",
"destination": "/"
}
]
}
Problema: Proxy solo funcionaba en desarrollo

Solución: Remover proxy de vite.config.js
Archivo: vite.config.js
Cambio:
JavaScript
// Antes:
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})

// Después:
export default defineConfig({
  plugins: [vue()]
})
Backend (Spring Boot)
Problema: CORS bloqueaba peticiones desde Vercel
Solución: Configurar CORS en application.yml
Archivo: src/main/resources/application.yml
Cambio:
YAML
spring:
  web:
    cors:
      allowed-origins: "https://conflict-front-end-jose-ribelles.vercel.app"
      allowed-methods: GET,POST,PUT,DELETE,OPTIONS
      allowed-headers: "*"
      allow-credentials: true


# Cómo Deployar
Frontend (Vercel)
Push a GitHub
Vercel se redeploya automáticamente
La variable VITE_API_URL se usa en build time
Backend (Render)
Push a GitHub
Render se redeploya automáticamente
Las env vars se pasan desde el dashboard de Render

