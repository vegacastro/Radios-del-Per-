// Vercel Serverless Function para recuperar metadata de streams de radio
// Resuelve problemas de CORS al hacer peticiones desde el cliente

const fetch = require('node-fetch');

/**
 * Función principal que maneja las peticiones
 * @param {Object} req - Request object de Vercel
 * @param {Object} res - Response object de Vercel
 */
module.exports = async (req, res) => {
  // Configurar CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Manejar preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Validar que sea GET request
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      allowedMethods: ['GET', 'OPTIONS']
    });
  }

  // Extraer URL del stream de los query parameters
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ 
      error: 'URL parameter is required',
      usage: '/api/metadata?url=<stream_url>'
    });
  }

  // Validar que sea una URL válida
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
    // Realizar petición al stream con headers específicos para metadata ICY
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Icy-MetaData': '1',
        'User-Agent': 'Radios del Perú PWA/1.0 (Metadata Fetcher)',
        'Accept': '*/*'
      },
      // Timeout para evitar conexiones colgadas
      timeout: 10000
    });

    // Extraer headers ICY (Icecast/SHOUTcast metadata)
    const icyName = response.headers.get('icy-name');
    const icyDescription = response.headers.get('icy-description');
    const icyGenre = response.headers.get('icy-genre');
    const icyBr = response.headers.get('icy-br');
    const icyUrl = response.headers.get('icy-url');
    const icyPub = response.headers.get('icy-pub');
    const icyMetaint = response.headers.get('icy-metaint');
    const contentType = response.headers.get('content-type');

    // Log para debugging
    console.log('[Metadata API] Headers received:', {
      icyName,
      icyGenre,
      icyBr,
      contentType
    });

    // Construir respuesta con metadata
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

    // Cerrar la conexión (no necesitamos descargar el stream completo)
    response.body.destroy();

    // Retornar metadata en formato JSON
    return res.status(200).json(metadata);

  } catch (error) {
    console.error('[Metadata API] Error fetching metadata:', error.message);
    
    // Manejar diferentes tipos de errores
    let errorResponse = {
      success: false,
      error: 'Error al obtener metadata',
      message: error.message,
      url: url,
      timestamp: new Date().toISOString()
    };

    // Error de timeout
    if (error.type === 'request-timeout') {
      errorResponse.error = 'Timeout al conectar con el stream';
      errorResponse.message = 'La conexión tardó demasiado tiempo';
      return res.status(504).json(errorResponse);
    }

    // Error de red
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      errorResponse.error = 'No se pudo conectar con el servidor';
      errorResponse.message = 'El stream podría estar fuera de línea';
      return res.status(503).json(errorResponse);
    }

    // Error genérico
    return res.status(500).json(errorResponse);
  }
};
