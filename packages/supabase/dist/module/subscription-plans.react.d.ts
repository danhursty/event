import { type UseQueryOptions } from '@tanstack/react-query';
import { type SubscriptionPlan, type SubscriptionPlanType, hasPlanFeature, getPlanMonthlyCredits, getPlanMaxClients, getPlanMaxTeamMembers, isAgencyPlan } from './subscription-plans';
import type { SupabaseProps, QueryEnabledProps } from '../types/react-query';
type SubscriptionPlanResponse<T> = {
    data: T;
    error: SubscriptionPlanError | null;
};
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
export declare class SubscriptionPlanError extends Error {
    readonly code?: string | undefined;
    readonly status?: number | undefined;
    constructor(message: string, code?: string | undefined, status?: number | undefined);
    static fromError(err: unknown, code?: string, status?: number): SubscriptionPlanError;
}
type BaseKey = ['subscription-plans'];
type ListKey = [...BaseKey, 'list', {
    type?: SubscriptionPlanType;
}];
type DetailKey = [...BaseKey, 'detail', string];
type StripePriceKey = [...BaseKey, 'stripe-price', string];
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
export declare const subscriptionPlanKeys: {
    readonly all: () => BaseKey;
    readonly lists: () => readonly ["subscription-plans", "list"];
    readonly list: ({ type }?: {
        type?: SubscriptionPlanType;
    }) => ListKey;
    readonly details: () => readonly ["subscription-plans", "detail"];
    readonly detail: ({ planId }: {
        planId: string;
    }) => DetailKey;
    readonly stripePrices: () => readonly ["subscription-plans", "stripe-price"];
    readonly stripePrice: ({ priceId }: {
        priceId: string;
    }) => StripePriceKey;
};
type GetSubscriptionPlansParams = SupabaseProps & {
    type?: SubscriptionPlanType;
} & QueryEnabledProps;
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
export declare const subscriptionPlanQueries: {
    list: ({ supabase, type, }: Omit<GetSubscriptionPlansParams, "enabled">) => UseQueryOptions<SubscriptionPlan[], SubscriptionPlanError>;
    detail: ({ supabase, planId, }: SupabaseProps & {
        planId: string;
    }) => UseQueryOptions<SubscriptionPlan, SubscriptionPlanError>;
    stripePrice: ({ supabase, stripePriceId, }: SupabaseProps & {
        stripePriceId: string;
    }) => UseQueryOptions<SubscriptionPlan, SubscriptionPlanError>;
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
export declare const useGetSubscriptionPlans: ({ supabase, type, enabled, }: GetSubscriptionPlansParams) => SubscriptionPlanResponse<SubscriptionPlan[]>;
type GetSubscriptionPlanParams = SupabaseProps & {
    planId: string;
} & QueryEnabledProps;
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
export declare const useGetSubscriptionPlan: ({ supabase, planId, enabled, }: GetSubscriptionPlanParams) => SubscriptionPlanResponse<SubscriptionPlan | null>;
type GetSubscriptionPlanByStripePriceParams = SupabaseProps & {
    stripePriceId: string;
} & QueryEnabledProps;
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
export declare const useGetSubscriptionPlanByStripePrice: ({ supabase, stripePriceId, enabled, }: GetSubscriptionPlanByStripePriceParams) => SubscriptionPlanResponse<SubscriptionPlan | null>;
export { hasPlanFeature, getPlanMonthlyCredits, getPlanMaxClients, getPlanMaxTeamMembers, isAgencyPlan, };
//# sourceMappingURL=subscription-plans.react.d.ts.map