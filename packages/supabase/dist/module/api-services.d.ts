import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';
type ApiService = Database['public']['Tables']['api_services']['Row'];
type ApiQuotaAllocation = Database['public']['Tables']['api_quota_allocations']['Row'];
/**
 * Retrieves all API services from the database.
 *
 * @example
 * ```typescript
 * const services = await getApiServices({ supabase });
 * console.log(services); // [{ id: '1', name: 'GPT-4', ... }]
 * ```
 */
declare const getApiServices: ({ supabase, }: {
    supabase: SupabaseClient<Database>;
}) => Promise<{
    created_at: string;
    default_daily_quota: number;
    default_queries_per_second: number;
    description: string | null;
    id: string;
    name: string;
    updated_at: string;
}[]>;
/**
 * Retrieves API quota allocations for a specific user.
 *
 * @example
 * ```typescript
 * const quotas = await getUserApiQuotas({
 *   supabase,
 *   userId: 'user_123'
 * });
 * console.log(quotas); // [{ service_id: '1', daily_quota: 1000, ... }]
 * ```
 */
declare const getUserApiQuotas: ({ supabase, userId, }: {
    supabase: SupabaseClient<Database>;
    userId: string;
}) => Promise<{
    created_at: string;
    daily_quota: number;
    id: string;
    queries_per_second: number;
    service_id: string | null;
    updated_at: string;
    user_id: string | null;
    service: {
        created_at: string;
        default_daily_quota: number;
        default_queries_per_second: number;
        description: string | null;
        id: string;
        name: string;
        updated_at: string;
    } | null;
}[]>;
/**
 * Updates or creates an API quota allocation for a user.
 *
 * @example
 * ```typescript
 * const quota = await updateApiQuota({
 *   supabase,
 *   userId: 'user_123',
 *   serviceId: 'service_456',
 *   dailyQuota: 1000,
 *   queriesPerSecond: 10
 * });
 * console.log(quota); // { user_id: 'user_123', daily_quota: 1000, ... }
 * ```
 */
declare const updateApiQuota: ({ supabase, userId, serviceId, dailyQuota, queriesPerSecond, }: {
    supabase: SupabaseClient<Database>;
    userId: string;
    serviceId: string;
    dailyQuota: number;
    queriesPerSecond: number;
}) => Promise<{
    created_at: string;
    daily_quota: number;
    id: string;
    queries_per_second: number;
    service_id: string | null;
    updated_at: string;
    user_id: string | null;
}>;
export { getApiServices, getUserApiQuotas, updateApiQuota };
export type { ApiService, ApiQuotaAllocation };
//# sourceMappingURL=api-services.d.ts.map