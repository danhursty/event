import { useMutation, useQuery, useQueryClient, } from '@tanstack/react-query';
import { getProfile, updateProfile } from './profiles';
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
export class ProfileError extends Error {
    constructor(message, code, status) {
        super(message);
        this.code = code;
        this.status = status;
        this.name = 'ProfileError';
    }
    static fromError(err, code = 'UNKNOWN_ERROR', status = 500) {
        if (err instanceof Error) {
            return new ProfileError(err.message, err instanceof ProfileError ? err.code : code, err instanceof ProfileError ? err.status : status);
        }
        return new ProfileError('An unknown error occurred', code, status);
    }
}
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
export const profileKeys = {
    all: () => ['profiles'],
    lists: () => [...profileKeys.all(), 'list'],
    list: ({ filters }) => [
        ...profileKeys.lists(),
        { filters },
    ],
    details: () => [...profileKeys.all(), 'detail'],
    detail: ({ id }) => [...profileKeys.details(), id],
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
export const profileQueries = {
    detail: ({ supabase, userId, }) => ({
        queryKey: profileKeys.detail({ id: userId }),
        queryFn: async () => {
            try {
                const data = await getProfile({ supabase, userId });
                if (!data) {
                    throw new ProfileError('Profile not found', 'NOT_FOUND', 404);
                }
                return data;
            }
            catch (err) {
                throw ProfileError.fromError(err, 'FETCH_ERROR');
            }
        },
    }),
};
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
export const useGetProfile = ({ supabase, userId, enabled = true, }) => {
    return useQuery({
        ...profileQueries.detail({ supabase, userId }),
        enabled: Boolean(userId) && enabled,
    });
};
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
export const useUpdateProfile = ({ supabase }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ userId, profile }) => {
            try {
                const data = await updateProfile({ supabase, userId, profile });
                if (!data) {
                    throw new ProfileError('Failed to update profile', 'UPDATE_FAILED');
                }
                return data;
            }
            catch (err) {
                throw ProfileError.fromError(err, 'UPDATE_ERROR');
            }
        },
        onMutate: async ({ userId, profile }) => {
            await queryClient.cancelQueries({
                queryKey: profileKeys.detail({ id: userId }),
            });
            const previousData = queryClient.getQueryData(profileKeys.detail({ id: userId }));
            if (previousData) {
                queryClient.setQueryData(profileKeys.detail({ id: userId }), {
                    ...previousData,
                    ...profile,
                });
            }
            return { previousData };
        },
        onError: (err, { userId }, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(profileKeys.detail({ id: userId }), context.previousData);
            }
        },
        onSuccess: (data, { userId }) => {
            void queryClient.invalidateQueries({
                queryKey: profileKeys.detail({ id: userId }),
            });
            void queryClient.invalidateQueries({
                queryKey: profileKeys.lists(),
            });
        },
    });
};
