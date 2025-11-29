// ========================================
// RADIOS DEL PERÚ - PWA
// Archivo JavaScript Principal
// ========================================

// ========================================
// 1. VARIABLES GLOBALES Y ELEMENTOS DEL DOM
// ========================================
const playerWindow = document.getElementById("players");
const audio = document.getElementById("audio");
const nameEl = document.getElementById("name");
const category = document.getElementById("category");
const thumbnail = document.getElementById("thumbnail");
const playBtn = document.getElementById("playBtn");
const musicList = document.getElementById("music-list");
const body = document.querySelector("body");
const searchInput = document.getElementById('searchInput');
const volumeBar = document.getElementById('volumeBar');

// Variables para HLS
let hls = null;

// Variables para metadatos
let currentMetadata = {
  title: '',
  artist: '',
  station: ''
};

// ========================================
// 2. DATOS DE EMISORAS (Internacionalización preparada)
// ========================================
let musicData = [
 {
   id: 1,
   nombre: "RPP Noticias 89.7 FM",
   region: "Lima",
   ciudad: "Lima",
   pais: "PE",
   src: "https://us-b4-p-e-cg11-audio.cdn.mdstrm.com/live-audio-aw/5fab3416b5f9ef165cfab6e9?aid=5faaeb72f92d7b07dfe10181&pid=IdIxkImeJkX6SluruCIGnCjpDGUEmxSc&sid=MLEWn90LeAbSA3uTlZAOuA24XQTy1wNj&uid=jBAwJyilyg060ipKKG9WL66hwjA2r29x&es=us-b4-p-e-cg11-audio.cdn.mdstrm.com&ote=1649278995736&ot=1Es9zP2YKsEwqKiVxHs9ag&proto=https&pz=us&cP=128000&awCollectionId=5faaeb72f92d7b07dfe10181&liveId=5fab3416b5f9ef165cfab6e9&referer=https%3A%2F%2Fradios.com.pe%2F",
   imagen: "https://res.cloudinary.com/dxlkf8i1p/image/upload/v1762604027/Rpp_Noticias_d6xjur.jpg"
 },
 {
   id: 2,
   nombre: "Ritmo Romántica 93.1 FM",
   region: "Lima",
   ciudad: "Lima",
   pais: "PE",
   src: "https://us-b4-p-e-cg11-audio.cdn.mdstrm.com/live-audio-aw/6839e2376607bdf6b2fcde27",
   imagen: "https://mytuner.global.ssl.fastly.net/media/tvos_radios/VZd6pyTMTY.png"
 },
 {
   id: 3,
   nombre: "La Ribereña 94.1 FM",
   region: "Moquegua",
   ciudad: "Moquegua",
   pais: "PE",
   src: "https://stream.zeno.fm/sed22b6595quv",
   imagen: "https://play-lh.googleusercontent.com/8joBO-ZWZzygAsiT-EWoNTL8i5ephUiB-hNWEGSYioZYAL91otTzGHS7Y6q95LWAREo"
 },
 {
   id: 4,
   nombre: "Radio Corazón",
   region: "Lima",
   ciudad: "Lima",
   pais: "PE",
   src: "https://mdstrm.com/audio/5fada514fc16c006bd63370f/icecast.audio",
   imagen: "https://mytuner.global.ssl.fastly.net/media/tvos_radios/eLk5CpPL4E.jpg"
 },
 {
   id: 5,
   nombre: "Radio Ritmo y Romance",
   region: "Lima",
   ciudad: "Lima",
   pais: "PE",
   src: "https://stream.zeno.fm/7glwqektfbjvv",
   imagen: "https://i.ibb.co/D4BdW1v/microfono.png"
 },
 {
   id: 6,
   nombre: "Radio Latina 990 AM La Poderosa",
   region: "Lima",
   ciudad: "Lima",
   pais: "PE",
   src: "https://stm2.srvif.com:7974/stream",
   imagen: "https://i.ibb.co/D4BdW1v/microfono.png"
 },
 {
   id: 7,
   nombre: "Radio del Progreso 107.7 FM",
   region: "Ucayali",
   ciudad: "Pucallpa",
   pais: "PE",
   src: "https://conectperu.com:7036/stream?icy=http",
   imagen: "https://i.ibb.co/D4BdW1v/microfono.png"
 },
 {
   id: 8,
   nombre: "La Ribereña 93.7 FM",
   region: "San Martín",
   ciudad: "Bellavista",
   pais: "PE",
   src: "https://panelautodj.innovatestream.pe:10928/stream",
   imagen: "https://i.ibb.co/D4BdW1v/microfono.png"
 },
 {
   id: 9,
   nombre: "Radio San Juan 89.5 FM",
   region: "Cuzco",
   ciudad: "Checacupe",
   pais: "PE",
   src: "https://audio.miradioenvivo.com:10864/stream",
   imagen: "https://i.ibb.co/D4BdW1v/microfono.png"
 },
 {
   id: 10,
   nombre: "Radio Atmosfera 92.3 FM",
   region: "San Martín",
   ciudad: "Moyobamba",
   pais: "PE",
   src: "https://panelautodj.innovatestream.pe:10742/;",
   imagen: "https://i.ibb.co/D4BdW1v/microfono.png"
 },
 {
   id: 11,
   nombre: "Radio Ribereña 93.9 FM",
   region: "Ica",
   ciudad: "Chincha Alta",
   pais: "PE",
   src: "https://panel.innovatestream.pe:10938/;",
   imagen: "https://i.ibb.co/D4BdW1v/microfono.png"
 },
 {
   id: 12,
   nombre: "Radio Andina 1360 AM",
   region: "Puno",
   ciudad: "Juliaca",
   pais: "PE",
   src: "https://sp.oyotunstream.com:10983/;",
   imagen: "https://res.cloudinary.com/dxlkf8i1p/image/upload/v1762603523/Radio_Andina_-_Juliaca_g7fpaw.png"
 },
 {
   id: 13,
   nombre: "Radio Nuevo Tiempo",
   region: "Puno",
   ciudad: "Juliaca",
   pais: "PE",
   src: "https://stream.live.novotempo.com/radio/smil:rntLimaPE.smil/playlist.m3u8",
   imagen: "https://res.cloudinary.com/dxlkf8i1p/image/upload/v1764382295/Nuevo_Tiempo_gwmdxl.jpg"
 },
];

