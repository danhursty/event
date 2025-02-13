import { SupabaseOperationError, SupabaseErrorCode } from "../errors";
export class InvitationOperationError extends SupabaseOperationError {
    constructor(operation, context, toastMessage, errorCode, cause) {
        super(operation, context, toastMessage, errorCode, cause);
    }
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
export async function inviteOrgMember({ supabase, organizationId, membershipType, email, orgRole, teamRole, invitedBy, expiresAt, teamId, }) {
    try {
        const { data, error } = await supabase.rpc("invite_org_member", {
            p_organization_id: organizationId,
            p_membership_type: membershipType,
            p_email: email,
            p_org_role: orgRole,
            p_team_role: teamRole,
            p_invited_by: invitedBy,
            p_expires_at: expiresAt,
            p_team_id: teamId,
        });
        if (error)
            throw error;
        if (!data)
            throw new Error("No invitation token returned");
        return data;
    }
    catch (error) {
        throw new InvitationOperationError("Invite organization member", "Failed to create invitation", "Unable to send invitation. Please try again.", SupabaseErrorCode.CREATE_FAILED, error);
    }
}
/**
 * Validates an invitation token
 * @param {Object} params - The parameters for validating an invitation
 * @param {SupabaseClient} params.supabase - The Supabase client instance
 * @param {string} params.token - The invitation token to validate
 * @returns {Promise<Database["public"]["Functions"]["validate_invitation_token"]["Returns"][0]>} The validated invitation details
 * @throws {InvitationOperationError} If the validation fails
 */
export async function validateInvitationToken({ supabase, token, }) {
    try {
        const { data, error } = await supabase.rpc("validate_invitation_token", {
            p_token: token,
        });
        if (error)
            throw error;
        if (!data?.[0])
            throw new Error("Invalid or expired invitation token");
        return data[0];
    }
    catch (error) {
        throw new InvitationOperationError("Validate invitation token", "Failed to validate invitation", "Invalid or expired invitation link.", SupabaseErrorCode.VALIDATION_FAILED, error);
    }
}
/**
 * Processes (accepts) an invitation
 * @param {Object} params - The parameters for processing an invitation
 * @param {SupabaseClient} params.supabase - The Supabase client instance
 * @param {string} params.token - The invitation token
 * @param {string} params.userId - The ID of the user accepting the invitation
 * @returns {Promise<boolean>} True if the invitation was processed successfully
 * @throws {InvitationOperationError} If the processing fails
 */
export async function processInvitation({ supabase, token, userId, }) {
    try {
        const { data, error } = await supabase.rpc("process_invitation", {
            p_token: token,
            p_user_id: userId,
        });
        if (error)
            throw error;
        return data;
    }
    catch (error) {
        throw new InvitationOperationError("Process invitation", "Failed to process invitation", "Unable to accept invitation. Please try again.", SupabaseErrorCode.UPDATE_FAILED, error);
    }
}
/**
 * Revokes an invitation
 * @param {Object} params - The parameters for revoking an invitation
 * @param {SupabaseClient} params.supabase - The Supabase client instance
 * @param {string} params.token - The invitation token to revoke
 * @returns {Promise<boolean>} True if the invitation was revoked successfully
 * @throws {InvitationOperationError} If the revocation fails
 */
export async function revokeInvitation({ supabase, token, }) {
    try {
        const { data, error } = await supabase.rpc("revoke_invitation", {
            p_token: token,
        });
        if (error)
            throw error;
        return data;
    }
    catch (error) {
        throw new InvitationOperationError("Revoke invitation", "Failed to revoke invitation", "Unable to revoke invitation. Please try again.", SupabaseErrorCode.DELETE_FAILED, error);
    }
}
/**
 * Gets all invitations for an organization
 * @param {Object} params - The parameters for retrieving invitations
 * @param {SupabaseClient} params.supabase - The Supabase client instance
 * @param {string} params.organizationId - The ID of the organization
 * @returns {Promise<InvitationList>} Array of invitations
 * @throws {InvitationOperationError} If the query fails
 */
export async function getOrganizationInvitations({ supabase, organizationId, }) {
    try {
        const { data, error } = await supabase
            .from("invitations")
            .select("*")
            .eq("organization_id", organizationId)
            .is("accepted_at", null);
        if (error)
            throw error;
        return data ?? [];
    }
    catch (error) {
        throw new InvitationOperationError("Get organization invitations", "Failed to retrieve invitations", "Unable to load invitations. Please refresh the page.", SupabaseErrorCode.READ_FAILED, error);
    }
}
