const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.SUPABASE_KEY ||
  '';

let supabase = null;

const isConfigured =
  supabaseUrl &&
  supabaseKey &&
  !supabaseUrl.includes('your-project') &&
  !supabaseKey.includes('your-anon');

if (isConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });
    console.log(`[Supabase] Client initialized for URL: ${supabaseUrl}`);
  } catch (err) {
    console.error('[Supabase Init Error]:', err.message);
  }
} else {
  console.warn(
    '[Supabase Notice] SUPABASE_URL or SUPABASE_KEY is missing or unconfigured in backend/.env.\nPlease add your real Supabase project credentials to backend/.env.'
  );
}

module.exports = supabase;