// ========================================
// 3. ESTADO DE LA APLICACIÓN
// ========================================
let repeatMusic = false;
let currentId = musicData.length ? musicData[0].id : null;
let songs = musicData.slice();
let favorites = [];
let showingFavorites = false;
let currentView = 'home';

// ========================================
// 4. SISTEMA DE FAVORITOS
// ========================================
function loadFavorites() {
  try {
    const stored = localStorage.getItem('radioFavorites');
    if (stored) {
      favorites = JSON.parse(stored);
    }
  } catch(e) {
    console.error('Error cargando favoritos:', e);
  }
}

function saveFavorites() {
  try {
    localStorage.setItem('radioFavorites', JSON.stringify(favorites));
  } catch(e) {
    console.error('Error guardando favoritos:', e);
  }
}

function isFavorite(id) {
  return favorites.includes(id);
}

function toggleFavorite(id, event) {
  if (event) {
    event.stopPropagation();
  }
  
  const index = favorites.indexOf(id);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(id);
  }
  saveFavorites();
  
  const musicItem = musicList.querySelector(`.music[data-id="${id}"]`);
  if (musicItem) {
    const favBtn = musicItem.querySelector('.favorite-btn');
    if (favBtn) {
      const icon = favBtn.querySelector('.material-icons');
      if (isFavorite(id)) {
        icon.textContent = 'favorite';
        favBtn.classList.add('active');
      } else {
        icon.textContent = 'favorite_border';
        favBtn.classList.remove('active');
      }
    }
  }
  
  if (showingFavorites) {
    showFavorites();
  }
}

// ========================================
// 5. SISTEMA DE BÚSQUEDA Y FILTROS
// ========================================
function applyFilters() {
  const q = (searchInput.value || '').toLowerCase().trim();
  
  if (currentView === 'home') {
    // Vista Inicio
    if (showingFavorites) {
      showingFavorites = false;
      const headerFavBtn = document.getElementById('headerFavoritesBtn');
      if (headerFavBtn) headerFavBtn.classList.remove('active');
    }
    
    songs = musicData.filter(m => {
      const matchQuery = q ? (
        (m.nombre && m.nombre.toLowerCase().includes(q)) ||
        (m.region && m.region.toLowerCase().includes(q)) ||
        (m.ciudad && m.ciudad.toLowerCase().includes(q))
      ) : true;
      return matchQuery;
    });
    while (musicList.firstChild) musicList.removeChild(musicList.firstChild);
    setMusicList();
  } 
  else if (currentView === 'locales') {
    // Vista Locales con búsqueda
    if (q === '') {
      // Si el buscador está vacío, mostrar las regiones
      displayRegionGroups();
    } else {
      // Si hay búsqueda, mostrar las emisoras que coincidan
      const filtered = musicData.filter(m => {
        return (m.nombre && m.nombre.toLowerCase().includes(q)) ||
               (m.region && m.region.toLowerCase().includes(q)) ||
               (m.ciudad && m.ciudad.toLowerCase().includes(q));
      });
      
      while (musicList.firstChild) musicList.removeChild(musicList.firstChild);
      
      const backBtn = document.createElement('button');
      backBtn.className = 'back-to-regions';
      backBtn.innerHTML = '<i class="material-icons">arrow_back</i> Volver';
      backBtn.onclick = () => {
        searchInput.value = '';
        displayRegionGroups();
      };
      musicList.appendChild(backBtn);
      
      if (filtered.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.style.cssText = 'padding: 40px 20px; text-align: center; color: var(--grey);';
        emptyMsg.innerHTML = `
          <i class="material-icons" style="font-size: 64px; opacity: 0.3;">search_off</i>
          <p style="margin-top: 10px; font-size: 16px;">No se encontraron emisoras</p>
          <p style="font-size: 14px; opacity: 0.7;">Intenta con otro nombre o región</p>
        `;
        musicList.appendChild(emptyMsg);
      } else {
        filtered.forEach(station => {
          const stationDiv = createStationCard(station);
          musicList.appendChild(stationDiv);
        });
      }
    }
  }
}

searchInput.addEventListener('input', applyFilters);

// ========================================
// 6. NAVEGACIÓN DE MENÚ
// ========================================
function showHome() {
  currentView = 'home';
  
  document.getElementById('homeBtn').classList.add('active');
  document.getElementById('localesBtn').classList.remove('active');
  document.getElementById('worldBtn').classList.remove('active');
  document.getElementById('favoritesBtn').classList.remove('active');
  
  if (showingFavorites) {
    showingFavorites = false;
  }
  
  searchInput.value = '';
  songs = musicData.slice();
  while (musicList.firstChild) musicList.removeChild(musicList.firstChild);
  setMusicList();
  musicList.scrollTop = 0;
}

