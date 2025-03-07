import { type UseQueryOptions, type UseMutationOptions, type UseMutationResult } from "@tanstack/react-query";
import { SupabaseClient } from "../index";
import { type OrganizationMember, type OrganizationMemberInsert, type OrganizationMemberUpdate, OrganizationMemberOperationError } from "./organization-members";
type QueryKey = readonly [string, ...unknown[]];
/**
 * React Query key factory for organization member-related queries
 */
export declare const organizationMemberKeys: {
    all: readonly ["organization-members"];
    lists: () => QueryKey;
    list: (filters: {
        organizationId?: string;
    }) => QueryKey;
    details: () => QueryKey;
    detail: (id: string) => QueryKey;
};
/**
 * Static query keys for server-side usage
 */
export declare const organizationMemberQueryKeys: {
    readonly all: readonly ["organization-members"];
    readonly lists: readonly ["organization-members", "list"];
    readonly list: (filters: {
        organizationId?: string;
    }) => (string | {
        organizationId?: string;
    })[];
    readonly details: readonly ["organization-members", "detail"];
    readonly detail: (id: string) => string[];
};
/**
 * Hook for fetching a single organization member by ID.
 *
 * @param {object} params - Hook parameters
 * @param {string} params.memberId - The ID of the organization member to fetch
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseQueryOptions<OrganizationMember | null, OrganizationMemberOperationError>>} [params.options] - Additional React Query options
 * @returns Query result with data and error
 *
 * @example
 * ```typescript
 * const { data: member, isLoading, error } = useOrganizationMember({
 *   memberId: 'member-123',
 *   supabase
 * });
 * ```
 */
export declare function useOrganizationMember({ memberId, supabase, options, }: {
    memberId: string;
    supabase: SupabaseClient;
    options?: Partial<UseQueryOptions<OrganizationMember | null, OrganizationMemberOperationError>>;
}): import("@tanstack/react-query").UseQueryResult<{
    created_at: string | null;
    id: string;
    membership_type: import("../database.types").Database["public"]["Enums"]["membership_type"];
    organization_id: string | null;
    role_id: string | null;
    updated_at: string | null;
    user_id: string | null;
} | null, OrganizationMemberOperationError>;
/**
 * Hook for fetching all members of an organization.
 *
 * @param {object} params - Hook parameters
 * @param {string} params.organizationId - The ID of the organization
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseQueryOptions<OrganizationMember[], OrganizationMemberOperationError>>} [params.options] - Additional React Query options
 * @returns Query result with data and error
 *
 * @example
 * ```typescript
 * const { data: members, isLoading, error } = useOrganizationMembers({
 *   organizationId: 'org-123',
 *   supabase
 * });
 * ```
 */
export declare function useOrganizationMembers({ organizationId, supabase, options, }: {
    organizationId: string;
    supabase: SupabaseClient;
    options?: Partial<UseQueryOptions<OrganizationMember[], OrganizationMemberOperationError>>;
}): import("@tanstack/react-query").UseQueryResult<{
    created_at: string | null;
    id: string;
    membership_type: import("../database.types").Database["public"]["Enums"]["membership_type"];
    organization_id: string | null;
    role_id: string | null;
    updated_at: string | null;
    user_id: string | null;
}[], OrganizationMemberOperationError>;
/**
 * Hook for creating a new organization member, with toast notifications.
 *
 * @param {object} params - Hook parameters
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseMutationOptions<OrganizationMember, OrganizationMemberOperationError, { member: OrganizationMemberInsert }>>} [params.options] - Mutation options
 * @returns Mutation result with status and handlers
 *
 * @example
 * ```typescript
 * const { mutate: executeCreateMember } = useCreateOrganizationMember({
 *   supabase,
 *   options: {
 *     onSuccess: (newMember) => {
 *       console.log('Member created:', newMember);
 *     },
 *   },
 * });
 *
 * executeCreateMember({
 *   member: {
 *     organization_id: 'org-123',
 *     user_id: 'user-123',
 *     role_id: 'role-123',
 *     membership_type: 'team'
 *   }
 * });
 * ```
 */
export declare function useCreateOrganizationMember({ supabase, options, }: {
    supabase: SupabaseClient;
    options?: Partial<UseMutationOptions<OrganizationMember, OrganizationMemberOperationError, {
        member: OrganizationMemberInsert;
    }>>;
}): UseMutationResult<OrganizationMember, OrganizationMemberOperationError, {
    member: OrganizationMemberInsert;
}>;
/**
 * Hook for updating an organization member, with toast notifications.
 *
 * @param {object} params - Hook parameters
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseMutationOptions<OrganizationMember, OrganizationMemberOperationError, { memberId: string; member: OrganizationMemberUpdate }>>} [params.options] - Mutation options
 * @returns Mutation result with status and handlers
 *
 * @example
 * ```typescript
 * const { mutate: executeUpdateMember } = useUpdateOrganizationMember({
 *   supabase,
 *   options: {
 *     onSuccess: (updatedMember) => {
 *       console.log('Member updated:', updatedMember);
 *     },
 *   },
 * });
 *
 * executeUpdateMember({
 *   memberId: 'member-123',
 *   member: { role_id: 'new-role-123' }
 * });
 * ```
 */
export declare function useUpdateOrganizationMember({ supabase, options, }: {
    supabase: SupabaseClient;
    options?: Partial<UseMutationOptions<OrganizationMember, OrganizationMemberOperationError, {
        memberId: string;
        member: OrganizationMemberUpdate;
    }>>;
}): UseMutationResult<OrganizationMember, OrganizationMemberOperationError, {
    memberId: string;
    member: OrganizationMemberUpdate;
}>;
/**
 * Hook for deleting an organization member, with toast notifications.
 *
 * @param {object} params - Hook parameters
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseMutationOptions<void, OrganizationMemberOperationError, { memberId: string; organizationId: string }>>} [params.options] - Mutation options
 * @returns Mutation result with status and handlers
 *
 * @example
 * ```typescript
 * const { mutate: executeDeleteMember } = useDeleteOrganizationMember({
 *   supabase,
 *   options: {
 *     onSuccess: () => {
 *       console.log('Member deleted');
 *     },
 *   },
 * });
 *
 * executeDeleteMember({
 *   memberId: 'member-123',
 *   organizationId: 'org-123'
 * });
 * ```
 */
export declare function useDeleteOrganizationMember({ supabase, options, }: {
    supabase: SupabaseClient;
    options?: Partial<UseMutationOptions<void, OrganizationMemberOperationError, {
        memberId: string;
        organizationId: string;
    }>>;
}): UseMutationResult<void, OrganizationMemberOperationError, {
    memberId: string;
    organizationId: string;
}>;
export {};
//# sourceMappingURL=organization-members.react.d.ts.map