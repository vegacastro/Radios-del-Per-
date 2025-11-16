# 📻 Radios del Perú - PWA

Reproductor de radio en línea progresivo (PWA) para emisoras peruanas.

## 🚀 Características

### ✨ Funcionalidad
- **Reproducción de streaming** en tiempo real
- **Sistema de favoritos** con persistencia en localStorage
- **Búsqueda** de emisoras por nombre, región o ciudad
- **Vista por regiones** agrupadas y expandibles
- **Reconexión automática** del stream en caso de pérdida de conexión
- **Reloj en tiempo real** visible cuando el reproductor está maximizado
- **Última emisora reproducida** se carga automáticamente

### 🎨 Temas
- **5 temas visuales**: Light, Dark, Blue, Green, Purple
- **Persistencia del tema** seleccionado
- **Gradientes personalizados** por tema
- **Transiciones suaves** entre cambios

### 📱 PWA (Progressive Web App)
- **Instalable** en dispositivos móviles y desktop
- **Funciona offline** gracias al Service Worker
- **Caché inteligente** de recursos estáticos
- **Manifest completo** con iconos y screenshots

### 📐 Responsive Design
- ✅ **Mobile** (< 480px)
- ✅ **Tablet** (481px - 768px)
- ✅ **Desktop** (> 769px)
- ✅ **Tipografía fluida** con clamp()

## 📂 Estructura del Proyecto

```
Prueba pagina 01/
├── index.html              # HTML principal (solo estructura)
├── app.js                  # Lógica JavaScript (separada)
├── styles.css              # Estilos CSS completos
├── sw.js                   # Service Worker para PWA
├── manifest.webmanifest    # Manifest PWA
├── icons/                  # Iconos de la aplicación
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── maskable-icon-192.png
│   └── maskable-icon-512.png
├── screenshot-normal.png   # Screenshot para PWA
└── screenshot-wide.png     # Screenshot ancho para PWA
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Variables CSS, Flexbox, Gradientes, Animaciones
- **JavaScript ES6+**: Módulos, async/await, arrow functions
- **Service Worker**: Caché y funcionamiento offline
- **LocalStorage**: Persistencia de favoritos y tema
- **Material Icons**: Iconografía
- **Google Fonts**: Open Sans

## 📊 Datos de Emisoras

Las emisoras están normalizadas con las siguientes propiedades:

```javascript
{
  id: Number,           // ID único
  nombre: String,       // Nombre de la emisora
  region: String,       // Región (normalizado para i18n)
  ciudad: String,       // Ciudad
  pais: String,         // Código del país (PE)
  src: String,          // URL del stream
  imagen: String        // URL de la imagen/logo
}
```

> **Nota**: Las propiedades están en formato normalizado (`region`, `ciudad`, `pais`) para facilitar la internacionalización futura. El código de visualización adapta estos campos según el idioma.

## 🎯 Navegación

### Menú Principal
1. **Inicio** 🏠: Muestra todas las emisoras en lista
2. **Locales** 📍: Agrupa emisoras por regiones
3. **World** 🌍: Sección para emisoras internacionales (próximamente)
4. **Favoritos** ❤️: Muestra solo las emisoras marcadas como favoritas

### Controles del Reproductor
- ⏮️ **Anterior**: Reproduce la emisora anterior en la lista
- ▶️/⏸️ **Play/Pausa**: Controla la reproducción
- ⏭️ **Siguiente**: Reproduce la siguiente emisora
- 🔉🔊 **Volumen**: Control deslizante con indicador de porcentaje

## 🔧 Service Worker

### Estrategias de Caché

**Versión actual**: `v1.0.2`

#### Recursos cacheados:
- HTML principal
- CSS y JavaScript
- Manifest PWA
- Iconos de la aplicación
- Fuentes de Google (Open Sans, Material Icons)

#### Estrategias:
- **HTML**: Network-first (prioriza red, fallback a caché)
- **Assets estáticos**: Stale-while-revalidate (sirve caché, actualiza en background)
- **Recursos externos**: No se cachean (streams de radio)

### Actualización

El Service Worker se actualiza automáticamente cuando se detecta una nueva versión. Los recursos antiguos se eliminan del caché.

## 💾 Persistencia de Datos

### LocalStorage
- `radioFavorites`: Array de IDs de emisoras favoritas
- `lastPlayedStation`: Objeto con la última emisora reproducida
- `theme`: Tema visual seleccionado

## 🎨 Sistema de Temas

### Temas Disponibles

| Tema | Color Principal | Descripción |
|------|----------------|-------------|
| **Light** | #F33449 | Tema claro por defecto |
| **Dark** | #1a1a2e | Tema oscuro elegante |
| **Blue** | #0066CC | Azul profesional |
| **Green** | #00B894 | Verde natural |
| **Purple** | #6C5CE7 | Púrpura moderno |

### Personalización

Cada tema tiene:
- Gradiente único para el reproductor
- Colores adaptados para badges (ciudad/región)
- Controles de volumen con transparencias específicas
- Scrollbars invisibles

## 📱 Instalación como PWA

### Android
1. Abre la página en Chrome
2. Toca el menú (⋮)
3. Selecciona "Agregar a pantalla de inicio"
4. Confirma

### iOS
1. Abre en Safari
2. Toca el botón compartir
3. Selecciona "Agregar a pantalla de inicio"
4. Confirma

### Desktop (Chrome/Edge)
1. Abre la página
2. Busca el ícono de instalación en la barra de direcciones
3. Click en "Instalar"

## 🚀 Despliegue

### Desarrollo Local

```powershell
# Opción 1: Python
python -m http.server 8000

