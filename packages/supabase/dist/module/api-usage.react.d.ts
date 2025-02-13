import { SupabaseClient } from '@supabase/supabase-js';
import { type UseQueryOptions } from '@tanstack/react-query';
import type { Database } from '../database.types';
import { type ApiQuota, type ApiUsageStats } from './api-usage';
type SupabaseProps = {
    supabase: SupabaseClient<Database>;
};
type QueryEnabledProps = {
    enabled?: boolean;
};
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
export declare class ApiUsageError extends Error {
    readonly code?: string | undefined;
    readonly status?: number | undefined;
    constructor(message: string, code?: string | undefined, status?: number | undefined);
    static fromError(err: unknown, code?: string, status?: number): ApiUsageError;
}
type BaseKey = ['api-usage'];
type StatsKey = [...BaseKey, 'stats', string];
type QuotaKey = [...BaseKey, 'quota', string, string];
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
export declare const apiUsageKeys: {
    readonly all: () => BaseKey;
    readonly stats: ({ userId }: {
        userId: string;
    }) => StatsKey;
    readonly quota: ({ userId, serviceId, }: {
        userId: string;
        serviceId: string;
    }) => QuotaKey;
};
type ApiUsageQueryParams = SupabaseProps & {
    userId: string;
};
type ApiQuotaQueryParams = ApiUsageQueryParams & {
    serviceId: string;
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
export declare const apiUsageQueries: {
    stats: ({ supabase, userId, serviceId, startDate, endDate, }: ApiUsageQueryParams & {
        serviceId: string;
        startDate: string;
        endDate: string;
    }) => UseQueryOptions<ApiUsageStats, ApiUsageError>;
    quota: ({ supabase, userId, serviceId, }: ApiUsageQueryParams & {
        serviceId: string;
    }) => UseQueryOptions<ApiQuota, ApiUsageError>;
};
type GetApiUsageStatsParams = ApiUsageQueryParams & {
    serviceId: string;
    startDate: string;
    endDate: string;
} & QueryEnabledProps;
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
export declare const useGetApiUsageStats: ({ supabase, userId, serviceId, startDate, endDate, enabled, }: GetApiUsageStatsParams) => any;
type GetApiQuotaParams = ApiQuotaQueryParams & QueryEnabledProps;
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
export declare const useGetApiQuota: ({ supabase, userId, serviceId, enabled, }: GetApiQuotaParams) => any;
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
export declare const useTrackApiUsage: ({ supabase }: SupabaseProps) => any;
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
export declare const useResetDailyUsage: ({ supabase }: SupabaseProps) => any;
export {};
//# sourceMappingURL=api-usage.react.d.ts.map