function showLocales() {
  currentView = 'locales';
  
  document.getElementById('homeBtn').classList.remove('active');
  document.getElementById('localesBtn').classList.add('active');
  document.getElementById('worldBtn').classList.remove('active');
  document.getElementById('favoritesBtn').classList.remove('active');
  
  if (showingFavorites) {
    showingFavorites = false;
  }
  
  searchInput.value = '';
  displayRegionGroups();
}

function showWorld() {
  currentView = 'world';
  
  document.getElementById('homeBtn').classList.remove('active');
  document.getElementById('localesBtn').classList.remove('active');
  document.getElementById('worldBtn').classList.add('active');
  document.getElementById('favoritesBtn').classList.remove('active');
  
  if (showingFavorites) {
    showingFavorites = false;
  }
  
  while (musicList.firstChild) musicList.removeChild(musicList.firstChild);
  
  const worldMsg = document.createElement('div');
  worldMsg.style.cssText = 'padding: 60px 20px; text-align: center; color: var(--grey);';
  worldMsg.innerHTML = `
    <i class="material-icons" style="font-size: 80px; opacity: 0.3; color: var(--primary);">language</i>
    <h2 style="margin-top: 20px; font-size: 1.5rem; color: var(--grey);">World Radio</h2>
    <p style="margin-top: 10px; font-size: 1rem; opacity: 0.7;">Sección de emisoras internacionales</p>
    <p style="margin-top: 5px; font-size: 0.9rem; opacity: 0.6;">Próximamente disponible</p>
  `;
  musicList.appendChild(worldMsg);
  musicList.scrollTop = 0;
}

function showFavorites() {
  currentView = 'favorites';
  
  document.getElementById('homeBtn').classList.remove('active');
  document.getElementById('localesBtn').classList.remove('active');
  document.getElementById('worldBtn').classList.remove('active');
  document.getElementById('favoritesBtn').classList.add('active');
  
  if (!showingFavorites) {
    showingFavorites = true;
    songs = musicData.filter(m => isFavorite(m.id));
    
    if (songs.length === 0) {
      while (musicList.firstChild) musicList.removeChild(musicList.firstChild);
      const emptyMsg = document.createElement('div');
      emptyMsg.style.cssText = 'padding: 40px 20px; text-align: center; color: var(--grey);';
      emptyMsg.innerHTML = `
        <i class="material-icons" style="font-size: 64px; opacity: 0.3;">favorite_border</i>
        <p style="margin-top: 10px; font-size: 16px;">No tienes favoritos</p>
        <p style="font-size: 14px; opacity: 0.7;">Toca el corazón en cualquier emisora para agregarla</p>
      `;
      musicList.appendChild(emptyMsg);
      return;
    }
  } else {
    showHome();
    return;
  }
  
  while (musicList.firstChild) musicList.removeChild(musicList.firstChild);
  setMusicList();
  musicList.scrollTop = 0;
}

function refreshStations() {
  if (showingFavorites) {
    showingFavorites = false;
    const headerFavBtn = document.getElementById('headerFavoritesBtn');
    if (headerFavBtn) headerFavBtn.classList.remove('active');
  }
  searchInput.value = '';
  songs = musicData.slice();
  while (musicList.firstChild) musicList.removeChild(musicList.firstChild);
  setMusicList();
  musicList.scrollTop = 0;
}

// ========================================
// 7. VISTA DE REGIONES AGRUPADAS
// ========================================
function displayRegionGroups() {
  while (musicList.firstChild) musicList.removeChild(musicList.firstChild);
  
  // Contenedor para las tarjetas de región
  const containerDiv = document.createElement('div');
  containerDiv.className = 'regions-container';
  musicList.appendChild(containerDiv);
  
  const regionGroups = {};
  musicData.forEach(station => {
    const region = station.region || 'Sin región';
    if (!regionGroups[region]) {
      regionGroups[region] = [];
    }
    regionGroups[region].push(station);
  });
  
  // Agregar "Todas" al inicio
  const todosCard = document.createElement('div');
  todosCard.className = 'region-card';
  todosCard.innerHTML = `
    <div class="region-card-header">
      <h3>Todas</h3>
      <span class="region-card-count">${musicData.length} emisoras</span>
    </div>
    <button class="region-card-btn" onclick="showAllStations()">
      <i class="material-icons">chevron_right</i>
    </button>
  `;
  containerDiv.appendChild(todosCard);
  
  // Agregar tarjetas por región
  Object.keys(regionGroups).sort().forEach(region => {
    const card = document.createElement('div');
    card.className = 'region-card';
    card.innerHTML = `
      <div class="region-card-header">
        <h3>${region}</h3>
        <span class="region-card-count">${regionGroups[region].length} emisoras</span>
      </div>
      <button class="region-card-btn" onclick="showRegionStations('${region}')">
        <i class="material-icons">chevron_right</i>
      </button>
    `;
    containerDiv.appendChild(card);
  });
}

function toggleRegion(region) {
  const contentId = `region-${region.replace(/\s+/g, '-')}`;
  const content = document.getElementById(contentId);
  const header = content.previousElementSibling;
  const icon = header.querySelector('.material-icons');
  
  if (content.classList.contains('expanded')) {
    content.classList.remove('expanded');
    icon.textContent = 'expand_more';
  } else {
    content.classList.add('expanded');
    icon.textContent = 'expand_less';
  }
}


