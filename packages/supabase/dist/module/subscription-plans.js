/**
 * Gets all active subscription plans
 */
export const getSubscriptionPlans = async ({ supabase, type, }) => {
    let query = supabase.from('subscription_plans').select().eq('is_active', true);
    if (type) {
        query = query.eq('type', type);
    }
    const { data, error } = await query;
    if (error)
        throw error;
    return data;
};
/**
 * Gets a specific subscription plan by ID
 */
export const getSubscriptionPlan = async ({ supabase, planId, }) => {
    const { data, error } = await supabase
        .from('subscription_plans')
        .select()
        .eq('id', planId)
        .single();
    if (error)
        throw error;
    return data;
};
/**
 * Gets a subscription plan by its Stripe price ID
 */
export const getSubscriptionPlanByStripePrice = async ({ supabase, stripePriceId, }) => {
    const { data, error } = await supabase
        .from('subscription_plans')
        .select()
        .eq('stripe_price_id', stripePriceId)
        .single();
    if (error)
        throw error;
    return data;
};
/**
 * Checks if a plan has a specific feature
 */
export const hasPlanFeature = ({ plan, feature, }) => {
    const features = plan.features;
    return features?.[feature] === true;
};
/**
 * Gets the monthly credit limit for a plan
 */
export const getPlanMonthlyCredits = ({ plan, }) => {
    return plan.monthly_credits;
};
/**
 * Gets the maximum number of clients allowed for a plan
 */
export const getPlanMaxClients = ({ plan, }) => {
    return plan.max_clients;
};
/**
 * Gets the maximum number of team members allowed for a plan
 */
export const getPlanMaxTeamMembers = ({ plan, }) => {
    return plan.max_team_members;
};
/**
 * Checks if a plan is an agency plan
 */
export const isAgencyPlan = ({ plan }) => {
    return plan.type === 'agency';
};
