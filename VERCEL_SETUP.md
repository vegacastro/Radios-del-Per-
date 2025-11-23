# 📻 Radios del Perú - Integración con Vercel

## 🚀 Configuración del Proxy de Metadata

Tu proyecto ahora incluye una función serverless en Vercel para recuperar metadata de streams de radio sin problemas de CORS.

### 📁 Archivos Creados

1. **`vercel.json`** - Configuración de Vercel con rutas y CORS
2. **`api/metadata.js`** - Función serverless para proxy de metadata
3. **`api/package.json`** - Dependencias de la API
4. **`.gitignore`** - Archivos a ignorar en Git
5. **`.env.example`** - Ejemplo de variables de entorno

### 🔧 Cómo Funciona

```javascript
// El frontend llama al proxy en lugar del stream directo
fetch('/api/metadata?url=' + encodeURIComponent(streamUrl))
  .then(res => res.json())
  .then(metadata => {
    console.log(metadata.station.name);    // Nombre de la estación
    console.log(metadata.station.genre);   // Género musical
    console.log(metadata.station.bitrate); // Bitrate del stream
  });
```

### 📦 Instalación de Dependencias

Antes de desplegar, instala las dependencias de la API:

```bash
cd api
npm install
```

### 🌐 Despliegue en Vercel

1. **Instalar Vercel CLI** (si no lo tienes):
```bash
npm install -g vercel
```

2. **Iniciar sesión**:
```bash
vercel login
```

3. **Desplegar el proyecto**:
```bash
vercel
```

4. **Para producción**:
```bash
vercel --prod
```

### 🧪 Probar Localmente

1. **Instalar dependencias**:
```bash
cd api
npm install
cd ..
```

2. **Ejecutar con Vercel Dev**:
```bash
vercel dev
```

3. **Abrir en el navegador**:
```
http://localhost:3000
```

### 🔍 Endpoint de la API

**URL**: `/api/metadata`

**Método**: `GET`

**Parámetros**:
- `url` (required): URL del stream de radio

**Ejemplo**:
```
/api/metadata?url=https://stream.ejemplo.com/radio
```

**Respuesta exitosa** (200):
```json
{
  "success": true,
  "station": {
    "name": "Radio Ejemplo FM",
    "description": "La mejor música",
    "genre": "Pop, Rock",
    "bitrate": "128",
    "url": "https://radioejemplo.com",
    "isPublic": true,
    "hasMetadata": true
  },
  "stream": {
    "url": "https://stream.ejemplo.com/radio",
    "contentType": "audio/mpeg",
    "status": 200
  },
  "timestamp": "2025-11-23T10:30:00.000Z"
}
```

**Respuesta de error** (400/500):
```json
{
  "success": false,
  "error": "Error al obtener metadata",
  "message": "Detalles del error",
  "url": "https://stream.ejemplo.com/radio",
  "timestamp": "2025-11-23T10:30:00.000Z"
}
```

### ✨ Características

- ✅ **Resuelve problemas de CORS**: El proxy hace las peticiones desde el servidor
- ✅ **Metadata ICY**: Extrae información de streams Icecast/SHOUTcast
- ✅ **Manejo de errores**: Timeout, conexiones fallidas, URLs inválidas
- ✅ **CORS habilitado**: Headers configurados correctamente
- ✅ **Logs detallados**: Para debugging en producción
- ✅ **Timeout configurado**: 10 segundos máximo por petición

### 🎯 Integración en el Frontend

El archivo `app.js` ya está actualizado con la función `fetchStreamMetadataViaProxy()` que:

1. Llama al endpoint `/api/metadata`
2. Recibe la metadata del stream
3. Actualiza la UI con la información (nombre, género, bitrate)
4. Muestra la información en el elemento `#nowPlaying`

### 🐛 Debugging

**Ver logs en Vercel**:
```bash
vercel logs
```

**Ver logs en tiempo real**:
```bash
vercel logs --follow
```

**Probar el endpoint directamente**:
```bash
curl "https://tu-app.vercel.app/api/metadata?url=https://stream.ejemplo.com/radio"
```

### 📝 Notas Importantes

1. **No todos los streams tienen metadata ICY**: Algunos servidores no envían headers ICY
2. **Timeout**: Las peticiones tienen un timeout de 10 segundos
3. **CORS**: Todos los origins están permitidos (`*`), puedes restringirlo en producción
4. **Rate limiting**: Considera implementar rate limiting si tienes muchos usuarios

### 🔐 Seguridad (Opcional)

Para restringir el acceso solo a tu dominio, modifica `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { 
          "key": "Access-Control-Allow-Origin", 
          "value": "https://tu-dominio.com" 
        }
      ]
    }
  ]
}
```

### 📚 Recursos

- [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
- [ICY Metadata Protocol](https://cast.readme.io/docs/icy)
- [Node-Fetch Documentation](https://www.npmjs.com/package/node-fetch)

---

**¡Listo!** Tu PWA ahora puede recuperar metadata de streams de radio sin problemas de CORS. 🎉
