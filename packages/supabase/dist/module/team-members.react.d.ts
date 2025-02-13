import { type UseQueryOptions, type UseMutationOptions, type UseMutationResult } from "@tanstack/react-query";
import { SupabaseClient } from "../index";
import { type TeamMember, type TeamMemberInsert, type TeamMemberUpdate, TeamMemberOperationError } from "./team-members";
type QueryKey = readonly [string, ...unknown[]];
/**
 * React Query key factory for team member-related queries
 */
export declare const teamMemberKeys: {
    all: readonly ["team-members"];
    lists: () => QueryKey;
    list: (filters: {
        teamId?: string;
    }) => QueryKey;
    details: () => QueryKey;
    detail: (id: string) => QueryKey;
};
/**
 * Static query keys for server-side usage
 */
export declare const teamMemberQueryKeys: {
    readonly all: readonly ["team-members"];
    readonly lists: readonly ["team-members", "list"];
    readonly list: (filters: {
        teamId?: string;
    }) => (string | {
        teamId?: string;
    })[];
    readonly details: readonly ["team-members", "detail"];
    readonly detail: (id: string) => string[];
};
/**
 * Hook for fetching a single team member by ID.
 *
 * @param {object} params - Hook parameters
 * @param {string} params.memberId - The ID of the team member to fetch
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseQueryOptions<TeamMember | null, TeamMemberOperationError>>} [params.options] - Additional React Query options
 * @returns Query result with data and error
 *
 * @example
 * ```typescript
 * const { data: member, isLoading, error } = useTeamMember({
 *   memberId: 'member-123',
 *   supabase
 * });
 * ```
 */
export declare function useTeamMember({ memberId, supabase, options, }: {
    memberId: string;
    supabase: SupabaseClient;
    options?: Partial<UseQueryOptions<TeamMember | null, TeamMemberOperationError>>;
}): import("@tanstack/react-query").UseQueryResult<{
    created_at: string | null;
    id: string;
    role_id: string | null;
    team_id: string | null;
    updated_at: string | null;
    user_id: string | null;
} | null, TeamMemberOperationError>;
/**
 * Hook for fetching all members of a team.
 *
 * @param {object} params - Hook parameters
 * @param {string} params.teamId - The ID of the team
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseQueryOptions<TeamMember[], TeamMemberOperationError>>} [params.options] - Additional React Query options
 * @returns Query result with data and error
 *
 * @example
 * ```typescript
 * const { data: members, isLoading, error } = useTeamMembers({
 *   teamId: 'team-123',
 *   supabase
 * });
 * ```
 */
export declare function useTeamMembers({ teamId, supabase, options, }: {
    teamId: string;
    supabase: SupabaseClient;
    options?: Partial<UseQueryOptions<TeamMember[], TeamMemberOperationError>>;
}): import("@tanstack/react-query").UseQueryResult<{
    created_at: string | null;
    id: string;
    role_id: string | null;
    team_id: string | null;
    updated_at: string | null;
    user_id: string | null;
}[], TeamMemberOperationError>;
/**
 * Hook for creating a new team member, with toast notifications.
 *
 * @param {object} params - Hook parameters
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseMutationOptions<TeamMember, TeamMemberOperationError, { member: TeamMemberInsert }>>} [params.options] - Mutation options
 * @returns Mutation result with status and handlers
 *
 * @example
 * ```typescript
 * const { mutate: executeCreateMember } = useCreateTeamMember({
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
 *     team_id: 'team-123',
 *     user_id: 'user-123',
 *     role_id: 'role-123'
 *   }
 * });
 * ```
 */
export declare function useCreateTeamMember({ supabase, options, }: {
    supabase: SupabaseClient;
    options?: Partial<UseMutationOptions<TeamMember, TeamMemberOperationError, {
        member: TeamMemberInsert;
    }>>;
}): UseMutationResult<TeamMember, TeamMemberOperationError, {
    member: TeamMemberInsert;
}>;
/**
 * Hook for updating a team member, with toast notifications.
 *
 * @param {object} params - Hook parameters
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseMutationOptions<TeamMember, TeamMemberOperationError, { memberId: string; member: TeamMemberUpdate }>>} [params.options] - Mutation options
 * @returns Mutation result with status and handlers
 *
 * @example
 * ```typescript
 * const { mutate: executeUpdateMember } = useUpdateTeamMember({
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
export declare function useUpdateTeamMember({ supabase, options, }: {
    supabase: SupabaseClient;
    options?: Partial<UseMutationOptions<TeamMember, TeamMemberOperationError, {
        memberId: string;
        member: TeamMemberUpdate;
    }>>;
}): UseMutationResult<TeamMember, TeamMemberOperationError, {
    memberId: string;
    member: TeamMemberUpdate;
}>;
/**
 * Hook for deleting a team member, with toast notifications.
 *
 * @param {object} params - Hook parameters
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseMutationOptions<void, TeamMemberOperationError, { memberId: string; teamId: string }>>} [params.options] - Mutation options
 * @returns Mutation result with status and handlers
 *
 * @example
 * ```typescript
 * const { mutate: executeDeleteMember } = useDeleteTeamMember({
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
 *   teamId: 'team-123'
 * });
 * ```
 */
export declare function useDeleteTeamMember({ supabase, options, }: {
    supabase: SupabaseClient;
    options?: Partial<UseMutationOptions<void, TeamMemberOperationError, {
        memberId: string;
        teamId: string;
    }>>;
}): UseMutationResult<void, TeamMemberOperationError, {
    memberId: string;
    teamId: string;
}>;
export {};
