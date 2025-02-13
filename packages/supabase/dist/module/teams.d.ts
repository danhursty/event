import { SupabaseOperationError, SupabaseErrorCode } from "../errors";
import { SupabaseClient } from "../index";
import { Database } from "../database.types";
/**
 * Represents a team.
 */
export type Team = Database["public"]["Tables"]["teams"]["Row"];
/**
 * Represents the data required to insert a new team.
 */
export type TeamInsert = Database["public"]["Tables"]["teams"]["Insert"];
/**
 * Represents the data required to update an existing team.
 */
export type TeamUpdate = Database["public"]["Tables"]["teams"]["Update"];
/**
 * Custom error class for team operations.
 */
export declare class TeamOperationError extends SupabaseOperationError {
    constructor(operation: string, context: string, toastMessage: string, errorCode: SupabaseErrorCode, cause?: unknown);
}
/**
 * Creates a new team in the database.
 *
 * @param {object} params - The parameters for creating a team.
 * @param {SupabaseClient} params.supabase - The Supabase client instance.
 * @param {TeamInsert} params.team - The team data to insert.
 * @returns {Promise<Team>} The created team.
 * @throws {TeamOperationError} If the team creation fails.
 *
 * @example
 * ```typescript
 * const newTeam = await createTeam({
 *   supabase,
 *   team: {
 *     name: 'New Team',
 *     organization_id: 'org-123',
 *     // other fields...
 *   }
 * });
 * ```
 */
export declare function createTeam({ supabase, team, }: {
    supabase: SupabaseClient;
    team: TeamInsert;
}): Promise<Team>;
/**
 * Retrieves a single team by ID.
 *
 * @param {object} params - The parameters for retrieving a team.
 * @param {SupabaseClient} params.supabase - The Supabase client instance.
 * @param {string} params.teamId - The ID of the team to retrieve.
 * @returns {Promise<Team | null>} The team if found, null otherwise.
 * @throws {TeamOperationError} If the query fails.
 *
 * @example
 * ```typescript
 * const team = await getTeam({
 *   supabase,
 *   teamId: 'team-123',
 * });
 * if (team) {
 *   console.log('Team:', team.name);
 * }
 * ```
 */
export declare function getTeam({ supabase, teamId, }: {
    supabase: SupabaseClient;
    teamId: string;
}): Promise<Team | null>;
/**
 * Retrieves all teams for an organization.
 *
 * @param {object} params - The parameters for retrieving teams.
 * @param {SupabaseClient} params.supabase - The Supabase client instance.
 * @param {string} params.organizationId - The ID of the organization.
 * @returns {Promise<Team[]>} Array of teams.
 * @throws {TeamOperationError} If the query fails.
 *
 * @example
 * ```typescript
 * const teams = await getTeams({
 *   supabase,
 *   organizationId: 'org-123',
 * });
 * teams.forEach(team => {
 *   console.log('Team:', team.name);
 * });
 * ```
 */
export declare function getTeams({ supabase, organizationId, }: {
    supabase: SupabaseClient;
    organizationId: string;
}): Promise<Team[]>;
/**
 * Updates an existing team by ID.
 *
 * @param {object} params - The parameters for updating a team.
 * @param {SupabaseClient} params.supabase - The Supabase client instance.
 * @param {string} params.teamId - The ID of the team to update.
 * @param {TeamUpdate} params.team - The team data to update.
 * @returns {Promise<Team>} The updated team.
 * @throws {TeamOperationError} If the update fails.
 *
 * @example
 * ```typescript
 * const updatedTeam = await updateTeam({
 *   supabase,
 *   teamId: 'team-123',
 *   team: {
 *     name: 'Updated Team Name',
 *   },
 * });
 * ```
 */
export declare function updateTeam({ supabase, teamId, team, }: {
    supabase: SupabaseClient;
    teamId: string;
    team: TeamUpdate;
}): Promise<Team>;
/**
 * Deletes a team by ID.
 *
 * @param {object} params - The parameters for deleting a team.
 * @param {SupabaseClient} params.supabase - The Supabase client instance.
 * @param {string} params.teamId - The ID of the team to delete.
 * @returns {Promise<void>}
 * @throws {TeamOperationError} If the deletion fails.
 *
 * @example
 * ```typescript
 * await deleteTeam({
 *   supabase,
 *   teamId: 'team-123',
 * });
 * ```
 */
export declare function deleteTeam({ supabase, teamId, }: {
    supabase: SupabaseClient;
    teamId: string;
}): Promise<void>;
