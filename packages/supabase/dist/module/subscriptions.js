/**
 * Gets the current subscription with its associated plan and payment info
 */
export const getCurrentSubscription = async ({ supabase, subscriberType, subscriberId, }) => {
    const { data: subscription, error } = await supabase
        .from('subscriptions')
        .select(`
      *,
      payment_account:payment_provider_accounts!payment_account_id (
        id,
        provider_id,
        owner_type,
        owner_id,
        provider_customer_id,
        provider_data,
        is_default,
        created_at,
        updated_at
      ),
      plan:subscription_plans (
        id,
        name,
        type,
        features,
        monthly_credits,
        max_team_members,
        max_clients,
        stripe_price_id,
        is_active,
        created_at,
        updated_at
      )
    `)
        .eq('subscriber_type', subscriberType)
        .eq('subscriber_id', subscriberId)
        .single();
    if (error)
        throw error;
    if (!subscription)
        return null;
    const result = subscription;
    const { plan_id: _, ...subscriptionWithoutPlanId } = result;
    return {
        ...subscriptionWithoutPlanId,
        plan: result.plan,
        payment_account: result.payment_account,
    };
};
/**
 * Creates a new subscription record
 */
export const createSubscription = async ({ supabase, subscriberType, subscriberId, planId, paymentAccountId, providerSubscriptionId, providerData = {}, status, trialEndsAt, currentPeriodStart, currentPeriodEnd, }) => {
    const { data, error } = await supabase
        .from('subscriptions')
        .insert({
        subscriber_type: subscriberType,
        subscriber_id: subscriberId,
        plan_id: planId,
        payment_account_id: paymentAccountId,
        provider_subscription_id: providerSubscriptionId,
        provider_data: providerData,
        status,
        trial_ends_at: trialEndsAt,
        current_period_start: currentPeriodStart,
        current_period_end: currentPeriodEnd,
        next_credit_allocation_at: new Date().toISOString(),
    })
        .select()
        .single();
    if (error)
        throw error;
    return data;
};
/**
 * Updates a subscription's properties
 */
export const updateSubscription = async ({ supabase, id, planId, status, trialEndsAt, nextCreditAllocationAt, currentPeriodStart, currentPeriodEnd, cancelAtPeriodEnd, providerData, }) => {
    const updates = {};
    if (planId !== undefined)
        updates.plan_id = planId;
    if (status !== undefined)
        updates.status = status;
    if (trialEndsAt !== undefined)
        updates.trial_ends_at = trialEndsAt;
    if (nextCreditAllocationAt !== undefined)
        updates.next_credit_allocation_at = nextCreditAllocationAt;
    if (currentPeriodStart !== undefined)
        updates.current_period_start = currentPeriodStart;
    if (currentPeriodEnd !== undefined)
        updates.current_period_end = currentPeriodEnd;
    if (cancelAtPeriodEnd !== undefined)
        updates.cancel_at_period_end = cancelAtPeriodEnd;
    if (providerData !== undefined)
        updates.provider_data = providerData;
    const { data, error } = await supabase
        .from('subscriptions')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
    if (error)
        throw error;
    return data;
};
/**
 * Checks if a subscription is in trial period
 */
export const isInTrialPeriod = (subscription) => {
    if (!subscription.trial_ends_at)
        return false;
    return new Date(subscription.trial_ends_at) > new Date();
};
/**
 * Checks if a subscription is active (including trial period)
 */
export const isSubscriptionActive = (subscription) => {
    if (subscription.status !== 'active')
        return false;
    if (subscription.trial_ends_at) {
        return isInTrialPeriod(subscription);
    }
    return true;
};
/**
 * Gets subscription by provider subscription ID
 */
export const getSubscriptionByProviderId = async ({ supabase, providerSubscriptionId, }) => {
    const { data, error } = await supabase
        .from('subscriptions')
        .select()
        .eq('provider_subscription_id', providerSubscriptionId)
        .single();
    if (error)
        throw error;
    return data;
};
