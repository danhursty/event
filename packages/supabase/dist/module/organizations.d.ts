import { SupabaseOperationError, SupabaseErrorCode } from "../errors";
import { SupabaseClient } from "../index";
import { Database } from "../database.types";
/**
 * Represents an organization.
 */
export type Organization = Database["public"]["Tables"]["organizations"]["Row"];
/**
 * Represents the data required to update an existing organization.
 */
export type OrganizationUpdate = Database["public"]["Tables"]["organizations"]["Update"];
/**
 * Represents the data required to create a new organization.
 */
export type OrganizationInsert = Database["public"]["Tables"]["organizations"]["Insert"];
/**
 * Custom error class for organization operations.
 */
export declare class OrganizationOperationError extends SupabaseOperationError {
    constructor(operation: string, context: string, toastMessage: string, errorCode: SupabaseErrorCode, cause?: unknown);
}
/**
 * Retrieves a single organization by ID.
 *
 * @param {object} params - The parameters for retrieving an organization.
 * @param {SupabaseClient} params.supabase - The Supabase client instance.
 * @param {string} params.orgId - The ID of the organization to retrieve.
 * @returns {Promise<Organization | null>} The organization if found, null otherwise.
 * @throws {OrganizationOperationError} If the query fails.
 *
 * @example
 * ```typescript
 * const org = await getOrganization({
 *   supabase,
 *   orgId: 'org-123',
 * });
 * if (org) {
 *   console.log('Organization:', org.name);
 * }
 * ```
 */
export declare function getOrganization({ supabase, orgId, }: {
    supabase: SupabaseClient;
    orgId: string;
}): Promise<Organization | null>;
/**
 * Retrieves all organizations for a user.
 *
 * @param {object} params - The parameters for retrieving organizations.
 * @param {SupabaseClient} params.supabase - The Supabase client instance.
 * @param {string} params.userId - The ID of the user.
 * @returns {Promise<Organization[]>} Array of organizations.
 * @throws {OrganizationOperationError} If the query fails.
 *
 * @example
 * ```typescript
 * const orgs = await getOrganizations({
 *   supabase,
 *   userId: 'user-123',
 * });
 * orgs.forEach(org => {
 *   console.log('Organization:', org.name);
 * });
 * ```
 */
export declare function getOrganizations({ supabase, userId, }: {
    supabase: SupabaseClient;
    userId: string;
}): Promise<Organization[]>;
/**
 * Creates a new organization.
 *
 * @param {object} params - The parameters for creating an organization.
 * @param {SupabaseClient} params.supabase - The Supabase client instance.
 * @param {OrganizationInsert} params.organization - The organization data to insert.
 * @returns {Promise<Organization>} The created organization.
 * @throws {OrganizationOperationError} If the insertion fails.
 *
 * @example
 * ```typescript
 * const newOrg = await createOrganization({
 *   supabase,
 *   organization: {
 *     name: 'New Organization',
 *     // other required fields
 *   },
 * });
 * console.log('Created Organization:', newOrg.id);
 * ```
 */
export declare function createOrganization({ supabase, organization, }: {
    supabase: SupabaseClient;
    organization: OrganizationInsert;
}): Promise<Organization>;
/**
 * Updates an existing organization by ID.
 *
 * @param {object} params - The parameters for updating an organization.
 * @param {SupabaseClient} params.supabase - The Supabase client instance.
 * @param {string} params.orgId - The ID of the organization to update.
 * @param {OrganizationUpdate} params.organization - The organization data to update.
 * @returns {Promise<Organization>} The updated organization.
 * @throws {OrganizationOperationError} If the update fails.
 *
 * @example
 * ```typescript
 * const updatedOrg = await updateOrganization({
 *   supabase,
 *   orgId: 'org-123',
 *   organization: {
 *     name: 'Updated Organization Name',
 *   },
 * });
 * ```
 */
export declare function updateOrganization({ supabase, orgId, organization, }: {
    supabase: SupabaseClient;
    orgId: string;
    organization: OrganizationUpdate;
}): Promise<Organization>;
/**
 * Deletes an organization by ID.
 *
 * @param {object} params - The parameters for deleting an organization.
 * @param {SupabaseClient} params.supabase - The Supabase client instance.
 * @param {string} params.orgId - The ID of the organization to delete.
 * @returns {Promise<void>}
 * @throws {OrganizationOperationError} If the deletion fails.
 *
 * @example
 * ```typescript
 * await deleteOrganization({
 *   supabase,
 *   orgId: 'org-123',
 * });
 * ```
 */
export declare function deleteOrganization({ supabase, orgId, }: {
    supabase: SupabaseClient;
    orgId: string;
}): Promise<void>;
