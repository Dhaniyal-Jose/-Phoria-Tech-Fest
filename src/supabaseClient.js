import { createClient } from '@supabase/supabase-js';

// The auth keys can be added to an .env file later. 
// For now we setup the client with empty/placeholder keys to avoid compilation errors,
// and we'll check validity before making requests.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
