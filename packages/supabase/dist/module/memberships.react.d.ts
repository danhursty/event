import { SupabaseClient } from '@supabase/supabase-js';
import { type UseQueryOptions } from '@tanstack/react-query';
import type { Database } from '../database.types';
import type { ResourceType } from '../types';
import { Membership } from './memberships';
type SupabaseProps = {
    supabase: SupabaseClient<Database>;
};
type QueryEnabledProps = {
    enabled?: boolean;
};
/**
 * Custom error class for handling membership-related errors with additional context
 *
 * @example
 * ```ts
 * // Create a new error
 * const error = new MembershipError('Failed to fetch membership', 'FETCH_ERROR', 500)
 *
 * // Convert from unknown error
 * try {
 *   await someOperation()
 * } catch (err) {
 *   throw MembershipError.fromError(err, 'OPERATION_ERROR')
 * }
 * ```
 */
export declare class MembershipError extends Error {
    readonly code?: string | undefined;
    readonly status?: number | undefined;
    constructor(message: string, code?: string | undefined, status?: number | undefined);
    static fromError(err: unknown, code?: string, status?: number): MembershipError;
}
type BaseKey = ['memberships'];
type ListKey = [
    ...BaseKey,
    'list',
    {
        resourceType: string;
        resourceId: string;
    }
];
type DetailKey = [...BaseKey, 'detail', string];
type UserMembershipsKey = [
    ...BaseKey,
    'user',
    {
        userId: string;
        resourceType?: string;
    }
];
/**
 * Query key factory for memberships with proper type safety
 *
 * @example
 * ```ts
 * // Get base key
 * const baseKey = membershipKeys.all()
 *
 * // Get list key
 * const listKey = membershipKeys.list({
 *   resourceType: 'organization',
 *   resourceId: 'org_123'
 * })
 *
 * // Get detail key
 * const detailKey = membershipKeys.detail({ id: 'mem_123' })
 * ```
 */
export declare const membershipKeys: {
    readonly all: () => BaseKey;
    readonly lists: () => readonly ["memberships", "list"];
    readonly list: ({ resourceType, resourceId, }: {
        resourceType: string;
        resourceId: string;
    }) => ListKey;
    readonly details: () => readonly ["memberships", "detail"];
    readonly detail: ({ id }: {
        id: string;
    }) => DetailKey;
    readonly userMemberships: ({ userId, resourceType, }: {
        userId: string;
        resourceType?: string;
    }) => UserMembershipsKey;
};
type MembershipQueryParams = SupabaseProps & {
    membershipId: string;
};
type ListMembershipsQueryParams = SupabaseProps & {
    resourceType: ResourceType;
    resourceId: string;
};
/**
 * Query options factory for membership queries with error handling
 *
 * @example
 * ```ts
 * // Use in a custom query
 * const { data } = useQuery({
 *   ...membershipQueries.detail({
 *     supabase,
 *     membershipId: 'mem_123'
 *   })
 * })
 * ```
 */
export declare const membershipQueries: {
    detail: ({ supabase, membershipId, }: MembershipQueryParams) => UseQueryOptions<Membership, MembershipError>;
    list: ({ supabase, resourceType, resourceId, }: ListMembershipsQueryParams) => UseQueryOptions<Membership[], MembershipError>;
};
type GetMembershipParams = MembershipQueryParams & QueryEnabledProps;
/**
 * React hook to fetch a membership with type safety and error handling
 *
 * @example
 * ```ts
 * // Basic usage
 * const { data, error } = useGetMembership({
 *   supabase,
 *   membershipId: 'mem_123'
 * })
 *
 * // With enabled flag
 * const { data, error } = useGetMembership({
 *   supabase,
 *   membershipId: 'mem_123',
 *   enabled: isReady
 * })
 * ```
 */
export declare const useGetMembership: ({ supabase, membershipId, enabled, }: GetMembershipParams) => any;
type ListMembershipsParams = ListMembershipsQueryParams & QueryEnabledProps;
/**
 * React hook to list memberships for a resource with type safety and error handling
 *
 * @example
 * ```ts
 * // List organization members
 * const { data, error } = useListMemberships({
 *   supabase,
 *   resourceType: 'organization',
 *   resourceId: 'org_123'
 * })
 *
 * // List project members
 * const { data, error } = useListMemberships({
 *   supabase,
 *   resourceType: 'project',
 *   resourceId: 'proj_456'
 * })
 * ```
 */
export declare const useListMemberships: ({ supabase, resourceType, resourceId, enabled, }: ListMembershipsParams) => any;
/**
 * React hook to create a membership with error handling and cache updates
 *
 * @example
 * ```ts
 * const mutation = useCreateMembership({ supabase })
 *
 * // Create membership
 * mutation.mutate({
 *   userId: 'user_123',
 *   resourceType: 'organization',
 *   resourceId: 'org_456',
 *   role: 'admin'
 * })
 * ```
 */
export declare const useCreateMembership: ({ supabase }: SupabaseProps) => any;
/**
 * React hook to update a membership with optimistic updates and error handling
 *
 * @example
 * ```ts
 * const mutation = useUpdateMembership({ supabase })
 *
 * // Update membership
 * mutation.mutate({
 *   membershipId: 'mem_123',
 *   resourceType: 'organization',
 *   resourceId: 'org_456',
 *   updates: { role: 'admin' }
 * })
 * ```
 */
export declare const useUpdateMembership: ({ supabase }: SupabaseProps) => any;
/**
 * React hook to delete a membership with error handling and cache updates
 *
 * @example
 * ```ts
 * const mutation = useDeleteMembership({ supabase })
 *
 * // Delete membership
 * mutation.mutate({
 *   membershipId: 'mem_123',
 *   resourceType: 'organization',
 *   resourceId: 'org_456'
 * })
 * ```
 */
export declare const useDeleteMembership: ({ supabase }: SupabaseProps) => any;
type GetUserMembershipsParams = SupabaseProps & {
    userId: string;
    resourceType?: ResourceType;
} & QueryEnabledProps;
/**
 * React hook to fetch all memberships for a user with optional resource type filtering
 *
 * @example
 * ```ts
 * // Get all memberships
 * const { data: allMemberships } = useGetUserMemberships({
 *   supabase,
 *   userId: 'user_123'
 * })
 *
 * // Get only organization memberships
 * const { data: orgMemberships } = useGetUserMemberships({
 *   supabase,
 *   userId: 'user_123',
 *   resourceType: 'organization'
 * })
 * ```
 */
export declare const useGetUserMemberships: ({ supabase, userId, resourceType, enabled, }: GetUserMembershipsParams) => any;
export {};
//# sourceMappingURL=memberships.react.d.ts.map