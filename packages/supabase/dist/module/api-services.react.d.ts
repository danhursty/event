import type { QueryEnabledProps, SupabaseProps } from '../types/react-query';
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
export declare class ApiServiceError extends Error {
    readonly code?: string | undefined;
    readonly status?: number | undefined;
    constructor(message: string, code?: string | undefined, status?: number | undefined);
    static fromError(err: unknown, code?: string, status?: number): ApiServiceError;
}
type BaseKey = ['api-services'];
type ListKey = [...BaseKey, 'list', {
    filters: Record<string, unknown>;
}];
type DetailKey = [...BaseKey, 'detail', string];
type QuotasKey = [...BaseKey, 'quotas', string];
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
export declare const apiServiceKeys: {
    readonly all: () => BaseKey;
    readonly lists: () => readonly ["api-services", "list"];
    readonly list: ({ filters }: {
        filters: Record<string, unknown>;
    }) => ListKey;
    readonly details: () => readonly ["api-services", "detail"];
    readonly detail: ({ id }: {
        id: string;
    }) => DetailKey;
    readonly quotas: () => readonly ["api-services", "quotas"];
    readonly userQuotas: ({ userId }: {
        userId: string;
    }) => QuotasKey;
};
type ApiServiceQueryParams = SupabaseProps & {
    userId?: string;
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
export declare const apiServiceQueries: {
    list: ({ supabase }: ApiServiceQueryParams) => {
        queryKey: readonly ["api-services", "list"];
        queryFn: QueryFunction<{
            created_at: string;
            default_daily_quota: number;
            default_queries_per_second: number;
            description: string | null;
            id: string;
            name: string;
            updated_at: string;
        }[]>;
    };
    userQuotas: ({ supabase, userId }: Required<ApiServiceQueryParams>) => {
        queryKey: ["api-services", "quotas", string];
        queryFn: QueryFunction<{
            created_at: string;
            daily_quota: number;
            id: string;
            queries_per_second: number;
            service_id: string | null;
            updated_at: string;
            user_id: string | null;
        }[]>;
    };
};
type GetApiServicesParams = ApiServiceQueryParams & QueryEnabledProps;
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
export declare const useGetApiServices: ({ supabase, enabled, }: GetApiServicesParams) => any;
type GetUserApiQuotasParams = Required<ApiServiceQueryParams> & QueryEnabledProps;
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
export declare const useGetUserApiQuotas: ({ supabase, userId, enabled, }: GetUserApiQuotasParams) => any;
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
export declare const useUpdateApiQuota: ({ supabase }: SupabaseProps) => any;
export {};
//# sourceMappingURL=api-services.react.d.ts.map