# 📻 Radios del Perú

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

### 📐 Responsive Design
- ✅ **Mobile** (< 480px)
- ✅ **Tablet** (481px - 768px)
- ✅ **Desktop** (> 769px)
- ✅ **Tipografía fluida** con clamp()

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

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y educativo.

**Hecho con ❤️ en Perú 🇵🇪**