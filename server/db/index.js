require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Using service_role key to bypass RLS securely on the backend
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = supabase;
