import { type UseQueryOptions } from "@tanstack/react-query";
import { SupabaseClient } from "../index";
import { type RoleData, RoleOperationError } from "./roles";
type QueryKey = readonly [string, ...unknown[]];
/**
 * React Query key factory for role-related queries
 */
export declare const roleKeys: {
    readonly all: readonly ["roles"];
    readonly lists: () => QueryKey;
};
/**
 * Hook for fetching all roles.
 *
 * @param {object} params - Hook parameters
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseQueryOptions<RoleData[], RoleOperationError>>} [params.options] - Additional React Query options
 * @returns Query result with data and error
 *
 * @example
 * ```typescript
 * const { data: roles, isLoading, error } = useRoles({ supabase });
 * ```
 */
export declare function useRoles({ supabase, options, }: {
    supabase: SupabaseClient;
    options?: Partial<UseQueryOptions<RoleData[], RoleOperationError>>;
}): import("@tanstack/react-query").UseQueryResult<RoleData[], RoleOperationError>;
export type { RoleData };
//# sourceMappingURL=roles.react.d.ts.map