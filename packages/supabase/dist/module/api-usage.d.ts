import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';
import type { DbFunctions } from '../database.functions';
import type { Json } from '../types';
type ApiUsage = DbFunctions['track_api_usage']['Returns'];
type ApiQuota = DbFunctions['check_api_quota']['Returns'];
type ApiUsageStats = DbFunctions['get_api_usage_stats']['Returns'];
/**
 * Tracks API usage for a specific user and service.
 *
 * @example
 * ```typescript
 * const usage = await trackApiUsage({
 *   supabase,
 *   serviceId: 'gpt4',
 *   userId: 'user_123',
 *   requestCount: 1,
 *   metadata: { model: 'gpt-4', tokens: 150 }
 * });
 * console.log(usage); // { daily_usage: 1, remaining_quota: 999, ... }
 * ```
 */
declare const trackApiUsage: ({ supabase, serviceId, userId, requestCount, metadata, }: {
    supabase: SupabaseClient<Database>;
    serviceId: string;
    userId: string;
    requestCount?: number;
    metadata?: Json;
}) => Promise<ApiUsage>;
/**
 * Checks if a user has remaining quota for a specific service.
 *
 * @example
 * ```typescript
 * const quota = await checkApiQuota({
 *   supabase,
 *   serviceId: 'gpt4',
 *   userId: 'user_123'
 * });
 * console.log(quota); // { has_quota: true, remaining: 1000, ... }
 * ```
 */
declare const checkApiQuota: ({ supabase, serviceId, userId, }: {
    supabase: SupabaseClient<Database>;
    serviceId: string;
    userId: string;
}) => Promise<ApiQuota>;
/**
 * Resets the daily API usage for a user and service.
 *
 * @example
 * ```typescript
 * await resetDailyUsage({
 *   supabase,
 *   serviceId: 'gpt4',
 *   userId: 'user_123'
 * });
 * ```
 */
declare const resetDailyUsage: ({ supabase, serviceId, userId, }: {
    supabase: SupabaseClient<Database>;
    serviceId: string;
    userId: string;
}) => Promise<void>;
/**
 * Gets API usage statistics for a specific period.
 *
 * @example
 * ```typescript
 * const stats = await getApiUsageStats({
 *   supabase,
 *   serviceId: 'gpt4',
 *   userId: 'user_123',
 *   startDate: '2024-01-01',
 *   endDate: '2024-01-31'
 * });
 * console.log(stats); // { total_requests: 150, average_daily: 5, ... }
 * ```
 */
declare const getApiUsageStats: ({ supabase, serviceId, userId, startDate, endDate, }: {
    supabase: SupabaseClient<Database>;
    serviceId: string;
    userId: string;
    startDate: string;
    endDate: string;
}) => Promise<ApiUsageStats>;
export { trackApiUsage, checkApiQuota, resetDailyUsage, getApiUsageStats };
export type { ApiUsage, ApiQuota, ApiUsageStats };
//# sourceMappingURL=api-usage.d.ts.map