# Opción 2: Node.js (http-server)
npx http-server ./ -p 8000

# Opción 3: VS Code Live Server
# Instala la extensión "Live Server" y click derecho > "Open with Live Server"
```

Luego abre: `http://localhost:8000`

### Producción

Puedes desplegar en cualquier hosting estático:
- **GitHub Pages**
- **Netlify**
- **Vercel**
- **Firebase Hosting**

Solo necesitas subir todos los archivos del proyecto.

## 🔐 HTTPS Requerido

Para que el Service Worker funcione, la página debe ser servida vía HTTPS (excepto en localhost).

## 🌐 Compatibilidad

### Navegadores Soportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### Características Requeridas
- Service Worker API
- LocalStorage
- Fetch API
- ES6 (const, let, arrow functions, async/await)
- CSS Variables
- CSS Grid/Flexbox

## 📝 Mejoras Implementadas (Nov 2025)

### ✅ Separación de Código
- **JavaScript externo**: Todo el JS movido a `app.js`
- **Mejor organización**: Código modular con comentarios por sección
- **Carga optimizada**: Script con `defer` para mejor rendimiento

### ✅ Normalización de Datos
- **Propiedades en inglés**: `region`, `ciudad`, `pais` para i18n
- **Código de país**: Propiedad `pais: "PE"` agregada
- **Preparado para expansión**: Fácil agregar emisoras internacionales

### ✅ Service Worker Mejorado
- **Assets completos**: Todos los recursos críticos en caché
- **Versión actualizada**: v1.0.2 con mejor estrategia
- **Fuentes incluidas**: Google Fonts y Material Icons cacheados

## 🐛 Solución de Problemas

### La radio no reproduce
- Verifica la conexión a internet
- Comprueba que el stream URL esté activo
- Revisa la consola del navegador para errores

### El Service Worker no funciona
- Asegúrate de estar en HTTPS o localhost
- Limpia el caché del navegador
- Desregistra el SW anterior en DevTools > Application > Service Workers

### Los favoritos no se guardan
- Verifica que localStorage esté habilitado
- Comprueba permisos del navegador
- Revisa el modo incógnito (localStorage limitado)

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y educativo.

## 👨‍💻 Desarrollo

### Agregar una Nueva Emisora

Edita el array `musicData` en `app.js`:

```javascript
{
  id: 9,
  nombre: "Nueva Emisora FM",
  region: "Lima",
  ciudad: "Lima",
  pais: "PE",
  src: "https://stream-url.com/stream",
  imagen: "https://url-imagen.com/logo.png"
}
```

### Agregar un Nuevo Tema

1. Añade el tema al array `themes` en `app.js`
2. Define las variables CSS en `styles.css`
3. Actualiza el sistema de gradientes

---

**Hecho con ❤️ en Perú 🇵🇪**
