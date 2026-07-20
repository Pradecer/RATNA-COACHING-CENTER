import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://mbvggtozllnysjzktoys.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_7ooE_Zx6qLII4APsoh4jFQ_-7cZY16m';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Helper to check if Supabase service is reachable
export async function isSupabaseConnected(): Promise<boolean> {
  try {
    const { error } = await supabase.from('site_data').select('key').limit(1);
    // If error code is 'PGRST116' or undefined, connection works (table exists or empty)
    return !error || error.code === 'PGRST116';
  } catch (e) {
    console.warn('Supabase connection check failed:', e);
    return false;
  }
}
