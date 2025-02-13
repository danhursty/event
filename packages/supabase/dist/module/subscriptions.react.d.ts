import { type UseQueryOptions } from '@tanstack/react-query';
import type { SubscriberType } from '../types';
import { type Subscription, type SubscriptionWithPlan, isInTrialPeriod, isSubscriptionActive } from './subscriptions';
import type { QueryEnabledProps, SupabaseProps } from '../types/react-query';
/**
 * Custom error class for handling subscription-related errors with additional context
 *
 * @example
 * ```ts
 * // Create a new error
 * const error = new SubscriptionError('Subscription not found', 'NOT_FOUND', 404)
 *
 * // Convert from unknown error
 * try {
 *   await someOperation()
 * } catch (err) {
 *   throw SubscriptionError.fromError(err, 'OPERATION_ERROR')
 * }
 * ```
 */
export declare class SubscriptionError extends Error {
    readonly code?: string | undefined;
    readonly status?: number | undefined;
    constructor(message: string, code?: string | undefined, status?: number | undefined);
    static fromError(err: unknown, code?: string, status?: number): SubscriptionError;
}
type BaseKey = ['subscriptions'];
type CurrentKey = [...BaseKey, 'current', SubscriberType, string];
type ProviderKey = [...BaseKey, 'provider', string];
/**
 * Query key factory for subscriptions with proper type safety
 *
 * @example
 * ```ts
 * // Get base key
 * const baseKey = subscriptionKeys.all() // ['subscriptions']
 *
 * // Get current subscription key
 * const currentKey = subscriptionKeys.current({
 *   subscriberType: 'organization',
 *   subscriberId: '123'
 * })
 *
 * // Get provider subscription key
 * const providerKey = subscriptionKeys.provider({
 *   providerSubscriptionId: 'sub_123'
 * })
 * ```
 */
export declare const subscriptionKeys: {
    readonly all: () => BaseKey;
    readonly current: ({ subscriberType, subscriberId, }: {
        subscriberType: SubscriberType;
        subscriberId: string;
    }) => CurrentKey;
    readonly provider: ({ providerSubscriptionId, }: {
        providerSubscriptionId: string;
    }) => ProviderKey;
};
type GetCurrentSubscriptionParams = SupabaseProps & {
    subscriberType: SubscriberType;
    subscriberId: string;
} & QueryEnabledProps;
/**
 * Query options factory for subscription queries with error handling
 *
 * @example
 * ```ts
 * // Use in a custom query
 * const { data } = useQuery({
 *   ...subscriptionQueries.current({
 *     supabase,
 *     subscriberType: 'organization',
 *     subscriberId: '123'
 *   })
 * })
 * ```
 */
export declare const subscriptionQueries: {
    current: ({ supabase, subscriberType, subscriberId, }: Omit<GetCurrentSubscriptionParams, "enabled">) => UseQueryOptions<SubscriptionWithPlan, SubscriptionError>;
    provider: ({ supabase, providerSubscriptionId, }: SupabaseProps & {
        providerSubscriptionId: string;
    }) => UseQueryOptions<Subscription, SubscriptionError>;
};
/**
 * React hook to fetch the current subscription with type safety and error handling
 *
 * @example
 * ```ts
 * // Basic usage
 * const { data, error } = useGetCurrentSubscription({
 *   supabase,
 *   subscriberType: 'organization',
 *   subscriberId: '123'
 * })
 *
 * // With enabled flag
 * const { data, error } = useGetCurrentSubscription({
 *   supabase,
 *   subscriberType: 'organization',
 *   subscriberId: '123',
 *   enabled: isReady
 * })
 * ```
 */
export declare const useGetCurrentSubscription: ({ supabase, subscriberType, subscriberId, enabled, }: GetCurrentSubscriptionParams) => any;
type GetSubscriptionByProviderParams = SupabaseProps & {
    providerSubscriptionId: string;
} & QueryEnabledProps;
/**
 * React hook to fetch a subscription by provider ID with type safety and error handling
 *
 * @example
 * ```ts
 * const { data, error } = useGetSubscriptionByProvider({
 *   supabase,
 *   providerSubscriptionId: 'sub_123'
 * })
 * ```
 */
export declare const useGetSubscriptionByProvider: ({ supabase, providerSubscriptionId, enabled, }: GetSubscriptionByProviderParams) => any;
/**
 * React hook to create a new subscription with optimistic updates and error handling
 *
 * @example
 * ```ts
 * const mutation = useCreateSubscription({ supabase })
 *
 * // Create subscription
 * mutation.mutate({
 *   subscriberType: 'organization',
 *   subscriberId: '123',
 *   planId: 'plan_456',
 *   paymentAccountId: 'pay_789',
 *   providerSubscriptionId: 'sub_abc',
 *   status: 'active'
 * })
 * ```
 */
export declare const useCreateSubscription: ({ supabase }: SupabaseProps) => any;
/**
 * React hook to update a subscription with optimistic updates and error handling
 *
 * @example
 * ```ts
 * const mutation = useUpdateSubscription({ supabase })
 *
 * // Update subscription
 * mutation.mutate({
 *   id: '123',
 *   subscriberType: 'organization',
 *   subscriberId: '456',
 *   status: 'active',
 *   planId: 'new_plan_id'
 * })
 * ```
 */
export declare const useUpdateSubscription: ({ supabase }: SupabaseProps) => any;
export { isInTrialPeriod, isSubscriptionActive };
//# sourceMappingURL=subscriptions.react.d.ts.map