function showAllStations() {
  const regionGroups = {};
  musicData.forEach(station => {
    const region = station.region || 'Sin región';
    if (!regionGroups[region]) {
      regionGroups[region] = [];
    }
    regionGroups[region].push(station);
  });
  
  while (musicList.firstChild) musicList.removeChild(musicList.firstChild);
  
  const backBtn = document.createElement('button');
  backBtn.className = 'back-to-regions';
  backBtn.innerHTML = '<i class="material-icons">arrow_back</i> Volver';
  backBtn.onclick = displayRegionGroups;
  musicList.appendChild(backBtn);
  
  musicData.forEach(station => {
    const stationDiv = createStationCard(station);
    musicList.appendChild(stationDiv);
  });
}

function showRegionStations(region) {
  const regionGroups = {};
  musicData.forEach(station => {
    const stationRegion = station.region || 'Sin región';
    if (!regionGroups[stationRegion]) {
      regionGroups[stationRegion] = [];
    }
    regionGroups[stationRegion].push(station);
  });
  
  while (musicList.firstChild) musicList.removeChild(musicList.firstChild);
  
  const backBtn = document.createElement('button');
  backBtn.className = 'back-to-regions';
  backBtn.innerHTML = '<i class="material-icons">arrow_back</i> Volver';
  backBtn.onclick = displayRegionGroups;
  musicList.appendChild(backBtn);
  
  // Mostrar emisoras en modo lista (como en "Todas")
  regionGroups[region].forEach(station => {
    const stationDiv = createStationCard(station);
    musicList.appendChild(stationDiv);
  });
}

// ========================================
// 8. CREACIÓN DE TARJETAS DE EMISORAS
// ========================================
function createStationCard(data) {
  let div = document.createElement("div");
  div.classList.add('music');
  div.setAttribute("data-id", data.id);
  
  let info = '';
  if (data.ciudad) {
    info += '<span class="city-name">' + data.ciudad + '</span>';
  }
  if (data.region && data.region !== data.ciudad) {
    info += (info ? ' • ' : '') + '<span class="region-name">' + data.region + '</span>';
  }
  
  const favIcon = isFavorite(data.id) ? 'favorite' : 'favorite_border';
  const favClass = isFavorite(data.id) ? 'active' : '';
  
  div.innerHTML = `
   <div class="list-thumbnail">
    <img src="${data.imagen}" width="60" height="60" alt="${data.nombre}" loading="lazy">
   </div>
   <div class="list-content">
     <h3>${data.nombre}</h3>
     <small>${info}</small>
   </div>
   <button type="button" class="favorite-btn ${favClass}" aria-label="Agregar a favoritos">
     <i class="material-icons">${favIcon}</i>
   </button>
   <button type="button" class="list-btn" aria-label="Reproducir ${data.nombre}">
     <i class="material-icons">play_arrow</i>
     <div class="equalize">
       <span></span><span></span><span></span>
     </div>
   </button>`;
  
  div.addEventListener('click', (e) => {
    if (e.target.closest('.favorite-btn')) return;
    playMusic(data.id);
  });
  
  const favBtn = div.querySelector('.favorite-btn');
  if (favBtn) {
    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(data.id, e);
    });
  }
  
  return div;
}

// ========================================
// 9. SISTEMA DE TEMAS
// ========================================
const themes = ['light', 'dark', 'blue', 'green', 'purple'];
let currentThemeIndex = 0;

function darkMood() {
  body.classList.remove(themes[currentThemeIndex]);
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  
  if (themes[currentThemeIndex] !== 'light') {
    body.classList.add(themes[currentThemeIndex]);
  }
  
  try { 
    localStorage.setItem('theme', themes[currentThemeIndex]); 
  } catch(e){}
}

// ========================================
// 10. CONTROL DEL REPRODUCTOR
// ========================================
function setActive(id) {
  setEqualizer();
  const prev = musicList.querySelector(".music.active");
  if (prev) prev.classList.remove("active");
  const ele = musicList.querySelector(`.music[data-id="${id}"]`);
  if (ele) ele.classList.add("active");
}

function setData(data) {
   currentMetadata.station = data.nombre || '';
   nameEl.textContent = data.nombre || '';
   let info = '';
   if (data.ciudad) {
     info += '<span class="player-city">' + data.ciudad + '</span>';
   }
   if (data.region && data.region !== data.ciudad) {
     info += (info ? ' • ' : '') + '<span class="player-region">' + data.region + '</span>';
   }
   category.innerHTML = info;
   category.style.color = ''; // Restaurar color normal
   thumbnail.src = data.imagen || '';
   thumbnail.alt = `Portada ${data.nombre || ''}`;
   
   // Actualizar información expandida
   updateExpandedInfo(data);
   
   // Actualizar MediaSession
   updateMediaSession(data);
}

