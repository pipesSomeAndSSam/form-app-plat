// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ooaxljqjldbzizzckmog.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vYXhsanFqbGRieml6emNrbW9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MjA2NDEsImV4cCI6MjA1NzE5NjY0MX0.BF3YBgBnd30g6sSDIrHmStfvA1JdcAiDIanMjFA3Bzo'; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseKey);