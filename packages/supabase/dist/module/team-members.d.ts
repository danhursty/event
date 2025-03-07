import { SupabaseOperationError, SupabaseErrorCode } from "../errors";
import { SupabaseClient } from "../index";
import { Database } from "../database.types";
/**
 * Represents a team member.
 */
export type TeamMember = Database["public"]["Tables"]["team_members"]["Row"];
/**
 * Represents the data required to insert a new team member.
 */
export type TeamMemberInsert = Database["public"]["Tables"]["team_members"]["Insert"];
/**
 * Represents the data required to update an existing team member.
 */
export type TeamMemberUpdate = Database["public"]["Tables"]["team_members"]["Update"];
/**
 * Custom error class for team member operations.
 */
export declare class TeamMemberOperationError extends SupabaseOperationError {
    constructor(operation: string, context: string, toastMessage: string, errorCode: SupabaseErrorCode, cause?: unknown);
}
/**
 * Creates a new team member.
 *
 * @param {object} params - The parameters for creating a team member.
 * @param {SupabaseClient} params.supabase - The Supabase client instance.
 * @param {TeamMemberInsert} params.member - The team member data to insert.
 * @returns {Promise<TeamMember>} The created team member.
 * @throws {TeamMemberOperationError} If the member creation fails.
 *
 * @example
 * ```typescript
 * const newMember = await createTeamMember({
 *   supabase,
 *   member: {
 *     team_id: 'team-123',
 *     user_id: 'user-123',
 *     role_id: 'role-123'
 *   }
 * });
 * ```
 */
export declare function createTeamMember({ supabase, member, }: {
    supabase: SupabaseClient;
    member: TeamMemberInsert;
}): Promise<TeamMember>;
/**
 * Retrieves a single team member by ID.
 *
 * @param {object} params - The parameters for retrieving a team member.
 * @param {SupabaseClient} params.supabase - The Supabase client instance.
 * @param {string} params.memberId - The ID of the team member to retrieve.
 * @returns {Promise<TeamMember | null>} The team member if found, null otherwise.
 * @throws {TeamMemberOperationError} If the query fails.
 *
 * @example
 * ```typescript
 * const member = await getTeamMember({
 *   supabase,
 *   memberId: 'member-123'
 * });
 * ```
 */
export declare function getTeamMember({ supabase, memberId, }: {
    supabase: SupabaseClient;
    memberId: string;
}): Promise<TeamMember | null>;
/**
 * Retrieves all members of a team.
 *
 * @param {object} params - The parameters for retrieving team members.
 * @param {SupabaseClient} params.supabase - The Supabase client instance.
 * @param {string} params.teamId - The ID of the team.
 * @returns {Promise<TeamMember[]>} Array of team members.
 * @throws {TeamMemberOperationError} If the query fails.
 *
 * @example
 * ```typescript
 * const members = await getTeamMembers({
 *   supabase,
 *   teamId: 'team-123'
 * });
 * ```
 */
export declare function getTeamMembers({ supabase, teamId, }: {
    supabase: SupabaseClient;
    teamId: string;
}): Promise<TeamMember[]>;
/**
 * Updates an existing team member.
 *
 * @param {object} params - The parameters for updating a team member.
 * @param {SupabaseClient} params.supabase - The Supabase client instance.
 * @param {string} params.memberId - The ID of the team member to update.
 * @param {TeamMemberUpdate} params.member - The team member data to update.
 * @returns {Promise<TeamMember>} The updated team member.
 * @throws {TeamMemberOperationError} If the update fails.
 *
 * @example
 * ```typescript
 * const updatedMember = await updateTeamMember({
 *   supabase,
 *   memberId: 'member-123',
 *   member: {
 *     role_id: 'new-role-123'
 *   }
 * });
 * ```
 */
export declare function updateTeamMember({ supabase, memberId, member, }: {
    supabase: SupabaseClient;
    memberId: string;
    member: TeamMemberUpdate;
}): Promise<TeamMember>;
/**
 * Deletes a team member.
 *
 * @param {object} params - The parameters for deleting a team member.
 * @param {SupabaseClient} params.supabase - The Supabase client instance.
 * @param {string} params.memberId - The ID of the team member to delete.
 * @returns {Promise<void>}
 * @throws {TeamMemberOperationError} If the deletion fails.
 *
 * @example
 * ```typescript
 * await deleteTeamMember({
 *   supabase,
 *   memberId: 'member-123'
 * });
 * ```
 */
export declare function deleteTeamMember({ supabase, memberId, }: {
    supabase: SupabaseClient;
    memberId: string;
}): Promise<void>;
//# sourceMappingURL=team-members.d.ts.map