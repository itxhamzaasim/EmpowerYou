// Supabase database utility for permanent cloud storage
const { createClient } = require('@supabase/supabase-js');

let supabaseClient = null;

function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase credentials not found. Using fallback storage.');
    return null;
  }

  try {
    supabaseClient = createClient(supabaseUrl, supabaseKey);
    return supabaseClient;
  } catch (error) {
    console.error('Failed to create Supabase client:', error);
    return null;
  }
}

// Supabase-compatible database wrapper
function getSupabaseDatabase() {
  const client = getSupabaseClient();
  if (!client) return null;

  return {
    run: function(query, params, callback) {
      // Handle INSERT
      if (query.includes('INSERT INTO submissions')) {
        const [name, email, course, message] = params;
        
        client
          .from('submissions')
          .insert([
            {
              name: name,
              email: email,
              course: course,
              message: message || '',
            }
          ])
          .select()
          .then(({ data, error }) => {
            if (error) {
              console.error('Supabase INSERT error:', error);
              if (callback) {
                const mockThis = { lastID: null, changes: 0 };
                callback.call(mockThis, error);
              }
              return;
            }
            
            if (callback && data && data.length > 0) {
              const mockThis = { lastID: data[0].id, changes: 1 };
              callback.call(mockThis, null);
            }
          })
          .catch((error) => {
            console.error('Supabase INSERT exception:', error);
            if (callback) {
              const mockThis = { lastID: null, changes: 0 };
              callback.call(mockThis, error);
            }
          });
      }
      // Handle DELETE
      else if (query.includes('DELETE FROM submissions WHERE id')) {
        const id = params[0];
        
        client
          .from('submissions')
          .delete()
          .eq('id', id)
          .then(({ data, error }) => {
            if (error) {
              console.error('Supabase DELETE error:', error);
              if (callback) {
                const mockThis = { changes: 0 };
                callback.call(mockThis, error);
              }
              return;
            }
            
            // Supabase returns deleted rows in data
            const changes = data && data.length > 0 ? 1 : 0;
            if (callback) {
              const mockThis = { changes: changes };
              callback.call(mockThis, null);
            }
          })
          .catch((error) => {
            console.error('Supabase DELETE exception:', error);
            if (callback) {
              const mockThis = { changes: 0 };
              callback.call(mockThis, error);
            }
          });
      }
      else if (callback) {
        const mockThis = { changes: 0 };
        callback.call(mockThis, null);
      }
    },
    
    all: function(query, params, callback) {
      // Handle SELECT
      if (query.includes('SELECT * FROM submissions')) {
        client
          .from('submissions')
          .select('*')
          .order('created_at', { ascending: false })
          .then(({ data, error }) => {
            if (error) {
              console.error('Supabase SELECT error:', error);
              if (callback) callback(error, null);
              return;
            }
            
            if (callback) callback(null, data || []);
          })
          .catch((error) => {
            console.error('Supabase SELECT exception:', error);
            if (callback) callback(error, null);
          });
      } else if (callback) {
        callback(null, []);
      }
    }
  };
}

module.exports = { getSupabaseClient, getSupabaseDatabase };

