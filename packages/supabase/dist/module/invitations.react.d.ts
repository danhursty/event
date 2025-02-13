import { type UseQueryOptions, type UseMutationOptions, type UseMutationResult } from "@tanstack/react-query";
import type { Database } from "@repo/supabase";
import type { MembershipType } from "@repo/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";
import { SupabaseOperationError, SupabaseErrorCode } from "../errors";
export type Invitation = Database["public"]["Tables"]["invitations"]["Row"];
interface InviteMemberParams {
    organizationId: string;
    membershipType: MembershipType;
    email: string;
    roleId: string;
    teamId?: string | null;
    invitedBy: string;
    organizationName: string;
    inviterName: string;
}
type InviteOrgMemberResponse = {
    token: string;
    id: string;
    email: string;
    organization_id: string;
    role_id: string;
    role_name: string;
    membership_type: MembershipType;
    expires_at: string;
};
type QueryKey = readonly [string, ...unknown[]];
/**
 * React Query key factory for invitation-related queries
 */
export declare const invitationKeys: {
    all: readonly ["invitations"];
    lists: () => QueryKey;
    list: (filters: {
        teamId?: string | null;
        includeNoTeam?: boolean;
    }) => QueryKey;
    details: () => QueryKey;
    detail: (id: string) => QueryKey;
};
/**
 * Static query keys for server-side usage
 */
export declare const invitationQueryKeys: {
    readonly all: readonly ["invitations"];
    readonly lists: readonly ["invitations", "list"];
    readonly list: (filters: {
        teamId?: string | null;
    }) => (string | {
        teamId?: string | null;
    })[];
    readonly details: readonly ["invitations", "detail"];
    readonly detail: (id: string) => string[];
};
/**
 * Custom error class for invitation operations.
 */
export declare class InvitationOperationError extends SupabaseOperationError {
    constructor(operation: string, context: string, toastMessage: string, errorCode: SupabaseErrorCode, cause?: unknown);
}
/**
 * Hook for inviting a member to an organization or team, with toast notifications.
 *
 * @param {object} params - Hook parameters
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseMutationOptions<InviteOrgMemberResponse, Error, InviteMemberParams>>} [params.options] - Mutation options
 * @returns Mutation result with status and handlers
 */
export declare function useInviteMember({ supabase, options, }: {
    supabase: SupabaseClient;
    options?: Partial<UseMutationOptions<InviteOrgMemberResponse, Error, InviteMemberParams>>;
}): UseMutationResult<InviteOrgMemberResponse, Error, InviteMemberParams>;
/**
 * Options for fetching invitations.
 */
interface UseInvitationsOptions {
    teamId?: string;
    /**
     * If true, includes any invitation where team_id is null,
     * effectively "global" or "org-level" invites that appear everywhere.
     */
    includeNoTeam?: boolean;
    supabase: SupabaseClient;
    options?: Partial<UseQueryOptions<Invitation[], Error>>;
}
/**
 * Hook for fetching all pending invitations for a team (or globally).
 *
 * @param {object} params - Hook parameters
 * @param {string} [params.teamId] - The ID of the team
 * @param {boolean} [params.includeNoTeam=false] - If true, also fetch invitations where team_id is null
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseQueryOptions<Invitation[], Error>>} [params.options] - Additional React Query options
 * @returns Query result with data and error
 */
export declare function useInvitations({ teamId, includeNoTeam, supabase, options, }: UseInvitationsOptions): import("@tanstack/react-query").UseQueryResult<{
    accepted_at: string | null;
    created_at: string | null;
    email: string;
    expires_at: string;
    id: string;
    invited_by: string | null;
    membership_type: Database["public"]["Enums"]["membership_type"];
    organization_id: string | null;
    role_id: string | null;
    team_id: string | null;
    token: string;
    updated_at: string | null;
}[], Error>;
/**
 * Hook for revoking an invitation, with toast notifications.
 *
 * @param {object} params - Hook parameters
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseMutationOptions<void, Error, { token: string; teamId: string }>>} [params.options] - Mutation options
 * @returns Mutation result with status and handlers
 */
export declare function useRevokeInvitation({ supabase, options, }: {
    supabase: SupabaseClient;
    options?: Partial<UseMutationOptions<void, Error, {
        token: string;
        teamId: string;
    }>>;
}): UseMutationResult<void, Error, {
    token: string;
    teamId: string;
}>;
export {};
