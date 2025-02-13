import { type UseQueryOptions, type UseMutationOptions, type UseMutationResult } from "@tanstack/react-query";
import { SupabaseClient } from "../index";
import { type Organization, type OrganizationUpdate, OrganizationOperationError } from "./organizations";
type QueryKey = readonly [string, ...unknown[]];
/**
 * React Query key factory for organization-related queries
 */
export declare const organizationKeys: {
    all: readonly ["organizations"];
    lists: () => QueryKey;
    list: (filters: {
        userId?: string;
    }) => QueryKey;
    details: () => QueryKey;
    detail: (id: string) => QueryKey;
};
/**
 * Static query keys for server-side usage
 */
export declare const organizationQueryKeys: {
    readonly all: readonly ["organizations"];
    readonly lists: readonly ["organizations", "list"];
    readonly list: (filters: {
        userId?: string;
    }) => (string | {
        userId?: string;
    })[];
    readonly details: readonly ["organizations", "detail"];
    readonly detail: (id: string) => string[];
};
/**
 * Hook for fetching a single organization by ID.
 * If orgId is undefined or empty, the query is skipped.
 *
 * @param {object} params - Hook parameters
 * @param {string} [params.orgId] - The ID of the organization to fetch
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseQueryOptions<Organization | null, OrganizationOperationError>>} [params.options] - Additional React Query options
 * @returns Query result with data and error
 *
 * @example
 * ```typescript
 * const { data: organization, isLoading, error } = useOrganization({ orgId: '123', supabase });
 * ```
 */
export declare function useOrganization({ orgId, supabase, options, }: {
    orgId: string;
    supabase: SupabaseClient;
    options?: Partial<UseQueryOptions<Organization | null, OrganizationOperationError>>;
}): import("@tanstack/react-query").UseQueryResult<{
    auto_recharge_amount: number | null;
    auto_recharge_enabled: boolean | null;
    auto_recharge_threshold: number | null;
    billing_email: string;
    created_at: string | null;
    credits_balance: number | null;
    id: string;
    is_subscribed: boolean | null;
    name: string;
    onboarding_data: import("../database.types").Json | null;
    stripe_customer_id: string | null;
    updated_at: string | null;
} | null, OrganizationOperationError>;
/**
 * Hook for fetching all organizations for a user.
 *
 * @param {object} params - Hook parameters
 * @param {string} params.userId - The ID of the user
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseQueryOptions<Organization[], OrganizationOperationError>>} [params.options] - Additional React Query options
 * @returns Query result with data and error
 *
 * @example
 * ```typescript
 * const { data: organizations, isLoading, error } = useOrganizations({ userId: '123', supabase });
 * ```
 */
export declare function useOrganizations({ userId, supabase, options, }: {
    userId: string;
    supabase: SupabaseClient;
    options?: Partial<UseQueryOptions<Organization[], OrganizationOperationError>>;
}): import("@tanstack/react-query").UseQueryResult<{
    auto_recharge_amount: number | null;
    auto_recharge_enabled: boolean | null;
    auto_recharge_threshold: number | null;
    billing_email: string;
    created_at: string | null;
    credits_balance: number | null;
    id: string;
    is_subscribed: boolean | null;
    name: string;
    onboarding_data: import("../database.types").Json | null;
    stripe_customer_id: string | null;
    updated_at: string | null;
}[], OrganizationOperationError>;
/**
 * Hook for updating an existing organization by ID, with toast notifications.
 *
 * @param {object} params - Hook parameters
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseMutationOptions<Organization, OrganizationOperationError, { orgId: string; organization: OrganizationUpdate }>>} [params.options] - Mutation options
 * @returns Mutation result with status and handlers
 *
 * @example
 * ```typescript
 * const { mutate: executeUpdateOrganization, isLoading } = useUpdateOrganization({
 *   supabase,
 *   options: {
 *     onSuccess: (updatedOrg) => {
 *       console.log('Organization updated:', updatedOrg);
 *     },
 *   },
 * });
 *
 * executeUpdateOrganization({ orgId: '123', organization: { name: 'Updated Name' } });
 * ```
 */
export declare function useUpdateOrganization({ supabase, options, }: {
    supabase: SupabaseClient;
    options?: Partial<UseMutationOptions<Organization, OrganizationOperationError, {
        orgId: string;
        organization: OrganizationUpdate;
    }>>;
}): UseMutationResult<Organization, OrganizationOperationError, {
    orgId: string;
    organization: OrganizationUpdate;
}>;
/**
 * Hook for deleting an organization by ID, with toast notifications.
 *
 * @param {object} params - Hook parameters
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseMutationOptions<void, OrganizationOperationError, { orgId: string }>>} [params.options] - Mutation options
 * @returns Mutation result with status and handlers
 *
 * @example
 * ```typescript
 * const { mutate: executeDeleteOrganization, isLoading } = useDeleteOrganization({
 *   supabase,
 *   options: {
 *     onSuccess: () => {
 *       console.log('Organization deleted');
 *     },
 *   },
 * });
 *
 * executeDeleteOrganization({ orgId: '123' });
 * ```
 */
export declare function useDeleteOrganization({ supabase, options, }: {
    supabase: SupabaseClient;
    options?: Partial<UseMutationOptions<void, OrganizationOperationError, {
        orgId: string;
    }>>;
}): UseMutationResult<void, OrganizationOperationError, {
    orgId: string;
}>;
export {};
