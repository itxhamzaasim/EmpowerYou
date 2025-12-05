const { getDatabase } = require('../../api/db');

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }

  // Check admin password
  const adminPass = process.env.ADMIN_PASS || 'empoweryou123';
  const queryParams = event.queryStringParameters || {};
  const providedPass = queryParams.admin_pass;

  if (providedPass !== adminPass) {
    return {
      statusCode: 401,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        message: 'Unauthorized',
      }),
    };
  }

  const database = getDatabase();
  if (!database) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        message: 'Database connection failed',
      }),
    };
  }

  // GET - List all submissions
  if (event.httpMethod === 'GET') {
    return new Promise((resolve) => {
      database.all(
        'SELECT * FROM submissions ORDER BY created_at DESC',
        (err, rows) => {
          if (err) {
            console.error('DB Error:', err);
            resolve({
              statusCode: 500,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                success: false,
                message: 'Database error',
              }),
            });
            return;
          }
          resolve({
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              success: true,
              submissions: rows || [],
            }),
          });
        }
      );
    });
  }
  // DELETE - Delete a submission
  else if (event.httpMethod === 'DELETE') {
    const id = parseInt(queryParams.id);
    if (!id) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success: false,
          message: 'Submission ID required',
        }),
      };
    }

    return new Promise((resolve) => {
      database.run('DELETE FROM submissions WHERE id = ?', [id], function (err) {
        if (err) {
          console.error('DB Error:', err);
          resolve({
            statusCode: 500,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              success: false,
              message: 'Database error',
            }),
          });
          return;
        }
        if (this.changes === 0) {
          resolve({
            statusCode: 404,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              success: false,
              message: 'Submission not found',
            }),
          });
          return;
        }
        console.log(`✓ Deleted submission ID: ${id}`);
        resolve({
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            success: true,
            message: 'Submission deleted successfully',
          }),
        });
      });
    });
  } else {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        message: 'Method not allowed',
      }),
    };
  }
};

