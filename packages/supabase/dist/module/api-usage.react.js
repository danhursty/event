import { useMutation, useQuery, useQueryClient, } from '@tanstack/react-query';
import { checkApiQuota, getApiUsageStats, resetDailyUsage, trackApiUsage, } from './api-usage';
/**
 * Custom error class for handling API usage-related errors with additional context
 *
 * @example
 * ```ts
 * // Create a new error
 * const error = new ApiUsageError('Usage limit exceeded', 'QUOTA_EXCEEDED', 429)
 *
 * // Convert from unknown error
 * try {
 *   await someOperation()
 * } catch (err) {
 *   throw ApiUsageError.fromError(err, 'OPERATION_ERROR')
 * }
 * ```
 */
export class ApiUsageError extends Error {
    constructor(message, code, status) {
        super(message);
        this.code = code;
        this.status = status;
        this.name = 'ApiUsageError';
    }
    static fromError(err, code = 'UNKNOWN_ERROR', status = 500) {
        if (err instanceof Error) {
            return new ApiUsageError(err.message, err instanceof ApiUsageError ? err.code : code, err instanceof ApiUsageError ? err.status : status);
        }
        return new ApiUsageError('An unknown error occurred', code, status);
    }
}
/**
 * Query key factory for API usage with proper type safety
 *
 * @example
 * ```ts
 * // Get base key
 * const baseKey = apiUsageKeys.all() // ['api-usage']
 *
 * // Get stats key
 * const statsKey = apiUsageKeys.stats({ userId: '123' })
 *
 * // Get quota key
 * const quotaKey = apiUsageKeys.quota({ userId: '123', serviceId: '456' })
 * ```
 */
export const apiUsageKeys = {
    all: () => ['api-usage'],
    stats: ({ userId }) => [
        ...apiUsageKeys.all(),
        'stats',
        userId,
    ],
    quota: ({ userId, serviceId, }) => [...apiUsageKeys.all(), 'quota', userId, serviceId],
};
/**
 * Query options factory for API usage queries with error handling
 *
 * @example
 * ```ts
 * // Use in a custom query
 * const { data } = useQuery({
 *   ...apiUsageQueries.stats({
 *     supabase,
 *     userId: '123'
 *   })
 * })
 * ```
 */
export const apiUsageQueries = {
    stats: ({ supabase, userId, serviceId, startDate, endDate, }) => ({
        queryKey: apiUsageKeys.stats({ userId }),
        queryFn: async () => {
            try {
                const data = await getApiUsageStats({
                    supabase,
                    userId,
                    serviceId,
                    startDate,
                    endDate,
                });
                return data;
            }
            catch (err) {
                throw ApiUsageError.fromError(err, 'FETCH_ERROR');
            }
        },
    }),
    quota: ({ supabase, userId, serviceId, }) => ({
        queryKey: apiUsageKeys.quota({ userId, serviceId }),
        queryFn: async () => {
            try {
                const data = await checkApiQuota({ supabase, userId, serviceId });
                return data;
            }
            catch (err) {
                throw ApiUsageError.fromError(err, 'FETCH_ERROR');
            }
        },
    }),
};
/**
 * React hook to fetch API usage statistics with type safety and error handling
 *
 * @example
 * ```ts
 * // Basic usage
 * const { data, error } = useGetApiUsageStats({
 *   supabase,
 *   userId: '123'
 * })
 *
 * // With enabled flag
 * const { data, error } = useGetApiUsageStats({
 *   supabase,
 *   userId: '123',
 *   enabled: isReady
 * })
 * ```
 */
export const useGetApiUsageStats = ({ supabase, userId, serviceId, startDate, endDate, enabled = true, }) => {
    return useQuery({
        ...apiUsageQueries.stats({
            supabase,
            userId,
            serviceId,
            startDate,
            endDate,
        }),
        enabled: Boolean(userId) && Boolean(serviceId) && enabled,
    });
};
/**
 * React hook to check API quota status with type safety and error handling
 *
 * @example
 * ```ts
 * const { data, error } = useGetApiQuota({
 *   supabase,
 *   userId: '123',
 *   serviceId: '456'
 * })
 * ```
 */
