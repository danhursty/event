import { useMutation, useQuery, useQueryClient, } from '@tanstack/react-query';
import { getApiServices, getUserApiQuotas, updateApiQuota, } from './api-services';
/**
 * Custom error class for handling API service-related errors with additional context
 *
 * @example
 * ```ts
 * // Create a new error
 * const error = new ApiServiceError('Service not found', 'NOT_FOUND', 404)
 *
 * // Convert from unknown error
 * try {
 *   await someOperation()
 * } catch (err) {
 *   throw ApiServiceError.fromError(err, 'OPERATION_ERROR')
 * }
 * ```
 */
export class ApiServiceError extends Error {
    constructor(message, code, status) {
        super(message);
        this.code = code;
        this.status = status;
        this.name = 'ApiServiceError';
    }
    static fromError(err, code = 'UNKNOWN_ERROR', status = 500) {
        if (err instanceof Error) {
            return new ApiServiceError(err.message, err instanceof ApiServiceError ? err.code : code, err instanceof ApiServiceError ? err.status : status);
        }
        return new ApiServiceError('An unknown error occurred', code, status);
    }
}
/**
 * Query key factory for API services with proper type safety
 *
 * @example
 * ```ts
 * // Get base key
 * const baseKey = apiServiceKeys.all() // ['api-services']
 *
 * // Get list key with filters
 * const listKey = apiServiceKeys.list({ filters: { status: 'active' } })
 *
 * // Get detail key
 * const detailKey = apiServiceKeys.detail({ id: '123' })
 *
 * // Get quotas key
 * const quotasKey = apiServiceKeys.userQuotas({ userId: '123' })
 * ```
 */
export const apiServiceKeys = {
    all: () => ['api-services'],
    lists: () => [...apiServiceKeys.all(), 'list'],
    list: ({ filters }) => [
        ...apiServiceKeys.lists(),
        { filters },
    ],
    details: () => [...apiServiceKeys.all(), 'detail'],
    detail: ({ id }) => [
        ...apiServiceKeys.details(),
        id,
    ],
    quotas: () => [...apiServiceKeys.all(), 'quotas'],
    userQuotas: ({ userId }) => [
        ...apiServiceKeys.quotas(),
        userId,
    ],
};
/**
 * Query options factory for API service queries with error handling
 *
 * @example
 * ```ts
 * // Use in a custom query
 * const { data } = useQuery({
 *   ...apiServiceQueries.list({ supabase })
 * })
 * ```
 */
export const apiServiceQueries = {
    list: ({ supabase }) => {
        const queryKey = apiServiceKeys.lists();
        const queryFn = async () => {
            try {
                const data = await getApiServices({ supabase });
                return data;
            }
            catch (err) {
                throw ApiServiceError.fromError(err, 'FETCH_ERROR');
            }
        };
        return {
            queryKey,
            queryFn,
        };
    },
    userQuotas: ({ supabase, userId }) => {
        const queryKey = apiServiceKeys.userQuotas({ userId });
        const queryFn = async () => {
            try {
                const data = await getUserApiQuotas({ supabase, userId });
                return data;
            }
            catch (err) {
                throw ApiServiceError.fromError(err, 'FETCH_ERROR');
            }
        };
        return {
            queryKey,
            queryFn,
        };
    },
};
/**
 * React hook to fetch all available API services with type safety and error handling
 *
 * @example
 * ```ts
 * // Basic usage
 * const { data, error } = useGetApiServices({
 *   supabase
 * })
 *
 * // With enabled flag
 * const { data, error } = useGetApiServices({
 *   supabase,
 *   enabled: isReady
 * })
 * ```
 */
export const useGetApiServices = ({ supabase, enabled = true, }) => {
    const query = apiServiceQueries.list({ supabase });
    return useQuery({
        ...query,
        enabled,
    });
};
/**
 * React hook to fetch API quota allocations for a user with type safety and error handling
 *
 * @example
 * ```ts
 * const { data, error } = useGetUserApiQuotas({
 *   supabase,
 *   userId: '123'
 * })
 * ```
 */
export const useGetUserApiQuotas = ({ supabase, userId, enabled = true, }) => {
    const query = apiServiceQueries.userQuotas({ supabase, userId });
    return useQuery({
        ...query,
        enabled: Boolean(userId) && enabled,
    });
};
/**
 * React hook to update API quota allocations with optimistic updates and error handling
 *
 * @example
 * ```ts
 * const mutation = useUpdateApiQuota({ supabase })
 *
 * // Update quota
 * mutation.mutate({
 *   userId: '123',
 *   serviceId: '456',
 *   dailyQuota: 1000,
 *   queriesPerSecond: 10
 * })
 * ```
 */
export const useUpdateApiQuota = ({ supabase }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ userId, serviceId, dailyQuota, queriesPerSecond, }) => {
            try {
                const data = await updateApiQuota({
                    supabase,
                    userId,
                    serviceId,
                    dailyQuota,
                    queriesPerSecond,
                });
                if (!data) {
                    throw new ApiServiceError('Failed to update quota', 'UPDATE_FAILED');
                }
                return data;
            }
            catch (err) {
                throw ApiServiceError.fromError(err, 'UPDATE_ERROR');
            }
        },
        onMutate: async ({ userId, }) => {
            const query = apiServiceQueries.userQuotas({ supabase, userId });
            await queryClient.cancelQueries({ queryKey: query.queryKey });
            const previousData = queryClient.getQueryData(query.queryKey);
            return { previousData };
        },
        onError: (err, { userId }, context) => {
            if (context?.previousData) {
                const query = apiServiceQueries.userQuotas({ supabase, userId });
                queryClient.setQueryData(query.queryKey, context.previousData);
            }
        },
        onSuccess: (data, { userId }) => {
            const quotasQuery = apiServiceQueries.userQuotas({ supabase, userId });
            const listQuery = apiServiceQueries.list({ supabase });
            void queryClient.invalidateQueries({ queryKey: quotasQuery.queryKey });
            void queryClient.invalidateQueries({ queryKey: listQuery.queryKey });
        },
    });
};