async function playMusic(id) {
   const data = musicData.find(m => m.id === id) || musicData[0];
   if (!data) return;
   currentId = data.id;
   setActive(currentId);
   setData(data);
   syncPlayButtons(true);
   
   try {
     localStorage.setItem('lastPlayedStation', JSON.stringify({
       id: data.id,
       timestamp: Date.now()
     }));
   } catch(e) {
     console.error('Error guardando última emisora:', e);
   }
   
   try {
     // Detectar si es stream HLS (.m3u8)
     const isHLS = data.src.includes('.m3u8');
     
     if (isHLS && typeof Hls !== 'undefined') {
       // Usar HLS.js para streams .m3u8
       if (Hls.isSupported()) {
         // Limpiar instancia anterior de HLS si existe
         if (hls) {
           hls.destroy();
         }
         
         hls = new Hls({
           enableWorker: true,
           lowLatencyMode: true,
           backBufferLength: 90
         });
         
         hls.loadSource(data.src);
         hls.attachMedia(audio);
         
         hls.on(Hls.Events.MANIFEST_PARSED, function() {
           audio.play()
             .then(() => {
               syncPlayButtons(true);
               setEqualizer();
             })
             .catch((err) => {
               console.error('Error reproduciendo stream HLS:', err);
               syncPlayButtons(false);
             });
         });
         
         hls.on(Hls.Events.ERROR, function(event, data) {
           console.error('Error HLS:', data);
           if (data.fatal) {
             switch(data.type) {
               case Hls.ErrorTypes.NETWORK_ERROR:
                 console.log('Error de red, intentando recuperar...');
                 showErrorMessage('Emisora no Disponible');
                 hls.startLoad();
                 setTimeout(() => {
                   if (audio.paused) {
                     syncPlayButtons(false);
                   }
                 }, 5000);
                 break;
               case Hls.ErrorTypes.MEDIA_ERROR:
                 console.log('Error de medios, intentando recuperar...');
                 hls.recoverMediaError();
                 break;
               default:
                 console.error('Error fatal, destruyendo HLS');
                 showErrorMessage('Emisora no Disponible');
                 hls.destroy();
                 syncPlayButtons(false);
                 break;
             }
           }
         });
       } else if (audio.canPlayType('application/vnd.apple.mpegurl')) {
         // Safari nativo soporta HLS
         audio.src = data.src;
         audio.load();
         const playPromise = audio.play();
         if (playPromise !== undefined) {
           await playPromise;
           syncPlayButtons(true);
           setEqualizer();
         }
       } else {
         alert('Tu navegador no soporta la reproducción de este stream HLS');
         syncPlayButtons(false);
       }
     } else {
       // Stream normal (MP3, AAC, etc.)
       // Limpiar HLS si estaba activo
       if (hls) {
         hls.destroy();
         hls = null;
       }
       
       audio.src = data.src;
       audio.load();
       
       const playPromise = audio.play();
       if (playPromise !== undefined) {
         await playPromise;
         syncPlayButtons(true);
         setEqualizer();
       }
     }
   } catch (err) {
     console.error('Error reproduciendo stream:', err);
     syncPlayButtons(false);
     
     if (err.name === 'NotAllowedError') {
       console.log('Interacción del usuario requerida para reproducir audio');
       showErrorMessage('Haz clic para reproducir');
     } else if (err.name === 'NotSupportedError') {
       showErrorMessage('Formato no soportado');
     } else {
       showErrorMessage('Emisora no Disponible');
     }
   }
}

function playPause(e) {
   if (audio.paused) {
     playBtn.textContent = "pause";
     audio.play()
       .then(() => setEqualizer())
       .catch((err) => {
         console.error('Error al reproducir:', err);
         playBtn.textContent = "play_arrow";
       });
   } else {
     playBtn.textContent = "play_arrow";
     audio.pause();
     setEqualizer(true);
   }
}

function showplayer() {
   playerWindow.classList.toggle("active");
}

function equalizerBtn(e) {
  e.currentTarget.classList.toggle("active");
  document.querySelector(".thumbnail").classList.toggle("spin");
}

function nextPlay() {
  if (!songs.length) return;
  const pos = songs.findIndex(s => s.id === currentId);
  const nextPos = (pos < 0) ? 0 : (pos + 1) % songs.length;
  playMusic(songs[nextPos].id);
}

function prevPlay() {
  if (!songs.length) return;
  const pos = songs.findIndex(s => s.id === currentId);
  const prevPos = (pos <= 0) ? songs.length - 1 : (pos - 1);
  playMusic(songs[prevPos].id);
}

audio.addEventListener("ended", () => { if (!audio.loop) nextPlay(); });

// ========================================
// 11. GESTIÓN DE LISTAS
// ========================================
function addList(data) {
  let div = document.createElement("div");
  div.classList.add('music');
  div.setAttribute("data-id", data.id);
  
  let info = '';
  if (data.ciudad) {
    info += '<span class="city-name">' + data.ciudad + '</span>';
  }
  if (data.region && data.region !== data.ciudad) {
    info += (info ? ' • ' : '') + '<span class="region-name">' + data.region + '</span>';
  }
  
  const favIcon = isFavorite(data.id) ? 'favorite' : 'favorite_border';
  const favClass = isFavorite(data.id) ? 'active' : '';
  
  let html = `
   <div class="list-thumbnail">
    <img src="${data.imagen}" width="60" height="60" alt="${data.nombre}" loading="lazy">
   </div>
   <div class="list-content">
     <h3>${data.nombre}</h3>
     <small>${info}</small>
   </div>
   <button type="button" class="favorite-btn ${favClass}" aria-label="Agregar a favoritos">
     <i class="material-icons">${favIcon}</i>
   </button>
   <button type="button" class="list-btn" aria-label="Reproducir ${data.nombre}">
     <i class="material-icons">play_arrow</i>
     <div class="equalize">
       <span></span><span></span><span></span>
     </div>
   </button>`;
  div.innerHTML = html;
  musicList.append(div);
  
  div.addEventListener('click', (e) => {
    if (e.target.closest('.favorite-btn')) return;
    playMusic(data.id);
  });
  
  const favBtn = div.querySelector('.favorite-btn');
  if (favBtn) {
    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(data.id, e);
    });
  }
}

