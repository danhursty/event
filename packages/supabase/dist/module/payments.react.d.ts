import { type UseQueryOptions } from '@tanstack/react-query';
import { type PaymentAccountWithMethods, type PaymentMethod, type PaymentProviderAccount } from './payments';
import type { QueryEnabledProps, SupabaseProps } from '../types/react-query';
type PaymentResponse<T> = {
    data: T;
    error: PaymentError | null;
};
/**
 * Custom error class for handling payment-related errors with additional context
 *
 * @example
 * ```ts
 * // Create a new error
 * const error = new PaymentError('Payment method not found', 'NOT_FOUND', 404)
 *
 * // Convert from unknown error
 * try {
 *   await someOperation()
 * } catch (err) {
 *   throw PaymentError.fromError(err, 'OPERATION_ERROR')
 * }
 * ```
 */
export declare class PaymentError extends Error {
    readonly code?: string | undefined;
    readonly status?: number | undefined;
    constructor(message: string, code?: string | undefined, status?: number | undefined);
    static fromError(err: unknown, code?: string, status?: number): PaymentError;
}
type BaseKey = ['payments'];
type AccountKey = [...BaseKey, 'account', string, string];
type MethodsKey = [...BaseKey, 'methods', string];
type AccountWithMethodsKey = [
    ...BaseKey,
    'account-with-methods',
    string,
    string
];
/**
 * Query key factory for payments with proper type safety
 *
 * @example
 * ```ts
 * // Get base key
 * const baseKey = paymentKeys.all() // ['payments']
 *
 * // Get account key
 * const accountKey = paymentKeys.account({
 *   ownerType: 'organization',
 *   ownerId: '123'
 * })
 *
 * // Get methods key
 * const methodsKey = paymentKeys.methods({ accountId: '123' })
 *
 * // Get account with methods key
 * const accountWithMethodsKey = paymentKeys.accountWithMethods({
 *   ownerType: 'organization',
 *   ownerId: '123'
 * })
 * ```
 */
export declare const paymentKeys: {
    readonly all: () => BaseKey;
    readonly account: ({ ownerType, ownerId, }: {
        ownerType: "user" | "organization";
        ownerId: string;
    }) => AccountKey;
    readonly methods: ({ accountId }: {
        accountId: string;
    }) => MethodsKey;
    readonly accountWithMethods: ({ ownerType, ownerId, }: {
        ownerType: "user" | "organization";
        ownerId: string;
    }) => AccountWithMethodsKey;
};
type GetPaymentAccountParams = SupabaseProps & {
    ownerType: 'user' | 'organization';
    ownerId: string;
    providerName?: string;
} & QueryEnabledProps;
/**
 * Query options factory for payment queries with error handling
 *
 * @example
 * ```ts
 * // Use in a custom query
 * const { data } = useQuery({
 *   ...paymentQueries.account({
 *     supabase,
 *     ownerType: 'organization',
 *     ownerId: '123'
 *   })
 * })
 * ```
 */
export declare const paymentQueries: {
    account: ({ supabase, ownerType, ownerId, providerName, }: Omit<GetPaymentAccountParams, "enabled">) => UseQueryOptions<PaymentProviderAccount, PaymentError>;
    methods: ({ supabase, accountId, }: SupabaseProps & {
        accountId: string;
    }) => UseQueryOptions<PaymentMethod[], PaymentError>;
    accountWithMethods: ({ supabase, ownerType, ownerId, providerName, }: Omit<GetPaymentAccountParams, "enabled">) => UseQueryOptions<PaymentAccountWithMethods, PaymentError>;
};
/**
 * React hook to fetch a payment account with type safety and error handling
 *
 * @example
 * ```ts
 * // Basic usage
 * const { data, error } = useGetPaymentAccount({
 *   supabase,
 *   ownerType: 'organization',
 *   ownerId: '123'
 * })
 *
 * // With provider name
 * const { data, error } = useGetPaymentAccount({
 *   supabase,
 *   ownerType: 'organization',
 *   ownerId: '123',
 *   providerName: 'stripe'
 * })
 * ```
 */
export declare const useGetPaymentAccount: ({ supabase, ownerType, ownerId, providerName, enabled, }: GetPaymentAccountParams) => PaymentResponse<PaymentProviderAccount | null>;
type GetPaymentMethodsParams = SupabaseProps & {
    accountId: string;
} & QueryEnabledProps;
/**
 * React hook to fetch payment methods with type safety and error handling
 *
 * @example
 * ```ts
 * const { data, error } = useGetPaymentMethods({
 *   supabase,
 *   accountId: '123'
 * })
 * ```
 */
export declare const useGetPaymentMethods: ({ supabase, accountId, enabled, }: GetPaymentMethodsParams) => PaymentResponse<PaymentMethod[]>;
/**
 * React hook to fetch a payment account with its methods
 *
 * @example
 * ```ts
 * const { data, error } = useGetPaymentAccountWithMethods({
 *   supabase,
 *   ownerType: 'organization',
 *   ownerId: '123'
 * })
 * ```
 */
export declare const useGetPaymentAccountWithMethods: ({ supabase, ownerType, ownerId, providerName, enabled, }: GetPaymentAccountParams) => PaymentResponse<PaymentAccountWithMethods | null>;
/**
 * React hook to create a new payment account with error handling
 *
 * @example
 * ```ts
 * const mutation = useCreatePaymentAccount({ supabase })
 *
 * // Create account
 * mutation.mutate({
 *   providerId: 'stripe',
 *   ownerType: 'organization',
 *   ownerId: '123',
 *   providerCustomerId: 'cus_123',
 *   isDefault: true
 * })
 * ```
 */
export declare const useCreatePaymentAccount: ({ supabase }: SupabaseProps) => any;
/**
 * React hook to add a payment method with optimistic updates and error handling
 *
 * @example
 * ```ts
 * const mutation = useAddPaymentMethod({ supabase })
 *
 * // Add method
 * mutation.mutate({
 *   accountId: '123',
 *   ownerType: 'organization',
 *   ownerId: '456',
 *   providerPaymentMethodId: 'pm_789',
 *   type: 'card',
 *   isDefault: true
 * })
 * ```
 */
export declare const useAddPaymentMethod: ({ supabase }: SupabaseProps) => any;
/**
 * React hook to update a payment method with optimistic updates and error handling
 *
 * @example
 * ```ts
 * const mutation = useUpdatePaymentMethod({ supabase })
 *
 * // Update method
 * mutation.mutate({
 *   id: '123',
 *   accountId: '456',
 *   ownerType: 'organization',
 *   ownerId: '789',
 *   isDefault: true
 * })
 * ```
 */
export declare const useUpdatePaymentMethod: ({ supabase }: SupabaseProps) => any;
/**
 * React hook to remove a payment method with optimistic updates and error handling
 *
 * @example
 * ```ts
 * const mutation = useRemovePaymentMethod({ supabase })
 *
 * // Remove method
 * mutation.mutate({
 *   id: '123',
 *   accountId: '456',
 *   ownerType: 'organization',
 *   ownerId: '789'
 * })
 * ```
 */
export declare const useRemovePaymentMethod: ({ supabase }: SupabaseProps) => any;
export {};
//# sourceMappingURL=payments.react.d.ts.map