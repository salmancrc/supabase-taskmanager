import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://gqjyzanguzequcbrsscr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdxanl6YW5ndXplcXVjYnJzc2NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4MDc4ODMsImV4cCI6MjA3NTM4Mzg4M30.N20VMweSJLkBrJMuU05K_DHv-smx6v2e8PsGHPxM9z8"
);
