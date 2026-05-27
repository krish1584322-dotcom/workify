// ============================================================
//  WORKIFY — Supabase Configuration
//  Replace the two values below with your own project details
//  from: https://supabase.com → Project Settings → API
// ============================================================

const SUPABASE_URL  = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON = 'YOUR_ANON_PUBLIC_KEY';

// Initialise the Supabase client (loaded via CDN in each page)
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
