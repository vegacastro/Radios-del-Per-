# 🎵 Sistema de Metadatos Implementado

## ✅ ¿Qué se implementó?

**Backend Proxy (Node.js + Express)**
- 📡 API que obtiene metadatos ICY de streams de radio
- 🔓 Sin restricciones CORS
- ⏱️ Polling automático cada 10 segundos
- 🎯 Compatible con Icecast/SHOUTcast

**PWA Actualizada**
- 🎵 Muestra "Ahora suena: Artista - Canción"
- 📱 Actualiza pantalla de bloqueo con canción actual
- 🔄 Actualización automática mientras reproduce
- 💾 Fallback a info de radio si no hay metadatos

## 🚀 Cómo funciona ahora

### **Localmente (Ya funcionando)**
El backend está en: `http://localhost:3000`

### **Para producción (siguiente paso)**

1. **Desplegar backend en Vercel** (GRATIS)
2. **Actualizar URL** en `app.js` línea 22
3. **Subir cambios** a GitHub

## 📋 Pasos para desplegar

### **Opción más fácil: Vercel con GitHub**

1. Ve a **[vercel.com](https://vercel.com)** → Login con GitHub

2. **New Project** → Import `Radios-del-Per-`

3. Configurar:
   ```
   Root Directory: api
   Framework: Other
   Build Command: (vacío)
   Output Directory: (vacío)
   ```

4. **Deploy** → Esperar 1 minuto

5. Copiar tu URL (ej: `https://radios-peru-api.vercel.app`)

6. Editar `app.js` línea 22:
   ```javascript
   const METADATA_API_URL = 'https://TU-URL.vercel.app';
   ```

7. Subir cambios:
   ```powershell
   git add app.js
   git commit -m "Update: API URL de producción"
   git push origin main
   ```

## 🎯 Resultado Final

Cuando esté desplegado:
- ✅ Mostrará: "🎵 Coldplay - Yellow" (si está disponible)
- ✅ Pantalla de bloqueo se actualizará con la canción
- ✅ Funciona en todos los dispositivos
- ✅ Sin costo adicional

## ⚠️ Importante

- **No todos los streams tienen metadatos** ICY
- Si no los tiene, mostrará solo el nombre de la radio (como antes)
- El backend detecta automáticamente si están disponibles

## 📝 Archivos creados

```
api/
├── server.js          ← Servidor backend
├── package.json       ← Dependencias
├── vercel.json        ← Config de Vercel
├── README.md          ← Documentación API
└── .gitignore

app.js                 ← Actualizado con metadatos
DEPLOY-BACKEND.md      ← Guía detallada
METADATA-INFO.md       ← Este archivo
```

## 🧪 Probar localmente

Abre: http://localhost:3000/metadata?url=https://stream.zeno.fm/sed22b6595quv

Deberías ver JSON con metadatos si la radio los proporciona.
