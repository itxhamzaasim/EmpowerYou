module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  return res.json({ 
    status: 'OK', 
    message: 'Server is running',
    db: 'sqlite',
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL ? 'vercel' : 'local'
  });
};



