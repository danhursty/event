import { useMutation, useQuery, useQueryClient, } from '@tanstack/react-query';
import { createSubscription, getCurrentSubscription, getSubscriptionByProviderId, isInTrialPeriod, isSubscriptionActive, updateSubscription, } from './subscriptions';
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
export class SubscriptionError extends Error {
    constructor(message, code, status) {
        super(message);
        this.code = code;
        this.status = status;
        this.name = 'SubscriptionError';
    }
    static fromError(err, code = 'UNKNOWN_ERROR', status = 500) {
        if (err instanceof Error) {
            return new SubscriptionError(err.message, err instanceof SubscriptionError ? err.code : code, err instanceof SubscriptionError ? err.status : status);
        }
        return new SubscriptionError('An unknown error occurred', code, status);
    }
}
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
export const subscriptionKeys = {
    all: () => ['subscriptions'],
    current: ({ subscriberType, subscriberId, }) => [
        ...subscriptionKeys.all(),
        'current',
        subscriberType,
        subscriberId,
    ],
    provider: ({ providerSubscriptionId, }) => [
        ...subscriptionKeys.all(),
        'provider',
        providerSubscriptionId,
    ],
};
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
export const subscriptionQueries = {
    current: ({ supabase, subscriberType, subscriberId, }) => ({
        queryKey: subscriptionKeys.current({ subscriberType, subscriberId }),
        queryFn: async () => {
            try {
                const data = await getCurrentSubscription({
                    supabase,
                    subscriberType,
                    subscriberId,
                });
                if (!data) {
                    throw new SubscriptionError('No active subscription found', 'NOT_FOUND', 404);
                }
                return data;
            }
            catch (err) {
                throw SubscriptionError.fromError(err, 'FETCH_ERROR');
            }
        },
    }),
    provider: ({ supabase, providerSubscriptionId, }) => ({
        queryKey: subscriptionKeys.provider({ providerSubscriptionId }),
        queryFn: async () => {
            try {
                const data = await getSubscriptionByProviderId({
                    supabase,
                    providerSubscriptionId,
                });
                if (!data) {
                    throw new SubscriptionError('Subscription not found for provider ID', 'NOT_FOUND', 404);
                }
                return data;
            }
            catch (err) {
                throw SubscriptionError.fromError(err, 'FETCH_ERROR');
            }
        },
    }),
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
export const useGetCurrentSubscription = ({ supabase, subscriberType, subscriberId, enabled = true, }) => {
    return useQuery({
        ...subscriptionQueries.current({ supabase, subscriberType, subscriberId }),
        enabled: Boolean(subscriberId) && enabled,
    });
};
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
export const useGetSubscriptionByProvider = ({ supabase, providerSubscriptionId, enabled = true, }) => {
    return useQuery({
        ...subscriptionQueries.provider({ supabase, providerSubscriptionId }),
        enabled: Boolean(providerSubscriptionId) && enabled,
    });
};
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
export const useCreateSubscription = ({ supabase }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ subscriberType, subscriberId, planId, paymentAccountId, providerSubscriptionId, providerData, status, trialEndsAt, currentPeriodStart, currentPeriodEnd, }) => {
            try {
                return await createSubscription({
                    supabase,
                    subscriberType,
                    subscriberId,
                    planId,
                    paymentAccountId,
                    providerSubscriptionId,
                    providerData,
                    status,
                    trialEndsAt,
                    currentPeriodStart,
                    currentPeriodEnd,
                });
            }
            catch (err) {
                throw SubscriptionError.fromError(err, 'CREATE_ERROR');
            }
        },
        onSuccess: (_, { subscriberType, subscriberId }) => {
            void queryClient.invalidateQueries({
                queryKey: subscriptionKeys.current({ subscriberType, subscriberId }),
            });
        },
    });
};
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
export const useUpdateSubscription = ({ supabase }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, planId, status, trialEndsAt, nextCreditAllocationAt, currentPeriodStart, currentPeriodEnd, cancelAtPeriodEnd, providerData, }) => {
            try {
                return await updateSubscription({
                    supabase,
                    id,
                    planId,
                    status,
                    trialEndsAt,
                    nextCreditAllocationAt,
                    currentPeriodStart,
                    currentPeriodEnd,
                    cancelAtPeriodEnd,
                    providerData,
                });
            }
            catch (err) {
                throw SubscriptionError.fromError(err, 'UPDATE_ERROR');
            }
        },
        onMutate: async ({ subscriberType, subscriberId, ...updates }) => {
            await queryClient.cancelQueries({
                queryKey: subscriptionKeys.current({ subscriberType, subscriberId }),
            });
            const previousData = queryClient.getQueryData(subscriptionKeys.current({ subscriberType, subscriberId }));
            if (previousData) {
                const updatedData = {
                    ...previousData,
                    ...updates,
                    plan: updates.planId && previousData.plan
                        ? {
                            ...previousData.plan,
                            id: updates.planId,
                        }
                        : previousData.plan,
                };
                queryClient.setQueryData(subscriptionKeys.current({ subscriberType, subscriberId }), updatedData);
            }
            return { previousData };
        },
        onError: (err, { subscriberType, subscriberId }, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(subscriptionKeys.current({ subscriberType, subscriberId }), context.previousData);
            }
        },
        onSuccess: (_, { subscriberType, subscriberId }) => {
            void queryClient.invalidateQueries({
                queryKey: subscriptionKeys.current({ subscriberType, subscriberId }),
            });
        },
    });
};
// Re-export utility functions for convenience
export { isInTrialPeriod, isSubscriptionActive };