function setMusicList() {
  songs.forEach(song => addList(song));
}

// ========================================
// 12. CONTROL DE VOLUMEN
// ========================================
function updateVolume(value) {
  audio.volume = value / 100;
  const volumePercentage = document.getElementById('volumePercentage');
  if (volumePercentage) {
    volumePercentage.textContent = value + '%';
  }
}

function volumeDown() {
  if (!volumeBar) return;
  let v = parseInt(volumeBar.value || 0);
  v = Math.max(0, v - 10);
  volumeBar.value = v;
  audio.volume = v / 100;
  updateVolume(v);
}

function volumeUp() {
  if (!volumeBar) return;
  let v = parseInt(volumeBar.value || 0);
  v = Math.min(100, v + 10);
  volumeBar.value = v; 
  audio.volume = v / 100;
  updateVolume(v);
}

// ========================================
// 13. RECONEXIÓN AUTOMÁTICA
// ========================================
let reconnectAttempts = 0;
let reconnectTimer = null;

function tryReconnectAudio() {
  if (reconnectTimer) return;
  reconnectTimer = setInterval(() => {
    reconnectAttempts++;
    if (audio.src && audio.paused) {
      audio.load();
      audio.play().then(() => {
        clearInterval(reconnectTimer);
        reconnectTimer = null;
        reconnectAttempts = 0;
      }).catch(() => {});
    }
    if (reconnectAttempts > 12) {
      clearInterval(reconnectTimer);
      reconnectTimer = null;
      reconnectAttempts = 0;
    }
  }, 5000);
}

audio.addEventListener('error', () => {
  tryReconnectAudio();
});

audio.addEventListener('stalled', () => {
  tryReconnectAudio();
});

audio.addEventListener('playing', () => {
  if (reconnectTimer) {
    clearInterval(reconnectTimer);
    reconnectTimer = null;
    reconnectAttempts = 0;
  }
});

// ========================================
// 14. RECUPERACIÓN DE METADATOS
// ========================================

// Actualizar MediaSession API para notificaciones y controles del sistema
function updateMediaSession(data) {
  if (!('mediaSession' in navigator)) return;
  
  // Mostrar nombre de la radio como título
  const title = data.nombre || 'Radio en vivo';
  // Mostrar ciudad y región como artista (en lugar del nombre de la app)
  const artist = data.ciudad && data.region 
    ? `${data.ciudad}, ${data.region}` 
    : (data.ciudad || data.region || 'Perú');
  
  navigator.mediaSession.metadata = new MediaMetadata({
    title: title,
    artist: artist,
    album: '', // Dejar vacío para no mostrar "Radios del Perú"
    artwork: [
      { src: data.imagen || 'https://i.ibb.co/D4BdW1v/microfono.png', sizes: '96x96', type: 'image/png' },
      { src: data.imagen || 'https://i.ibb.co/D4BdW1v/microfono.png', sizes: '128x128', type: 'image/png' },
      { src: data.imagen || 'https://i.ibb.co/D4BdW1v/microfono.png', sizes: '192x192', type: 'image/png' },
      { src: data.imagen || 'https://i.ibb.co/D4BdW1v/microfono.png', sizes: '256x256', type: 'image/png' },
      { src: data.imagen || 'https://i.ibb.co/D4BdW1v/microfono.png', sizes: '384x384', type: 'image/png' },
      { src: data.imagen || 'https://i.ibb.co/D4BdW1v/microfono.png', sizes: '512x512', type: 'image/png' }
    ]
  });

  // Configurar controles de MediaSession
  navigator.mediaSession.setActionHandler('play', () => {
    audio.play();
    playBtn.textContent = 'pause';
  });
  
  navigator.mediaSession.setActionHandler('pause', () => {
    audio.pause();
    playBtn.textContent = 'play_arrow';
  });
  
  navigator.mediaSession.setActionHandler('previoustrack', () => {
    prevPlay();
  });
  
  navigator.mediaSession.setActionHandler('nexttrack', () => {
    nextPlay();
  });
  
  navigator.mediaSession.setActionHandler('stop', () => {
    audio.pause();
    audio.currentTime = 0;
    playBtn.textContent = 'play_arrow';
  });
}

