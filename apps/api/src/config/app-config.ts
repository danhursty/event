import { validateEnv } from "../types/env";

const env = validateEnv();

export const config = {
  PORT: env.PORT,
  NODE_ENV: env.NODE_ENV,
  SENTRY: {
    DSN: env.NEXT_PUBLIC_SENTRY_DSN,
    ENVIRONMENT: env.NODE_ENV,
    ENABLED: env.NODE_ENV === "production",
  },
  SUPABASE: {
    URL: env.SUPABASE_URL,
    ANON_KEY: env.SUPABASE_ANON_KEY,
    SERVICE_ROLE_KEY: env.SUPABASE_SERVICE_ROLE_KEY,
  },
  STRIPE: {
    SECRET_KEY: env.STRIPE_SECRET_KEY,
  },
} as const;

export type Config = typeof config;
