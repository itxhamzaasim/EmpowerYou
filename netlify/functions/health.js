exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status: 'OK',
      message: 'Server is running',
      db: 'sqlite',
      timestamp: new Date().toISOString(),
      environment: process.env.NETLIFY ? 'netlify' : 'local',
    }),
  };
};

