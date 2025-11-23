# 🎵 Backend Proxy - Guía de Despliegue

## 📦 Ya instalado localmente

El backend ya está corriendo en `http://localhost:3000`

## 🌐 Desplegar en Vercel (GRATIS)

### Opción 1: Con CLI

```powershell
# 1. Instalar Vercel CLI globalmente
npm install -g vercel

# 2. Ir a la carpeta api
cd api

# 3. Desplegar
vercel

# 4. Seguir instrucciones:
#    - Link to existing project? → No
#    - Project name? → radios-peru-api
#    - Directory? → ./
#    - Override settings? → No
```

### Opción 2: Con GitHub (Recomendado)

1. **Sube el proyecto a GitHub** (ya lo tienes)

2. **Ve a [vercel.com](https://vercel.com)**
   - Login con GitHub

3. **Import Project**
   - Selecciona: `Radios-del-Per-`
   - Root Directory: `api`
   - Framework Preset: Other

4. **Deploy**
   - Espera ~1 minuto
   - Obtendrás una URL: `https://radios-peru-api-xxx.vercel.app`

5. **Actualiza app.js**
   ```javascript
   // Línea 22
   const METADATA_API_URL = 'https://TU-URL-AQUI.vercel.app';
   ```

## ✅ Verificar que funciona

Abre en el navegador:
```
https://TU-URL.vercel.app/metadata?url=https://stream.zeno.fm/sed22b6595quv
```

Deberías ver JSON con metadatos.

## 🔄 Después de desplegar

1. Cambia la URL en `app.js` línea 22
2. Sube cambios a GitHub
3. ¡Listo! Los metadatos funcionarán automáticamente

## 🐛 Troubleshooting

- **404 Error**: Verifica que Root Directory sea `api`
- **Sin metadatos**: Algunos streams no los proporcionan
- **CORS error**: El backend ya tiene CORS habilitado
