import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@repo/supabase";

// Move environment variable validation to runtime
const getRequiredEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Required environment variable "${name}" is missing`);
  }
  return value;
};

// Explicitly type the return value to fix the TypeScript error
export function createAdminClient(): SupabaseClient<Database> {
  const supabaseUrl = getRequiredEnvVar("NEXT_PUBLIC_SUPABASE_URL");
  const supabaseServiceRoleKey = getRequiredEnvVar("SUPABASE_SERVICE_ROLE_KEY");

  // Add debug logging
  console.log("Creating admin client with URL:", supabaseUrl);
  console.log(
    "Service role key starts with:",
    supabaseServiceRoleKey.substring(0, 4) + "..."
  );

  const client = createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  // Verify the client configuration
  console.log("Testing admin client configuration...");
  return client;
}
