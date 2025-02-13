import { createOAuthState, verifyOAuthState } from './oauth';
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
const getUserOnboarding = async ({ supabase, userId, }) => {
    const { data, error } = await supabase
        .from('user_onboarding')
        .select()
        .eq('user_id', userId)
        .single();
    if (error)
        throw error;
    return data;
};
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
const updateOnboardingStep = async ({ supabase, userId, currentStep, isCompleted = false, metadata = {}, }) => {
    const { data: existing } = await supabase
        .from('user_onboarding')
        .select('completed_steps')
        .eq('user_id', userId)
        .single();
    const completedSteps = existing?.completed_steps || [];
    if (!completedSteps.includes(currentStep)) {
        completedSteps.push(currentStep);
    }
    const { data, error } = await supabase
        .from('user_onboarding')
        .upsert({
        user_id: userId,
        current_step: currentStep,
        completed_steps: completedSteps,
        is_completed: isCompleted,
        metadata,
    }, {
        onConflict: 'user_id',
    })
        .select()
        .single();
    if (error)
        throw error;
    return data;
};
export { getUserOnboarding, updateOnboardingStep, createOAuthState, verifyOAuthState, };
