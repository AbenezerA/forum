import { createClient } from '@supabase/supabase-js'

const URL = 'https://exxkstjnlnhennuupvue.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4eGtzdGpubG5oZW5udXVwdnVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA4ODczNTMsImV4cCI6MTk5NjQ2MzM1M30.UzWJt9--e9AZjvHUrIvbywM9OVoDMlAD9l9AdGaLLtA';

export const supabase = createClient(URL, API_KEY);
