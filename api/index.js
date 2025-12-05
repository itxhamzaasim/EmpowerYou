// This file helps Vercel detect the API folder
module.exports = async (req, res) => {
  return res.json({ 
    message: 'EmpowerYou API',
    endpoints: [
      '/api/contact',
      '/api/admin/submissions',
      '/api/health'
    ]
  });
};