// Función para obtener metadatos del stream usando el proxy de Vercel
async function fetchStreamMetadataViaProxy(streamUrl) {
  try {
    // Construir URL del proxy (funciona en producción y localhost)
    const proxyUrl = `/api/metadata?url=${encodeURIComponent(streamUrl)}`;
    
    console.log('[Metadata] Solicitando metadata via proxy:', proxyUrl);
    
    const response = await fetch(proxyUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const metadata = await response.json();
    console.log('[Metadata] Recibida:', metadata);
    
    // Si la petición fue exitosa y hay metadata disponible
    if (metadata.success && metadata.station) {
      const station = metadata.station;
      
      // Actualizar UI con metadata del stream si está disponible
      const nowPlayingEl = document.getElementById('nowPlaying');
      const songInfoEl = document.getElementById('songInfo');
      
      if (nowPlayingEl && songInfoEl) {
        // Mostrar información de la estación
        let displayText = '';
        
        // Filtrar nombres que parezcan URLs o códigos
        const isValidName = (name) => {
          if (!name || name === 'Desconocido') return false;
          // Rechazar si contiene caracteres típicos de URL o códigos
          if (name.includes('/') || name.includes('stream') || 
              /^[a-f0-9]{20,}$/i.test(name) || name.length > 100) {
            return false;
          }
          return true;
        };
        
        if (isValidName(station.name)) {
          displayText = station.name;
        }
        
        if (station.genre && !station.genre.includes('/')) {
          displayText += (displayText ? ' • ' : '') + station.genre;
        }
        
        if (station.bitrate && Number(station.bitrate) > 0) {
          displayText += (displayText ? ' • ' : '') + station.bitrate + ' kbps';
        }
        
        if (displayText) {
          songInfoEl.textContent = displayText;
          nowPlayingEl.style.display = 'flex';
        } else {
          // Si no hay metadata válida, mostrar mensaje genérico
          songInfoEl.textContent = 'En vivo';
          nowPlayingEl.style.display = 'flex';
        }
      }
      
      return metadata;
    } else {
      console.log('[Metadata] No hay metadata disponible para este stream');
      // Mostrar "En vivo" cuando no hay metadata
      const nowPlayingEl = document.getElementById('nowPlaying');
      const songInfoEl = document.getElementById('songInfo');
      if (nowPlayingEl && songInfoEl) {
        songInfoEl.textContent = 'En vivo';
        nowPlayingEl.style.display = 'flex';
      }
      return null;
    }
    
  } catch (error) {
    console.error('[Metadata] Error al obtener metadata:', error.message);
    // Ocultar el indicador si hay error
    const nowPlayingEl = document.getElementById('nowPlaying');
    if (nowPlayingEl) {
      nowPlayingEl.style.display = 'none';
    }
    return null;
  }
}

// Escuchar cuando el audio empieza a reproducirse para obtener metadata
audio.addEventListener('playing', async () => {
  const currentStation = musicData.find(m => m.id === currentId);
  if (currentStation && currentStation.src) {
    // Pequeño delay para asegurar que el stream está conectado
    setTimeout(async () => {
      await fetchStreamMetadataViaProxy(currentStation.src);
    }, 1500);
  }
});

// Escuchar cambios en los metadatos del audio (si están disponibles)
audio.addEventListener('loadedmetadata', () => {
  const data = musicData.find(m => m.id === currentId);
  if (data) {
    updateMediaSession(data);
  }
});

// ========================================
// 15. RELOJ EN TIEMPO REAL
// ========================================
function updateCurrentTime() {
  const el = document.getElementById('currentTime');
  if (!el) return;
  const now = new Date();
  let h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, '0');
  const s = now.getSeconds().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12;
  const hStr = h.toString().padStart(2, '0');
  el.textContent = `${hStr}:${m}:${s} ${ampm}`;
}

setInterval(updateCurrentTime, 1000);
updateCurrentTime();

function updateTimeVisibility() {
  const el = document.getElementById('currentTime');
  const player = document.getElementById('players');
  if (!el || !player) return;
  if (player.classList.contains('active')) {
    el.style.display = '';
  } else {
    el.style.display = 'none';
  }
}

if (playerWindow) {
  const observer = new MutationObserver(updateTimeVisibility);
  observer.observe(playerWindow, { attributes: true, attributeFilter: ['class'] });
}

// ========================================
// 16. INICIALIZACIÓN DE LA APLICACIÓN
// ========================================
function FirstSetUp() {
  let lastStation = null;
  try {
    const stored = localStorage.getItem('lastPlayedStation');
    if (stored) {
      const parsed = JSON.parse(stored);
      const hoursSinceLastPlay = (Date.now() - parsed.timestamp) / (1000 * 60 * 60);
      if (hoursSinceLastPlay < 24) {
        lastStation = musicData.find(m => m.id === parsed.id);
      }
    }
  } catch(e) {
    console.error('Error cargando última emisora:', e);
  }
  
  if (musicData.length) {
    const stationToLoad = lastStation || musicData[0];
    currentId = stationToLoad.id;
    audio.src = stationToLoad.src || '';
    setData(stationToLoad);
    setActive(currentId);
  }
  
  try {
    const stored = localStorage.getItem('theme');
    if (stored && stored !== 'light') {
      body.classList.add(stored);
      currentThemeIndex = themes.indexOf(stored);
    }
  } catch(e){}
  
  if (volumeBar) {
    const initialVolume = Number(volumeBar.value) || 60;
    audio.volume = initialVolume / 100;
    updateVolume(initialVolume);
  }
  
  loadFavorites();
  setMusicList();
}

function setEqualizer(action = false){
 const elc = musicList.querySelector(`.music[data-id="${currentId}"] .equalize`);
 const thumb = document.querySelector(".thumbnail");
 if (elc) {
   if (action) elc.classList.add("pause");
   else elc.classList.remove("pause");
 }
 if (thumb && thumb.classList.contains("spin")) {
   if (audio.paused) thumb.classList.add("pause");
   else thumb.classList.remove("pause");
 }
}

// ========================================
// 17. PWA - PROMPT DE INSTALACIÓN
// ========================================
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  // Guardar el evento para uso posterior con el botón manual
  deferredPrompt = e;
  
  // Mostrar botón de instalación personalizado
  if (installBtn) installBtn.style.display = 'block';
  
  // NO prevenir el comportamiento por defecto
  // Esto permite que cada navegador muestre su propio prompt automático
  console.log('PWA lista para instalar - banner automático habilitado');
});

window.addEventListener('appinstalled', () => {
  if (installBtn) installBtn.style.display = 'none';
  deferredPrompt = null;
  console.log('PWA instalada exitosamente');
});

