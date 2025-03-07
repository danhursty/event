import { type UseQueryOptions, type UseMutationOptions, type UseMutationResult } from "@tanstack/react-query";
import { SupabaseClient } from "../index";
import { type Team, type TeamInsert, type TeamUpdate, TeamOperationError } from "./teams";
type QueryKey = readonly [string, ...unknown[]];
/**
 * React Query key factory for team-related queries
 */
export declare const teamKeys: {
    all: readonly ["teams"];
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
export declare const teamQueryKeys: {
    readonly all: readonly ["teams"];
    readonly lists: readonly ["teams", "list"];
    readonly list: (filters: {
        organizationId?: string;
    }) => (string | {
        organizationId?: string;
    })[];
    readonly details: readonly ["teams", "detail"];
    readonly detail: (id: string) => string[];
};
/**
 * Hook for fetching a single team by ID.
 * If teamId is undefined or empty, the query is skipped.
 *
 * @param {object} params - Hook parameters
 * @param {string} [params.teamId] - The ID of the team to fetch
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseQueryOptions<Team | null, TeamOperationError>>} [params.options] - Additional React Query options
 * @returns Query result with data and error
 *
 * @example
 * ```typescript
 * const { data: team, isLoading, error } = useTeam({ teamId: '123', supabase });
 * ```
 */
export declare function useTeam({ teamId, supabase, options, }: {
    teamId: string;
    supabase: SupabaseClient;
    options?: Partial<UseQueryOptions<Team | null, TeamOperationError>>;
}): import("@tanstack/react-query").UseQueryResult<{
    created_at: string | null;
    id: string;
    name: string;
    organization_id: string | null;
    updated_at: string | null;
    website: string | null;
} | null, TeamOperationError>;
/**
 * Hook for fetching all teams for an organization.
 *
 * @param {object} params - Hook parameters
 * @param {string} params.organizationId - The ID of the organization
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseQueryOptions<Team[], TeamOperationError>>} [params.options] - Additional React Query options
 * @returns Query result with data and error
 *
 * @example
 * ```typescript
 * const { data: teams, isLoading, error } = useTeams({ organizationId: '123', supabase });
 * ```
 */
export declare function useTeams({ organizationId, supabase, options, }: {
    organizationId: string;
    supabase: SupabaseClient;
    options?: Partial<UseQueryOptions<Team[], TeamOperationError>>;
}): import("@tanstack/react-query").UseQueryResult<{
    created_at: string | null;
    id: string;
    name: string;
    organization_id: string | null;
    updated_at: string | null;
    website: string | null;
}[], TeamOperationError>;
/**
 * Hook for creating a new team, with toast notifications.
 *
 * @param {object} params - Hook parameters
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseMutationOptions<Team, TeamOperationError, { team: TeamInsert }>>} [params.options] - Mutation options
 * @returns Mutation result with status and handlers
 *
 * @example
 * ```typescript
 * const { mutate: executeCreateTeam, isLoading } = useCreateTeam({
 *   supabase,
 *   options: {
 *     onSuccess: (newTeam) => {
 *       console.log('Team created:', newTeam);
 *     },
 *   },
 * });
 *
 * executeCreateTeam({ team: { name: 'New Team', organization_id: 'org-123' } });
 * ```
 */
export declare function useCreateTeam({ supabase, options, }: {
    supabase: SupabaseClient;
    options?: Partial<UseMutationOptions<Team, TeamOperationError, {
        team: TeamInsert;
    }>>;
}): UseMutationResult<Team, TeamOperationError, {
    team: TeamInsert;
}>;
/**
 * Hook for updating an existing team by ID, with toast notifications.
 *
 * @param {object} params - Hook parameters
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseMutationOptions<Team, TeamOperationError, { teamId: string; team: TeamUpdate }>>} [params.options] - Mutation options
 * @returns Mutation result with status and handlers
 *
 * @example
 * ```typescript
 * const { mutate: executeUpdateTeam, isLoading } = useUpdateTeam({
 *   supabase,
 *   options: {
 *     onSuccess: (updatedTeam) => {
 *       console.log('Team updated:', updatedTeam);
 *     },
 *   },
 * });
 *
 * executeUpdateTeam({ teamId: '123', team: { name: 'Updated Name' } });
 * ```
 */
export declare function useUpdateTeam({ supabase, options, }: {
    supabase: SupabaseClient;
    options?: Partial<UseMutationOptions<Team, TeamOperationError, {
        teamId: string;
        team: TeamUpdate;
    }>>;
}): UseMutationResult<Team, TeamOperationError, {
    teamId: string;
    team: TeamUpdate;
}>;
/**
 * Hook for deleting a team by ID, with toast notifications.
 *
 * @param {object} params - Hook parameters
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseMutationOptions<void, TeamOperationError, { teamId: string }>>} [params.options] - Mutation options
 * @returns Mutation result with status and handlers
 *
 * @example
 * ```typescript
 * const { mutate: executeDeleteTeam, isLoading } = useDeleteTeam({
 *   supabase,
 *   options: {
 *     onSuccess: () => {
 *       console.log('Team deleted');
 *     },
 *   },
 * });
 *
 * executeDeleteTeam({ teamId: '123' });
 * ```
 */
export declare function useDeleteTeam({ supabase, options, }: {
    supabase: SupabaseClient;
    options?: Partial<UseMutationOptions<void, TeamOperationError, {
        teamId: string;
    }>>;
}): UseMutationResult<void, TeamOperationError, {
    teamId: string;
}>;
export {};
//# sourceMappingURL=teams.react.d.ts.map