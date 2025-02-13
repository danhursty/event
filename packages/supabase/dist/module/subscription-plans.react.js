import { useQuery, } from '@tanstack/react-query';
import { getSubscriptionPlans, getSubscriptionPlan, getSubscriptionPlanByStripePrice, hasPlanFeature, getPlanMonthlyCredits, getPlanMaxClients, getPlanMaxTeamMembers, isAgencyPlan, } from './subscription-plans';
/**
 * Custom error class for handling subscription plan-related errors with additional context
 *
 * @example
 * ```ts
 * // Create a new error
 * const error = new SubscriptionPlanError('Plan not found', 'NOT_FOUND', 404)
 *
 * // Convert from unknown error
 * try {
 *   await someOperation()
 * } catch (err) {
 *   throw SubscriptionPlanError.fromError(err, 'OPERATION_ERROR')
 * }
 * ```
 */
export class SubscriptionPlanError extends Error {
    constructor(message, code, status) {
        super(message);
        this.code = code;
        this.status = status;
        this.name = 'SubscriptionPlanError';
    }
    static fromError(err, code = 'UNKNOWN_ERROR', status = 500) {
        if (err instanceof Error) {
            return new SubscriptionPlanError(err.message, err instanceof SubscriptionPlanError ? err.code : code, err instanceof SubscriptionPlanError ? err.status : status);
        }
        return new SubscriptionPlanError('An unknown error occurred', code, status);
    }
}
/**
 * Query key factory for subscription plans with proper type safety
 *
 * @example
 * ```ts
 * // Get base key
 * const baseKey = subscriptionPlanKeys.all() // ['subscription-plans']
 *
 * // Get list key with optional type filter
 * const listKey = subscriptionPlanKeys.list({ type: 'agency' })
 *
 * // Get detail key
 * const detailKey = subscriptionPlanKeys.detail({ planId: '123' })
 *
 * // Get stripe price key
 * const stripeKey = subscriptionPlanKeys.stripePrice({ priceId: 'price_123' })
 * ```
 */
export const subscriptionPlanKeys = {
    all: () => ['subscription-plans'],
    lists: () => [...subscriptionPlanKeys.all(), 'list'],
    list: ({ type } = {}) => [
        ...subscriptionPlanKeys.lists(),
        { type },
    ],
    details: () => [...subscriptionPlanKeys.all(), 'detail'],
    detail: ({ planId }) => [
        ...subscriptionPlanKeys.details(),
        planId,
    ],
    stripePrices: () => [...subscriptionPlanKeys.all(), 'stripe-price'],
    stripePrice: ({ priceId }) => [
        ...subscriptionPlanKeys.stripePrices(),
        priceId,
    ],
};
/**
 * Query options factory for subscription plan queries with error handling
 *
 * @example
 * ```ts
 * // Use in a custom query
 * const { data } = useQuery({
 *   ...subscriptionPlanQueries.list({
 *     supabase,
 *     type: 'agency'
 *   })
 * })
 * ```
 */
export const subscriptionPlanQueries = {
    list: ({ supabase, type, }) => ({
        queryKey: subscriptionPlanKeys.list({ type }),
        queryFn: async () => {
            try {
                return await getSubscriptionPlans({ supabase, type });
            }
            catch (err) {
                throw SubscriptionPlanError.fromError(err, 'FETCH_ERROR');
            }
        },
    }),
    detail: ({ supabase, planId, }) => ({
        queryKey: subscriptionPlanKeys.detail({ planId }),
        queryFn: async () => {
            try {
                const data = await getSubscriptionPlan({ supabase, planId });
                if (!data) {
                    throw new SubscriptionPlanError('Subscription plan not found', 'NOT_FOUND', 404);
                }
                return data;
            }
            catch (err) {
                throw SubscriptionPlanError.fromError(err, 'FETCH_ERROR');
            }
        },
    }),
    stripePrice: ({ supabase, stripePriceId, }) => ({
        queryKey: subscriptionPlanKeys.stripePrice({ priceId: stripePriceId }),
        queryFn: async () => {
            try {
                const data = await getSubscriptionPlanByStripePrice({
                    supabase,
                    stripePriceId,
                });
                if (!data) {
                    throw new SubscriptionPlanError('Subscription plan not found for Stripe price', 'NOT_FOUND', 404);
                }
                return data;
            }
            catch (err) {
                throw SubscriptionPlanError.fromError(err, 'FETCH_ERROR');
            }
        },
    }),
};
/**
 * React hook to fetch subscription plans with type safety and error handling
 *
 * @example
 * ```ts
 * // Basic usage
 * const { data, error } = useGetSubscriptionPlans({
 *   supabase
 * })
 *
 * // Filter by type
 * const { data, error } = useGetSubscriptionPlans({
 *   supabase,
 *   type: 'agency'
 * })
 *
 * // With enabled flag
 * const { data, error } = useGetSubscriptionPlans({
 *   supabase,
 *   enabled: isReady
 * })
 * ```
 */
export const useGetSubscriptionPlans = ({ supabase, type, enabled = true, }) => {
    const { data, error } = useQuery({
        ...subscriptionPlanQueries.list({ supabase, type }),
        enabled,
    });
    return {
        data: data ?? [],
        error: error ?? null,
    };
};
/**
 * React hook to fetch a specific subscription plan by ID with type safety and error handling
 *
 * @example
 * ```ts
 * // Basic usage
 * const { data, error } = useGetSubscriptionPlan({
 *   supabase,
 *   planId: '123'
 * })
 *
 * // With enabled flag
 * const { data, error } = useGetSubscriptionPlan({
 *   supabase,
 *   planId: '123',
 *   enabled: isReady
 * })
 * ```
 */
export const useGetSubscriptionPlan = ({ supabase, planId, enabled = true, }) => {
    const { data, error } = useQuery({
        ...subscriptionPlanQueries.detail({ supabase, planId }),
        enabled: Boolean(planId) && enabled,
    });
    return {
        data: data ?? null,
        error: error ?? null,
    };
};
/**
 * React hook to fetch a subscription plan by Stripe price ID with type safety and error handling
 *
 * @example
 * ```ts
 * // Basic usage
 * const { data, error } = useGetSubscriptionPlanByStripePrice({
 *   supabase,
 *   stripePriceId: 'price_123'
 * })
 *
 * // With enabled flag
 * const { data, error } = useGetSubscriptionPlanByStripePrice({
 *   supabase,
 *   stripePriceId: 'price_123',
 *   enabled: isReady
 * })
 * ```
 */
export const useGetSubscriptionPlanByStripePrice = ({ supabase, stripePriceId, enabled = true, }) => {
    const { data, error } = useQuery({
        ...subscriptionPlanQueries.stripePrice({ supabase, stripePriceId }),
        enabled: Boolean(stripePriceId) && enabled,
    });
    return {
        data: data ?? null,
        error: error ?? null,
    };
};
// Re-export utility functions for convenience
export { hasPlanFeature, getPlanMonthlyCredits, getPlanMaxClients, getPlanMaxTeamMembers, isAgencyPlan, };
