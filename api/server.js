const express = require('express');
const cors = require('cors');
const http = require('http');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS para todas las peticiones
app.use(cors());
app.use(express.json());

// Ruta de health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Radio Metadata API v1.0',
    endpoints: {
      metadata: '/metadata?url=STREAM_URL'
    }
  });
});

// Función para parsear metadatos ICY
function parseIcyMetadata(metadata) {
  const result = {};
  
  // Buscar StreamTitle
  const titleMatch = metadata.match(/StreamTitle='([^']*)'/);
  if (titleMatch && titleMatch[1]) {
    const title = titleMatch[1];
    
    // Intentar separar artista y canción
    if (title.includes(' - ')) {
      const parts = title.split(' - ');
      result.artist = parts[0].trim();
      result.title = parts[1].trim();
    } else {
      result.title = title.trim();
      result.artist = '';
    }
  }
  
  // Buscar StreamUrl
  const urlMatch = metadata.match(/StreamUrl='([^']*)'/);
  if (urlMatch && urlMatch[1]) {
    result.url = urlMatch[1];
  }
  
  return result;
}

// Endpoint para obtener metadatos de un stream
app.get('/metadata', async (req, res) => {
  const streamUrl = req.query.url;
  
  if (!streamUrl) {
    return res.status(400).json({ 
      error: 'Falta el parámetro "url"',
      example: '/metadata?url=https://stream.example.com/radio'
    });
  }
  
  try {
    const url = new URL(streamUrl);
    const client = url.protocol === 'https:' ? https : http;
    
    const options = {
      method: 'GET',
      headers: {
        'Icy-MetaData': '1',
        'User-Agent': 'Mozilla/5.0'
      }
    };
    
    const request = client.request(streamUrl, options, (response) => {
      const icyMetaInt = parseInt(response.headers['icy-metaint']);
      
      if (!icyMetaInt) {
        // El stream no soporta metadatos ICY
        return res.json({
          supported: false,
          message: 'Este stream no proporciona metadatos ICY',
          headers: {
            name: response.headers['icy-name'] || '',
            genre: response.headers['icy-genre'] || '',
            bitrate: response.headers['icy-br'] || ''
          }
        });
      }
      
      let dataReceived = 0;
      let metadataReceived = false;
      
      response.on('data', (chunk) => {
        if (metadataReceived) {
          request.destroy();
          return;
        }
        
        dataReceived += chunk.length;
        
        if (dataReceived >= icyMetaInt) {
          // Calcular posición de metadatos
          const metaStart = icyMetaInt;
          const metaLength = chunk[metaStart] * 16;
          
          if (metaLength > 0) {
            const metaData = chunk.slice(metaStart + 1, metaStart + 1 + metaLength).toString('utf8');
            const parsed = parseIcyMetadata(metaData);
            
            res.json({
              supported: true,
              metadata: {
                artist: parsed.artist || '',
                title: parsed.title || '',
                url: parsed.url || ''
              },
              stream: {
                name: response.headers['icy-name'] || '',
                genre: response.headers['icy-genre'] || '',
                bitrate: response.headers['icy-br'] || '',
                description: response.headers['icy-description'] || ''
              },
              timestamp: new Date().toISOString()
            });
            
            metadataReceived = true;
            request.destroy();
          }
        }
      });
      
      response.on('error', (err) => {
        res.status(500).json({ 
          error: 'Error leyendo el stream',
          details: err.message 
        });
        request.destroy();
      });
      
      // Timeout de 10 segundos
      setTimeout(() => {
        if (!metadataReceived) {
          request.destroy();
          res.status(408).json({ 
            error: 'Timeout: no se pudieron obtener metadatos en 10 segundos' 
          });
        }
      }, 10000);
    });
    
    request.on('error', (err) => {
      res.status(500).json({ 
        error: 'Error conectando al stream',
        details: err.message 
      });
    });
    
    request.end();
    
  } catch (error) {
    res.status(500).json({ 
      error: 'Error procesando la petición',
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🎵 Radio Metadata API corriendo en puerto ${PORT}`);
  console.log(`📡 Endpoint: http://localhost:${PORT}/metadata?url=STREAM_URL`);
});
