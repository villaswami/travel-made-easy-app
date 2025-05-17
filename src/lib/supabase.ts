
import { createClient } from '@supabase/supabase-js';

// Your Supabase URL and anon key should be stored in environment variables
// For this demo, we'll use placeholder values that will be replaced with actual values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
