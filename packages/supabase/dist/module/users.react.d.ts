import { type UseQueryOptions, type UseMutationOptions, type UseMutationResult } from "@tanstack/react-query";
import { SupabaseClient } from "../index";
import { type User, type UserInsert, type UserUpdate, type UserList, UserOperationError } from "./users";
type QueryKey = readonly [string, ...unknown[]];
/**
 * React Query key factory for user-related queries
 */
export declare const userKeys: {
    all: readonly ["users"];
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
export declare const userQueryKeys: {
    readonly all: readonly ["users"];
    readonly lists: readonly ["users", "list"];
    readonly list: (filters: {
        organizationId?: string;
    }) => (string | {
        organizationId?: string;
    })[];
    readonly details: readonly ["users", "detail"];
    readonly detail: (id: string) => string[];
};
/**
 * Hook for fetching a single user by ID.
 * If userId is undefined or empty, the query is skipped.
 *
 * @param {object} params - Hook parameters
 * @param {string} [params.userId] - The ID of the user to fetch
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseQueryOptions<User | null, UserOperationError>>} [params.options] - Additional React Query options
 * @returns Query result with data and error
 *
 * @example
 * ```typescript
 * const { data: user, isLoading, error } = useUser({ userId: '123', supabase });
 * ```
 */
export declare function useUser({ userId, supabase, options, }: {
    userId: string;
    supabase: SupabaseClient;
    options?: Partial<UseQueryOptions<User | null, UserOperationError>>;
}): import("@tanstack/react-query").UseQueryResult<{
    avatar: string | null;
    created_at: string | null;
    email: string | null;
    full_name: string | null;
    id: string;
    updated_at: string | null;
} | null, UserOperationError>;
/**
 * Hook for fetching all users.
 *
 * @param {object} params - Hook parameters
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseQueryOptions<UserList, UserOperationError>>} [params.options] - Additional React Query options
 * @returns Query result with data and error
 *
 * @example
 * ```typescript
 * const { data: users, isLoading, error } = useUsers({ supabase });
 * ```
 */
export declare function useUsers({ supabase, options, }: {
    supabase: SupabaseClient;
    options?: Partial<UseQueryOptions<UserList, UserOperationError>>;
}): import("@tanstack/react-query").UseQueryResult<UserList, UserOperationError>;
/**
 * Hook for creating a new user, with toast notifications.
 *
 * @param {object} params - Hook parameters
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseMutationOptions<User, UserOperationError, { user: UserInsert }>>} [params.options] - Mutation options
 * @returns Mutation result with status and handlers
 *
 * @example
 * ```typescript
 * const { mutate: executeCreateUser, isLoading } = useCreateUser({
 *   supabase,
 *   options: {
 *     onSuccess: (newUser) => {
 *       console.log('User created:', newUser);
 *     },
 *   },
 * });
 *
 * executeCreateUser({ user: { full_name: 'John Doe', email: 'john@example.com' } });
 * ```
 */
export declare function useCreateUser({ supabase, options, }: {
    supabase: SupabaseClient;
    options?: Partial<UseMutationOptions<User, UserOperationError, {
        user: UserInsert;
    }>>;
}): UseMutationResult<User, UserOperationError, {
    user: UserInsert;
}>;
/**
 * Hook for updating an existing user by ID, with toast notifications.
 *
 * @param {object} params - Hook parameters
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseMutationOptions<User, UserOperationError, { userId: string; user: UserUpdate }>>} [params.options] - Mutation options
 * @returns Mutation result with status and handlers
 *
 * @example
 * ```typescript
 * const { mutate: executeUpdateUser, isLoading } = useUpdateUser({
 *   supabase,
 *   options: {
 *     onSuccess: (updatedUser) => {
 *       console.log('User updated:', updatedUser);
 *     },
 *   },
 * });
 *
 * executeUpdateUser({ userId: '123', user: { full_name: 'Updated Name' } });
 * ```
 */
export declare function useUpdateUser({ supabase, options, }: {
    supabase: SupabaseClient;
    options?: Partial<UseMutationOptions<User, UserOperationError, {
        userId: string;
        user: UserUpdate;
    }>>;
}): UseMutationResult<User, UserOperationError, {
    userId: string;
    user: UserUpdate;
}>;
/**
 * Hook for deleting a user by ID, with toast notifications.
 *
 * @param {object} params - Hook parameters
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @param {Partial<UseMutationOptions<void, UserOperationError, { userId: string }>>} [params.options] - Mutation options
 * @returns Mutation result with status and handlers
 *
 * @example
 * ```typescript
 * const { mutate: executeDeleteUser, isLoading } = useDeleteUser({
 *   supabase,
 *   options: {
 *     onSuccess: () => {
 *       console.log('User deleted');
 *     },
 *   },
 * });
 *
 * executeDeleteUser({ userId: '123' });
 * ```
 */
export declare function useDeleteUser({ supabase, options, }: {
    supabase: SupabaseClient;
    options?: Partial<UseMutationOptions<void, UserOperationError, {
        userId: string;
    }>>;
}): UseMutationResult<void, UserOperationError, {
    userId: string;
}>;
export {};
