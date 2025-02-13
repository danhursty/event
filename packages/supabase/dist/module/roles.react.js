"use client";
import { useQuery } from "@tanstack/react-query";
import { getRoles } from "./roles";
/**
 * React Query key factory for role-related queries
 */
export const roleKeys = {
    all: ["roles"],
    lists: () => [...roleKeys.all, "list"],
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
export function useRoles({ supabase, options = {}, }) {
    return useQuery({
        queryKey: roleKeys.lists(),
        queryFn: async () => getRoles({ supabase }),
        ...options,
    });
}
