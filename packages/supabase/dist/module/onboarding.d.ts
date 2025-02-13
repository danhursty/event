import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';
import type { Json } from '../types';
import { createOAuthState, verifyOAuthState } from './oauth';
type OnboardingStep = 'signup_completed' | 'google_connected' | 'gsc_connected' | 'first_project_created' | 'first_site_added' | 'first_crawl_completed' | 'subscription_selected';
type UserOnboarding = Database['public']['Tables']['user_onboarding']['Row'];
/**
 * Retrieves the onboarding status and progress for a user.
 *
 * @example
 * ```typescript
 * const onboarding = await getUserOnboarding({
 *   supabase,
 *   userId: 'user_123'
 * });
 * console.log(onboarding.current_step); // 'google_connected'
 * console.log(onboarding.completed_steps); // ['signup_completed', 'google_connected']
 * ```
 */
declare const getUserOnboarding: ({ supabase, userId, }: {
    supabase: SupabaseClient<Database>;
    userId: string;
}) => Promise<{
    completed_steps: Database["public"]["Enums"]["onboarding_step"][] | null;
    created_at: string;
    current_step: Database["public"]["Enums"]["onboarding_step"];
    id: string;
    is_completed: boolean | null;
    metadata: import("../database.types").Json | null;
    updated_at: string;
    user_id: string | null;
}>;
/**
 * Updates the onboarding progress for a user by marking steps as completed.
 *
 * @example
 * ```typescript
 * // Mark Google connection step as completed
 * const updatedOnboarding = await updateOnboardingStep({
 *   supabase,
 *   userId: 'user_123',
 *   currentStep: 'google_connected',
 *   metadata: {
 *     accountEmail: 'user@example.com',
 *     scopes: ['analytics.readonly']
 *   }
 * });
 *
 * // Complete onboarding process
 * const completed = await updateOnboardingStep({
 *   supabase,
 *   userId: 'user_123',
 *   currentStep: 'subscription_selected',
 *   isCompleted: true,
 *   metadata: { plan: 'pro' }
 * });
 * ```
 */
declare const updateOnboardingStep: ({ supabase, userId, currentStep, isCompleted, metadata, }: {
    supabase: SupabaseClient<Database>;
    userId: string;
    currentStep: OnboardingStep;
    isCompleted?: boolean;
    metadata?: Json;
}) => Promise<{
    completed_steps: Database["public"]["Enums"]["onboarding_step"][] | null;
    created_at: string;
    current_step: Database["public"]["Enums"]["onboarding_step"];
    id: string;
    is_completed: boolean | null;
    metadata: import("../database.types").Json | null;
    updated_at: string;
    user_id: string | null;
}>;
export { getUserOnboarding, updateOnboardingStep, createOAuthState, verifyOAuthState, };
export type { OnboardingStep, UserOnboarding };
//# sourceMappingURL=onboarding.d.ts.map