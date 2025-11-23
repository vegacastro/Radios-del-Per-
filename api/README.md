# Radio Metadata API

Backend proxy para obtener metadatos ICY de streams de radio sin restricciones CORS.

## 🚀 Instalación Local

```bash
cd api
npm install
npm start
```

El servidor correrá en `http://localhost:3000`

## 📡 Uso

### Obtener metadatos de un stream:
```
GET /metadata?url=https://stream.example.com/radio
```

### Respuesta exitosa:
```json
{
  "supported": true,
  "metadata": {
    "artist": "Coldplay",
    "title": "Yellow",
    "url": ""
  },
  "stream": {
    "name": "Radio Ejemplo FM",
    "genre": "Pop",
    "bitrate": "128",
    "description": "La mejor radio"
  },
  "timestamp": "2025-11-23T00:00:00.000Z"
}
```

### Si el stream no soporta metadatos:
```json
{
  "supported": false,
  "message": "Este stream no proporciona metadatos ICY",
  "headers": {
    "name": "Radio Ejemplo",
    "genre": "Pop",
    "bitrate": "128"
  }
}
```

## 🌐 Despliegue en Vercel (GRATIS)

1. Instala Vercel CLI:
```bash
npm install -g vercel
```

2. Desde la carpeta `api`:
```bash
vercel
```

3. Sigue las instrucciones (acepta defaults)

4. Tu API estará en: `https://tu-proyecto.vercel.app`

## 🔧 Variables de entorno

- `PORT`: Puerto del servidor (default: 3000)

## 📝 Notas

- Algunos streams no proporcionan metadatos ICY
- La API tiene un timeout de 10 segundos por petición
- CORS habilitado para todos los orígenes
