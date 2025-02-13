import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';
import type { ResourceType, Role } from '../types';
type Membership = Database['public']['Tables']['memberships']['Row'];
type MembershipUpdate = Database['public']['Tables']['memberships']['Update'];
type Profile = Database['public']['Tables']['profiles']['Row'];
type MembershipWithProfileRow = Membership & {
    profiles: Pick<Profile, 'id' | 'email' | 'full_name' | 'avatar_url'> | null;
};
type MembershipResponse<T> = {
    data: T | null;
    error: Error | null;
};
/**
 * Creates a new membership for a user in a resource (organization or project).
 *
 * @example
 * ```typescript
 * // Add a regular member to an organization
 * const { data, error } = await createMembership({
 *   supabase,
 *   userId: 'user_123',
 *   resourceType: 'organization',
 *   resourceId: 'org_456',
 *   role: 'member'
 * });
 *
 * // Add an admin to a project
 * const { data, error } = await createMembership({
 *   supabase,
 *   userId: 'user_123',
 *   resourceType: 'project',
 *   resourceId: 'proj_789',
 *   role: 'admin'
 * });
 * ```
 */
declare const createMembership: ({ supabase, userId, resourceType, resourceId, role, }: {
    supabase: SupabaseClient<Database>;
    userId: string;
    resourceType: ResourceType;
    resourceId: string;
    role?: Role;
}) => Promise<MembershipResponse<Membership>>;
/**
 * Retrieves a membership by its ID with user profile information.
 *
 * @example
 * ```typescript
 * const { data, error } = await getMembership({
 *   supabase,
 *   membershipId: 'mem_123'
 * });
 * if (data) {
 *   console.log(data.profiles.email); // 'user@example.com'
 * }
 * ```
 */
declare const getMembership: ({ supabase, membershipId, }: {
    supabase: SupabaseClient<Database>;
    membershipId: string;
}) => Promise<{
    data: {
        created_at: string;
        id: string;
        resource_id: string;
        resource_type: string;
        role: string;
        updated_at: string;
        user_id: string | null;
    };
    error: null;
} | {
    data: null;
    error: Error;
}>;
/**
 * Updates a membership's properties.
 *
 * @example
 * ```typescript
 * const { data, error } = await updateMembership({
 *   supabase,
 *   membershipId: 'mem_123',
 *   updates: {
 *     role: 'admin'
 *   }
 * });
 * ```
 */
declare const updateMembership: ({ supabase, membershipId, updates, }: {
    supabase: SupabaseClient<Database>;
    membershipId: string;
    updates: MembershipUpdate;
}) => Promise<MembershipResponse<Membership>>;
/**
 * Deletes a membership.
 *
 * @example
 * ```typescript
 * const { error } = await deleteMembership({
 *   supabase,
 *   membershipId: 'mem_123'
 * });
 * ```
 */
declare const deleteMembership: ({ supabase, membershipId, }: {
    supabase: SupabaseClient<Database>;
    membershipId: string;
}) => Promise<{
    error: Error | null;
}>;
/**
 * Lists all memberships for a resource with user profile information.
 *
 * @example
 * ```typescript
 * // Get organization members
 * const { data, error } = await listMemberships({
 *   supabase,
 *   resourceType: 'organization',
 *   resourceId: 'org_123'
 * });
 *
 * // Get project members
 * const { data, error } = await listMemberships({
 *   supabase,
 *   resourceType: 'project',
 *   resourceId: 'proj_456'
 * });
 * ```
 */
declare const listMemberships: ({ supabase, resourceType, resourceId, }: {
    supabase: SupabaseClient<Database>;
    resourceType: ResourceType;
    resourceId: string;
}) => Promise<MembershipResponse<Membership[]>>;
/**
 * Lists all memberships for a user with optional resource type filtering.
 *
 * @example
 * ```typescript
 * // Get all user memberships
 * const { data, error } = await getUserMemberships({
 *   supabase,
 *   userId: 'user_123'
 * });
 *
 * // Get only organization memberships
 * const { data, error } = await getUserMemberships({
 *   supabase,
 *   userId: 'user_123',
 *   resourceType: 'organization'
 * });
 * ```
 */
declare const getUserMemberships: ({ supabase, userId, resourceType, }: {
    supabase: SupabaseClient<Database>;
    userId: string;
    resourceType?: ResourceType;
}) => Promise<MembershipResponse<Membership[]>>;
export { createMembership, getMembership, updateMembership, deleteMembership, listMemberships, getUserMemberships, };
export type { Membership, MembershipUpdate, MembershipResponse, MembershipWithProfileRow, };
//# sourceMappingURL=memberships.d.ts.map