export const useGetApiQuota = ({ supabase, userId, serviceId, enabled = true, }) => {
    return useQuery({
        ...apiUsageQueries.quota({ supabase, userId, serviceId }),
        enabled: Boolean(userId) && Boolean(serviceId) && enabled,
    });
};
/**
 * React hook to track API usage with optimistic updates and error handling
 *
 * @example
 * ```ts
 * const mutation = useTrackApiUsage({ supabase })
 *
 * // Track usage
 * mutation.mutate({
 *   userId: '123',
 *   serviceId: '456',
 *   requestCount: 1
 * })
 * ```
 */
export const useTrackApiUsage = ({ supabase }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ userId, serviceId, requestCount }) => {
            try {
                const result = await trackApiUsage({
                    supabase,
                    userId,
                    serviceId,
                    requestCount,
                });
                if (!result) {
                    throw new ApiUsageError('Failed to track usage', 'TRACK_FAILED');
                }
                const usage = {
                    service_id: serviceId,
                    user_id: userId,
                    daily_usage: requestCount,
                    last_request_at: new Date().toISOString(),
                    requests_per_minute: 0, // This will be updated by the server
                };
                return usage;
            }
            catch (err) {
                throw ApiUsageError.fromError(err, 'TRACK_ERROR');
            }
        },
        onMutate: async ({ userId, serviceId, requestCount }) => {
            await queryClient.cancelQueries({
                queryKey: apiUsageKeys.stats({ userId }),
            });
            const previousStats = queryClient.getQueryData(apiUsageKeys.stats({ userId }));
            if (previousStats) {
                const currentStats = {
                    ...previousStats,
                    total_requests: previousStats.total_requests + requestCount,
                    daily_average: Math.round((previousStats.daily_average * previousStats.total_requests +
                        requestCount) /
                        (previousStats.total_requests + 1)),
                    peak_usage: Math.max(previousStats.peak_usage, requestCount),
                };
                queryClient.setQueryData(apiUsageKeys.stats({ userId }), currentStats);
            }
            return { previousStats };
        },
        onError: (err, { userId }, context) => {
            if (context?.previousStats) {
                queryClient.setQueryData(apiUsageKeys.stats({ userId }), context.previousStats);
            }
        },
        onSuccess: (data, { userId, serviceId }) => {
            void queryClient.invalidateQueries({
                queryKey: apiUsageKeys.stats({ userId }),
            });
            void queryClient.invalidateQueries({
                queryKey: apiUsageKeys.quota({ userId, serviceId }),
            });
        },
    });
};
/**
 * React hook to reset daily API usage with optimistic updates and error handling
 *
 * @example
 * ```ts
 * const mutation = useResetDailyUsage({ supabase })
 *
 * // Reset usage
 * mutation.mutate({
 *   userId: '123',
 *   serviceId: '456'
 * })
 * ```
 */
export const useResetDailyUsage = ({ supabase }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ userId, serviceId }) => {
            try {
                await resetDailyUsage({ supabase, userId, serviceId });
                return null;
            }
            catch (err) {
                throw ApiUsageError.fromError(err, 'RESET_ERROR');
            }
        },
        onMutate: async ({ userId, serviceId }) => {
            await queryClient.cancelQueries({
                queryKey: apiUsageKeys.stats({ userId }),
            });
            const previousStats = queryClient.getQueryData(apiUsageKeys.stats({ userId }));
            if (previousStats) {
                const currentStats = {
                    ...previousStats,
                    daily_average: Math.round((previousStats.daily_average * (previousStats.total_requests - 1)) /
                        previousStats.total_requests),
                };
                queryClient.setQueryData(apiUsageKeys.stats({ userId }), currentStats);
            }
            return { previousStats };
        },
        onError: (err, { userId }, context) => {
            if (context?.previousStats) {
                queryClient.setQueryData(apiUsageKeys.stats({ userId }), context.previousStats);
            }
        },
        onSuccess: (_, { userId, serviceId }) => {
            void queryClient.invalidateQueries({
                queryKey: apiUsageKeys.stats({ userId }),
            });
            void queryClient.invalidateQueries({
                queryKey: apiUsageKeys.quota({ userId, serviceId }),
            });
        },
    });
};
