import { type UseQueryOptions } from '@tanstack/react-query';
import { UserOnboarding } from './onboarding';
import type { SupabaseProps, QueryEnabledProps } from '../types/react-query';
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
export declare class OnboardingError extends Error {
    readonly code?: string | undefined;
    readonly status?: number | undefined;
    constructor(message: string, code?: string | undefined, status?: number | undefined);
    static fromError(err: unknown, code?: string, status?: number): OnboardingError;
}
type BaseKey = ['onboarding'];
type ListKey = [...BaseKey, 'list', {
    filters: Record<string, unknown>;
}];
type DetailKey = [...BaseKey, 'detail', string];
type StepsKey = [...DetailKey, 'steps'];
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
export declare const onboardingKeys: {
    readonly all: () => BaseKey;
    readonly lists: () => readonly ["onboarding", "list"];
    readonly list: ({ filters }: {
        filters: Record<string, unknown>;
    }) => ListKey;
    readonly details: () => readonly ["onboarding", "detail"];
    readonly detail: ({ userId }: {
        userId: string;
    }) => DetailKey;
    readonly steps: ({ userId }: {
        userId: string;
    }) => StepsKey;
};
type OnboardingQueryParams = SupabaseProps & {
    userId: string;
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
export declare const onboardingQueries: {
    detail: ({ supabase, userId, }: OnboardingQueryParams) => UseQueryOptions<UserOnboarding, OnboardingError>;
};
type GetUserOnboardingParams = OnboardingQueryParams & QueryEnabledProps;
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
export declare const useGetUserOnboarding: ({ supabase, userId, enabled, }: GetUserOnboardingParams) => any;
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
export declare const useUpdateOnboardingStep: ({ supabase }: SupabaseProps) => any;
export {};
//# sourceMappingURL=onboarding.react.d.ts.map