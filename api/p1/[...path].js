export default async function handler(req, res) {
  const { path } = req.query;
  const pathArray = Array.isArray(path) ? path : [path];
  const targetPath = pathArray.join('/');

  const targetUrl = `https://wealthm-ai-api.waiker.ai/${targetPath}`;

  try {
    console.log('🔄 P1 프록시 요청:', {
      method: req.method,
      targetUrl,
      body: req.body,
    });

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...req.headers,
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();

    console.log('✅ P1 프록시 성공:', {
      status: response.status,
      targetUrl,
    });

    // CORS 헤더 설정
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With'
    );

    res.status(response.status).json(data);
  } catch (error) {
    console.error('❌ P1 프록시 실패:', error);
    res.status(500).json({ error: 'Proxy error', message: error.message });
  }
}
