import { SupabaseOperationError, SupabaseErrorCode } from "../errors";
import { SupabaseClient } from "../index";
import { Database } from "../database.types";
export type Invitation = Database["public"]["Tables"]["invitations"]["Row"];
export type InvitationInsert = Database["public"]["Tables"]["invitations"]["Insert"];
export type InvitationUpdate = Database["public"]["Tables"]["invitations"]["Update"];
export type InvitationList = Invitation[];
export declare class InvitationOperationError extends SupabaseOperationError {
    constructor(operation: string, context: string, toastMessage: string, errorCode: SupabaseErrorCode, cause?: unknown);
}
/**
 * Invites a new member to an organization
 * @param {Object} params - The parameters for inviting a member
 * @param {SupabaseClient} params.supabase - The Supabase client instance
 * @param {string} params.organizationId - The ID of the organization
 * @param {Database["public"]["Enums"]["membership_type"]} params.membershipType - The type of membership
 * @param {string} params.email - The email of the invitee
 * @param {Database["public"]["Enums"]["org_role_type"]} params.orgRole - The role in the organization
 * @param {Database["public"]["Enums"]["team_role_type"]} params.teamRole - The role in the team
 * @param {string} params.invitedBy - The ID of the user sending the invitation
 * @param {string} params.expiresAt - The expiration date of the invitation
 * @param {string} [params.teamId] - Optional team ID if inviting to a specific team
 * @returns {Promise<string>} The invitation token
 * @throws {InvitationOperationError} If the invitation creation fails
 */
export declare function inviteOrgMember({ supabase, organizationId, membershipType, email, orgRole, teamRole, invitedBy, expiresAt, teamId, }: {
    supabase: SupabaseClient;
    organizationId: string;
    membershipType: Database["public"]["Enums"]["membership_type"];
    email: string;
    orgRole: Database["public"]["Enums"]["org_role_type"];
    teamRole: Database["public"]["Enums"]["team_role_type"];
    invitedBy: string;
    expiresAt: string;
    teamId?: string;
}): Promise<string>;
/**
 * Validates an invitation token
 * @param {Object} params - The parameters for validating an invitation
 * @param {SupabaseClient} params.supabase - The Supabase client instance
 * @param {string} params.token - The invitation token to validate
 * @returns {Promise<Database["public"]["Functions"]["validate_invitation_token"]["Returns"][0]>} The validated invitation details
 * @throws {InvitationOperationError} If the validation fails
 */
export declare function validateInvitationToken({ supabase, token, }: {
    supabase: SupabaseClient;
    token: string;
}): Promise<Database["public"]["Functions"]["validate_invitation_token"]["Returns"][0]>;
/**
 * Processes (accepts) an invitation
 * @param {Object} params - The parameters for processing an invitation
 * @param {SupabaseClient} params.supabase - The Supabase client instance
 * @param {string} params.token - The invitation token
 * @param {string} params.userId - The ID of the user accepting the invitation
 * @returns {Promise<boolean>} True if the invitation was processed successfully
 * @throws {InvitationOperationError} If the processing fails
 */
export declare function processInvitation({ supabase, token, userId, }: {
    supabase: SupabaseClient;
    token: string;
    userId: string;
}): Promise<boolean>;
/**
 * Revokes an invitation
 * @param {Object} params - The parameters for revoking an invitation
 * @param {SupabaseClient} params.supabase - The Supabase client instance
 * @param {string} params.token - The invitation token to revoke
 * @returns {Promise<boolean>} True if the invitation was revoked successfully
 * @throws {InvitationOperationError} If the revocation fails
 */
export declare function revokeInvitation({ supabase, token, }: {
    supabase: SupabaseClient;
    token: string;
}): Promise<boolean>;
/**
 * Gets all invitations for an organization
 * @param {Object} params - The parameters for retrieving invitations
 * @param {SupabaseClient} params.supabase - The Supabase client instance
 * @param {string} params.organizationId - The ID of the organization
 * @returns {Promise<InvitationList>} Array of invitations
 * @throws {InvitationOperationError} If the query fails
 */
export declare function getOrganizationInvitations({ supabase, organizationId, }: {
    supabase: SupabaseClient;
    organizationId: string;
}): Promise<InvitationList>;
