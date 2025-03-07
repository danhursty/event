import { SupabaseOperationError, SupabaseErrorCode } from "../errors";
import { SupabaseClient } from "../index";
import { Database } from "../database.types";
/**
 * Represents an organization member.
 */
export type OrganizationMember = Database["public"]["Tables"]["organization_members"]["Row"];
/**
 * Represents the data required to insert a new organization member.
 */
export type OrganizationMemberInsert = Database["public"]["Tables"]["organization_members"]["Insert"];
/**
 * Represents the data required to update an existing organization member.
 */
export type OrganizationMemberUpdate = Database["public"]["Tables"]["organization_members"]["Update"];
/**
 * Custom error class for organization member operations.
 */
export declare class OrganizationMemberOperationError extends SupabaseOperationError {
    constructor(operation: string, context: string, toastMessage: string, errorCode: SupabaseErrorCode, cause?: unknown);
}
/**
 * Creates a new organization member.
 *
 * @param {object} params - The parameters for creating an organization member.
 * @param {SupabaseClient} params.supabase - The Supabase client instance.
 * @param {OrganizationMemberInsert} params.member - The organization member data to insert.
 * @returns {Promise<OrganizationMember>} The created organization member.
 * @throws {OrganizationMemberOperationError} If the member creation fails.
 *
 * @example
 * ```typescript
 * const newMember = await createOrganizationMember({
 *   supabase,
 *   member: {
 *     organization_id: 'org-123',
 *     user_id: 'user-123',
 *     role_id: 'role-123',
 *     membership_type: 'team'
 *   }
 * });
 * ```
 */
export declare function createOrganizationMember({ supabase, member, }: {
    supabase: SupabaseClient;
    member: OrganizationMemberInsert;
}): Promise<OrganizationMember>;
/**
 * Retrieves a single organization member by ID.
 *
 * @param {object} params - The parameters for retrieving an organization member.
 * @param {SupabaseClient} params.supabase - The Supabase client instance.
 * @param {string} params.memberId - The ID of the organization member to retrieve.
 * @returns {Promise<OrganizationMember | null>} The organization member if found, null otherwise.
 * @throws {OrganizationMemberOperationError} If the query fails.
 *
 * @example
 * ```typescript
 * const member = await getOrganizationMember({
 *   supabase,
 *   memberId: 'member-123'
 * });
 * ```
 */
export declare function getOrganizationMember({ supabase, memberId, }: {
    supabase: SupabaseClient;
    memberId: string;
}): Promise<OrganizationMember | null>;
/**
 * Retrieves all members of an organization.
 *
 * @param {object} params - The parameters for retrieving organization members.
 * @param {SupabaseClient} params.supabase - The Supabase client instance.
 * @param {string} params.organizationId - The ID of the organization.
 * @returns {Promise<OrganizationMember[]>} Array of organization members.
 * @throws {OrganizationMemberOperationError} If the query fails.
 *
 * @example
 * ```typescript
 * const members = await getOrganizationMembers({
 *   supabase,
 *   organizationId: 'org-123'
 * });
 * ```
 */
export declare function getOrganizationMembers({ supabase, organizationId, }: {
    supabase: SupabaseClient;
    organizationId: string;
}): Promise<OrganizationMember[]>;
/**
 * Updates an existing organization member.
 *
 * @param {object} params - The parameters for updating an organization member.
 * @param {SupabaseClient} params.supabase - The Supabase client instance.
 * @param {string} params.memberId - The ID of the organization member to update.
 * @param {OrganizationMemberUpdate} params.member - The organization member data to update.
 * @returns {Promise<OrganizationMember>} The updated organization member.
 * @throws {OrganizationMemberOperationError} If the update fails.
 *
 * @example
 * ```typescript
 * const updatedMember = await updateOrganizationMember({
 *   supabase,
 *   memberId: 'member-123',
 *   member: {
 *     role_id: 'new-role-123'
 *   }
 * });
 * ```
 */
export declare function updateOrganizationMember({ supabase, memberId, member, }: {
    supabase: SupabaseClient;
    memberId: string;
    member: OrganizationMemberUpdate;
}): Promise<OrganizationMember>;
/**
 * Deletes an organization member.
 *
 * @param {object} params - The parameters for deleting an organization member.
 * @param {SupabaseClient} params.supabase - The Supabase client instance.
 * @param {string} params.memberId - The ID of the organization member to delete.
 * @returns {Promise<void>}
 * @throws {OrganizationMemberOperationError} If the deletion fails.
 *
 * @example
 * ```typescript
 * await deleteOrganizationMember({
 *   supabase,
 *   memberId: 'member-123'
 * });
 * ```
 */
export declare function deleteOrganizationMember({ supabase, memberId, }: {
    supabase: SupabaseClient;
    memberId: string;
}): Promise<void>;
//# sourceMappingURL=organization-members.d.ts.map