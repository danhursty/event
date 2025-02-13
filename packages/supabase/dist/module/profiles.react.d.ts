/**
 * Import statements for required dependencies
 */
import { SupabaseClient } from '@supabase/supabase-js';
import { type UseQueryOptions } from '@tanstack/react-query';
import type { Database } from '../database.types';
import { Profile } from './profiles';
type SupabaseProps = {
    supabase: SupabaseClient<Database>;
};
type QueryEnabledProps = {
    enabled?: boolean;
};
/**
 * Custom error class for handling profile-related errors with additional context
 *
 * @example
 * ```ts
 * // Create a new error
 * const error = new ProfileError('Profile not found', 'NOT_FOUND', 404)
 *
 * // Convert from unknown error
 * try {
 *   await someOperation()
 * } catch (err) {
 *   throw ProfileError.fromError(err, 'OPERATION_ERROR')
 * }
 * ```
 */
export declare class ProfileError extends Error {
    readonly code?: string | undefined;
    readonly status?: number | undefined;
    constructor(message: string, code?: string | undefined, status?: number | undefined);
    static fromError(err: unknown, code?: string, status?: number): ProfileError;
}
type BaseKey = ['profiles'];
type ListKey = [...BaseKey, 'list', {
    filters: Record<string, unknown>;
}];
type DetailKey = [...BaseKey, 'detail', string];
/**
 * Query key factory for profiles with proper type safety
 *
 * @example
 * ```ts
 * // Get base key
 * const baseKey = profileKeys.all() // ['profiles']
 *
 * // Get list key with filters
 * const listKey = profileKeys.list({ filters: { role: 'admin' } })
 *
 * // Get detail key
 * const detailKey = profileKeys.detail({ id: '123' })
 * ```
 */
export declare const profileKeys: {
    readonly all: () => BaseKey;
    readonly lists: () => readonly ["profiles", "list"];
    readonly list: ({ filters }: {
        filters: Record<string, unknown>;
    }) => ListKey;
    readonly details: () => readonly ["profiles", "detail"];
    readonly detail: ({ id }: {
        id: string;
    }) => DetailKey;
};
type ProfileQueryParams = SupabaseProps & {
    userId: string;
};
/**
 * Query options factory for profile queries with error handling
 *
 * @example
 * ```ts
 * // Use in a custom query
 * const { data } = useQuery({
 *   ...profileQueries.detail({
 *     supabase,
 *     userId: '123'
 *   })
 * })
 * ```
 */
export declare const profileQueries: {
    detail: ({ supabase, userId, }: ProfileQueryParams) => UseQueryOptions<Profile, ProfileError>;
};
type GetProfileParams = ProfileQueryParams & QueryEnabledProps;
/**
 * React hook to fetch a user's profile with type safety and error handling
 *
 * @example
 * ```ts
 * // Basic usage
 * const { data, error } = useGetProfile({
 *   supabase,
 *   userId: '123'
 * })
 *
 * // With enabled flag
 * const { data, error } = useGetProfile({
 *   supabase,
 *   userId: '123',
 *   enabled: isReady
 * })
 * ```
 */
export declare const useGetProfile: ({ supabase, userId, enabled, }: GetProfileParams) => any;
/**
 * React hook to update a user's profile with optimistic updates and error handling
 *
 * @example
 * ```ts
 * const mutation = useUpdateProfile({ supabase })
 *
 * // Update profile
 * mutation.mutate({
 *   userId: '123',
 *   profile: {
 *     full_name: 'John Doe',
 *     avatar_url: 'https://example.com/avatar.jpg'
 *   }
 * })
 * ```
 */
export declare const useUpdateProfile: ({ supabase }: SupabaseProps) => any;
export {};
//# sourceMappingURL=profiles.react.d.ts.map