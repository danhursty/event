import { z } from "zod";

// Base environment variables (shared between services)
export const baseEnvSchema = z.object({
  // OpenAI
  OPENAI_API_KEY: z.string(),

  // Internal API
  INTERNAL_API_KEY: z.string(),

  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  NEXT_PUBLIC_SITE_URL: z.string().url(),

  // Email (Resend)
  RESEND_API_KEY: z.string(),

  // Google Auth
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),

  // Stripe
  NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  NEXT_PUBLIC_STRIPE_PRICE_ID_SINGLE_PAYMENT: z.string(),
  NEXT_PUBLIC_STRIPE_PRICE_ID_SINGLE_PAYMENT_SECONDARY: z.string(),
  NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY_SUBSCRIPTION: z.string(),

  // Sentry
  SENTRY_AUTH_TOKEN: z.string(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url(),
  NEXT_PUBLIC_SENTRY_ORG: z.string(),
  NEXT_PUBLIC_SENTRY_PROJECT: z.string(),

  // KV (Rate Limiting)
  KV_URL: z.string().url(),
  KV_REST_API_READ_ONLY_TOKEN: z.string(),
  KV_REST_API_TOKEN: z.string(),
  KV_REST_API_URL: z.string().url(),
});

// Express-specific environment variables
export const expressEnvSchema = z.object({
  PORT: z.coerce.number().default(3001),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  STRIPE_SECRET_KEY: z.string(),
});

// Combined environment schema
export const envSchema = expressEnvSchema.merge(baseEnvSchema);

// Infer types from schemas
export type BaseEnvironment = z.infer<typeof baseEnvSchema>;
export type ExpressEnvironment = z.infer<typeof expressEnvSchema>;
export type Environment = z.infer<typeof envSchema>;

// Validate environment
export function validateEnv(): Environment {
  const env = process.env;
  try {
    return envSchema.parse(env);
  } catch (error) {
    console.error("❌ Invalid environment variables:", error);
    process.exit(1);
  }
}