// Función para instalar manualmente desde el botón
window.installPWA = function() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Usuario aceptó instalar la PWA');
        if (installBtn) installBtn.style.display = 'none';
      } else {
        console.log('Usuario rechazó instalar la PWA');
      }
      deferredPrompt = null;
    });
  } else {
    // Instrucciones para navegadores que no soportan el prompt programático
    alert('Para instalar esta aplicación:\n\n' +
          '📱 Chrome/Edge móvil: Menú (⋮) → "Instalar aplicación"\n' +
          '🍎 Safari iOS: Compartir → "Agregar a pantalla de inicio"\n' +
          '🦁 Brave: Menú (⋮) → "Instalar aplicación"\n' +
          '💻 Navegadores de escritorio: Busca el ícono de instalación (+) en la barra de direcciones');
  }
};

// ========================================
// 18. EJECUTAR AL CARGAR LA PÁGINA
// ========================================
FirstSetUp();

// ========================================
// 19. FUNCIONES PARA REPRODUCTOR EXPANDIDO MODERNO
// ========================================

// Actualizar reloj del reproductor
function updatePlayerClock() {
  const clockEl = document.getElementById('playerTime');
  if (!clockEl) return;
  
  const now = new Date();
  let h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'p. m.' : 'a. m.';
  h = h % 12;
  h = h ? h : 12;
  
  clockEl.textContent = `${h}:${m} ${ampm}`;
}

// Actualizar cada minuto
setInterval(updatePlayerClock, 60000);
updatePlayerClock();

// Sincronizar controles de volumen
const volumeBarExpanded = document.getElementById('volumeBarExpanded');
if (volumeBarExpanded && volumeBar) {
  // Sincronizar valor inicial
  volumeBarExpanded.value = volumeBar.value;
  
  // Sincronizar al cambiar volumen normal
  volumeBar.addEventListener('input', () => {
    volumeBarExpanded.value = volumeBar.value;
    const percentEl = document.getElementById('volumePercentageExpanded');
    if (percentEl) {
      percentEl.textContent = volumeBar.value + '%';
    }
  });
  
  // Sincronizar al cambiar volumen expandido
  volumeBarExpanded.addEventListener('input', () => {
    volumeBar.value = volumeBarExpanded.value;
    updateVolume(volumeBarExpanded.value);
  });
}

// Función para actualizar fondo con blur dinámico
function updatePlayerBackground(imageUrl) {
  const bgBlur = document.getElementById('playerBgBlur');
  if (bgBlur && imageUrl) {
    bgBlur.style.backgroundImage = `url(${imageUrl})`;
  }
}

// Función para sincronizar iconos de play/pause
function syncPlayButtons(isPlaying) {
  const playBtnIcon = document.getElementById('playBtn');
  const playBtnExpandedIcon = document.getElementById('playBtnExpanded');
  const playCircle = document.querySelector('.play-btn-circle');
  
  if (isPlaying) {
    if (playBtnIcon) playBtnIcon.textContent = 'pause';
    if (playBtnExpandedIcon) playBtnExpandedIcon.textContent = 'pause';
    if (playCircle) playCircle.classList.remove('paused');
  } else {
    if (playBtnIcon) playBtnIcon.textContent = 'play_arrow';
    if (playBtnExpandedIcon) playBtnExpandedIcon.textContent = 'play_arrow';
    if (playCircle) playCircle.classList.add('paused');
  }
}

// Modificar función playPause para sincronizar
const originalPlayPause = window.playPause;
window.playPause = function(e) {
  if (typeof originalPlayPause === 'function') {
    originalPlayPause(e);
  } else {
    if (audio.paused) {
      audio.play()
        .then(() => {
          syncPlayButtons(true);
          setEqualizer();
        })
        .catch((err) => {
          console.error('Error al reproducir:', err);
          syncPlayButtons(false);
        });
    } else {
      audio.pause();
      syncPlayButtons(false);
      setEqualizer(true);
    }
  }
};

// Actualizar información expandida cuando cambia la radio
function updateExpandedInfo(data) {
  const nameExpanded = document.getElementById('nameExpanded');
  const categoryExpanded = document.getElementById('categoryExpanded');
  
  if (nameExpanded) {
    nameExpanded.textContent = data.nombre || 'Sin nombre';
  }
  
  if (categoryExpanded) {
    let info = '';
    if (data.ciudad) info += data.ciudad;
    if (data.region && data.region !== data.ciudad) {
      info += (info ? ' • ' : '') + data.region;
    }
    categoryExpanded.textContent = info || 'Sin información';
  }
  
  // Actualizar fondo blur
  updatePlayerBackground(data.imagen);
}

// Función para mostrar mensaje de error
function showErrorMessage(message) {
  nameEl.textContent = message;
  category.textContent = 'Intenta con otra emisora';
  category.style.color = 'rgba(255, 255, 255, 0.7)';
}

// Función para restaurar información normal
function restoreNormalInfo() {
  category.style.color = '';
}

// Escuchar eventos de reproducción
audio.addEventListener('play', () => {
  syncPlayButtons(true);
  restoreNormalInfo();
});
audio.addEventListener('pause', () => syncPlayButtons(false));
audio.addEventListener('ended', () => syncPlayButtons(false));

// Escuchar errores de audio
audio.addEventListener('error', (e) => {
  console.error('Error de audio:', e);
  syncPlayButtons(false);
  showErrorMessage('Emisora no Disponible');
  
  // Si hay HLS activo, también destruirlo
  if (hls) {
    hls.destroy();
    hls = null;
  }
});
