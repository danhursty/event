import { useMutation, useQuery, useQueryClient, } from '@tanstack/react-query';
import { getUserOnboarding, updateOnboardingStep, } from './onboarding';
/**
 * Custom error class for handling onboarding-related errors with additional context
 *
 * @example
 * ```ts
 * // Create a new error
 * const error = new OnboardingError('Failed to fetch onboarding', 'FETCH_ERROR', 500)
 *
 * // Convert from unknown error
 * try {
 *   await someOperation()
 * } catch (err) {
 *   throw OnboardingError.fromError(err, 'OPERATION_ERROR')
 * }
 * ```
 */
export class OnboardingError extends Error {
    constructor(message, code, status) {
        super(message);
        this.code = code;
        this.status = status;
        this.name = 'OnboardingError';
    }
    static fromError(err, code = 'UNKNOWN_ERROR', status = 500) {
        if (err instanceof Error) {
            return new OnboardingError(err.message, err instanceof OnboardingError ? err.code : code, err instanceof OnboardingError ? err.status : status);
        }
        return new OnboardingError('An unknown error occurred', code, status);
    }
}
/**
 * Query key factory for onboarding with proper type safety
 *
 * @example
 * ```ts
 * // Get base key
 * const baseKey = onboardingKeys.all() // ['onboarding']
 *
 * // Get list key with filters
 * const listKey = onboardingKeys.list({ filters: { status: 'active' } })
 *
 * // Get detail key for specific user
 * const detailKey = onboardingKeys.detail({ userId: '123' })
 *
 * // Get steps key for specific user
 * const stepsKey = onboardingKeys.steps({ userId: '123' })
 * ```
 */
export const onboardingKeys = {
    all: () => ['onboarding'],
    lists: () => [...onboardingKeys.all(), 'list'],
    list: ({ filters }) => [
        ...onboardingKeys.lists(),
        { filters },
    ],
    details: () => [...onboardingKeys.all(), 'detail'],
    detail: ({ userId }) => [
        ...onboardingKeys.details(),
        userId,
    ],
    steps: ({ userId }) => [
        ...onboardingKeys.detail({ userId }),
        'steps',
    ],
};
/**
 * Query options factory for onboarding queries with error handling
 *
 * @example
 * ```ts
 * // Use in a custom query
 * const { data } = useQuery({
 *   ...onboardingQueries.detail({
 *     supabase,
 *     userId: '123'
 *   })
 * })
 * ```
 */
export const onboardingQueries = {
    detail: ({ supabase, userId, }) => ({
        queryKey: onboardingKeys.detail({ userId }),
        queryFn: async () => {
            try {
                const data = await getUserOnboarding({ supabase, userId });
                if (!data) {
                    throw new OnboardingError('Onboarding not found', 'NOT_FOUND', 404);
                }
                return data;
            }
            catch (err) {
                throw OnboardingError.fromError(err, 'FETCH_ERROR');
            }
        },
    }),
};
/**
 * React hook to fetch a user's onboarding status with type safety and error handling
 *
 * @example
 * ```ts
 * // Basic usage
 * const { data, error } = useGetUserOnboarding({
 *   supabase,
 *   userId: '123'
 * })
 *
 * // With enabled flag
 * const { data, error } = useGetUserOnboarding({
 *   supabase,
 *   userId: '123',
 *   enabled: isReady
 * })
 *
 * if (error) {
 *   console.error('Failed to fetch onboarding:', error.message)
 * }
 * ```
 */
export const useGetUserOnboarding = ({ supabase, userId, enabled = true, }) => {
    return useQuery({
        ...onboardingQueries.detail({ supabase, userId }),
        enabled: Boolean(userId) && enabled,
    });
};
/**
 * React hook to update onboarding progress with optimistic updates and error handling
 *
 * @example
 * ```ts
 * // Basic usage
 * const mutation = useUpdateOnboardingStep({ supabase })
 *
 * // Update current step
 * mutation.mutate({
 *   userId: '123',
 *   currentStep: 'PROFILE_SETUP',
 *   isCompleted: true,
 *   metadata: { completedAt: new Date().toISOString() }
 * })
 *
 * // Handle success/error
 * if (mutation.isSuccess) {
 *   console.log('Successfully updated onboarding')
 * }
 * if (mutation.error) {
 *   console.error('Failed to update:', mutation.error.message)
 * }
 * ```
 */
export const useUpdateOnboardingStep = ({ supabase }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ userId, currentStep, isCompleted, metadata }) => {
            try {
                const data = await updateOnboardingStep({
                    supabase,
                    userId,
                    currentStep,
                    isCompleted,
                    metadata,
                });
                if (!data) {
                    throw new OnboardingError('Failed to update onboarding', 'UPDATE_FAILED');
                }
                return data;
            }
            catch (err) {
                throw OnboardingError.fromError(err, 'UPDATE_ERROR');
            }
        },
        onMutate: async ({ userId, currentStep, isCompleted, metadata }) => {
            await queryClient.cancelQueries({
                queryKey: onboardingKeys.detail({ userId }),
            });
            const previousData = queryClient.getQueryData(onboardingKeys.detail({ userId }));
            if (previousData) {
                const completedSteps = previousData.completed_steps ?? [];
                if (!completedSteps.includes(currentStep)) {
                    completedSteps.push(currentStep);
                }
                const existingMetadata = (previousData.metadata ?? {});
                const newMetadata = (metadata ?? {});
                const updatedData = {
                    ...previousData,
                    current_step: currentStep,
                    completed_steps: completedSteps,
                    is_completed: isCompleted ?? previousData.is_completed,
                    metadata: { ...existingMetadata, ...newMetadata },
                };
                queryClient.setQueryData(onboardingKeys.detail({ userId }), updatedData);
            }
            return { previousData };
        },
        onError: (err, { userId }, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(onboardingKeys.detail({ userId }), context.previousData);
            }
        },
        onSuccess: (data, { userId }) => {
            void queryClient.invalidateQueries({
                queryKey: onboardingKeys.detail({ userId }),
            });
            void queryClient.invalidateQueries({
                queryKey: onboardingKeys.lists(),
            });
        },
    });
};
