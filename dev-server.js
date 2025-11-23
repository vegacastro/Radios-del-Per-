// Servidor de desarrollo local para probar la PWA y la API
const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(__dirname));

// API endpoint para metadata (simula la función serverless de Vercel)
app.get('/api/metadata', async (req, res) => {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ 
      error: 'URL parameter is required',
      usage: '/api/metadata?url=<stream_url>'
    });
  }

  try {
    new URL(url);
  } catch (error) {
    return res.status(400).json({ 
      error: 'Invalid URL format',
      providedUrl: url
    });
  }

  console.log(`[Metadata API] Fetching metadata for: ${url}`);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Icy-MetaData': '1',
        'User-Agent': 'Radios del Perú PWA/1.0 (Metadata Fetcher)',
        'Accept': '*/*'
      },
      timeout: 10000
    });

    const icyName = response.headers.get('icy-name');
    const icyDescription = response.headers.get('icy-description');
    const icyGenre = response.headers.get('icy-genre');
    const icyBr = response.headers.get('icy-br');
    const icyUrl = response.headers.get('icy-url');
    const icyPub = response.headers.get('icy-pub');
    const icyMetaint = response.headers.get('icy-metaint');
    const contentType = response.headers.get('content-type');

    console.log('[Metadata API] Headers received:', {
      icyName,
      icyGenre,
      icyBr,
      contentType
    });

    const metadata = {
      success: true,
      station: {
        name: icyName || 'Desconocido',
        description: icyDescription || '',
        genre: icyGenre || '',
        bitrate: icyBr || '',
        url: icyUrl || '',
        isPublic: icyPub === '1',
        hasMetadata: !!icyMetaint,
        metadataInterval: icyMetaint || null
      },
      stream: {
        url: url,
        contentType: contentType || 'unknown',
        status: response.status,
        statusText: response.statusText
      },
      timestamp: new Date().toISOString()
    };

    response.body.destroy();
    return res.status(200).json(metadata);

  } catch (error) {
    console.error('[Metadata API] Error:', error.message);
    
    let errorResponse = {
      success: false,
      error: 'Error al obtener metadata',
      message: error.message,
      url: url,
      timestamp: new Date().toISOString()
    };

    if (error.type === 'request-timeout') {
      errorResponse.error = 'Timeout al conectar con el stream';
      errorResponse.message = 'La conexión tardó demasiado tiempo';
      return res.status(504).json(errorResponse);
    }

    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      errorResponse.error = 'No se pudo conectar con el servidor';
      errorResponse.message = 'El stream podría estar fuera de línea';
      return res.status(503).json(errorResponse);
    }

    return res.status(500).json(errorResponse);
  }
});

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('\n🎵 ========================================');
  console.log('   Radios del Perú - Servidor Local');
  console.log('   ========================================');
  console.log(`\n   ✅ Servidor corriendo en: http://localhost:${PORT}`);
  console.log(`   📡 API de metadata: http://localhost:${PORT}/api/metadata`);
  console.log('\n   Presiona Ctrl+C para detener el servidor\n');
});
