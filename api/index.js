// Root API endpoint - helps Vercel detect the API folder
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  return res.json({ 
    message: 'EmpowerYou API',
    endpoints: [
      '/api/contact - POST',
      '/api/admin/submissions - GET, DELETE',
      '/api/health - GET'
    ],
    status: 'OK'
  });
};


