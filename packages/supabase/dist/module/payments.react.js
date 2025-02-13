import { useMutation, useQuery, useQueryClient, } from '@tanstack/react-query';
import { addPaymentMethod, createPaymentAccount, getPaymentAccount, getPaymentAccountWithMethods, getPaymentMethods, removePaymentMethod, updatePaymentMethod, } from './payments';
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
export class PaymentError extends Error {
    constructor(message, code, status) {
        super(message);
        this.code = code;
        this.status = status;
        this.name = 'PaymentError';
    }
    static fromError(err, code = 'UNKNOWN_ERROR', status = 500) {
        if (err instanceof Error) {
            return new PaymentError(err.message, err instanceof PaymentError ? err.code : code, err instanceof PaymentError ? err.status : status);
        }
        return new PaymentError('An unknown error occurred', code, status);
    }
}
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
export const paymentKeys = {
    all: () => ['payments'],
    account: ({ ownerType, ownerId, }) => [...paymentKeys.all(), 'account', ownerType, ownerId],
    methods: ({ accountId }) => [
        ...paymentKeys.all(),
        'methods',
        accountId,
    ],
    accountWithMethods: ({ ownerType, ownerId, }) => [
        ...paymentKeys.all(),
        'account-with-methods',
        ownerType,
        ownerId,
    ],
};
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
export const paymentQueries = {
    account: ({ supabase, ownerType, ownerId, providerName, }) => ({
        queryKey: paymentKeys.account({ ownerType, ownerId }),
        queryFn: async () => {
            try {
                const data = await getPaymentAccount({
                    supabase,
                    ownerType,
                    ownerId,
                    providerName,
                });
                if (!data) {
                    throw new PaymentError('Payment account not found', 'NOT_FOUND', 404);
                }
                return data;
            }
            catch (err) {
                throw PaymentError.fromError(err, 'FETCH_ERROR');
            }
        },
    }),
    methods: ({ supabase, accountId, }) => ({
        queryKey: paymentKeys.methods({ accountId }),
        queryFn: async () => {
            try {
                return await getPaymentMethods({ supabase, accountId });
            }
            catch (err) {
                throw PaymentError.fromError(err, 'FETCH_ERROR');
            }
        },
    }),
    accountWithMethods: ({ supabase, ownerType, ownerId, providerName, }) => ({
        queryKey: paymentKeys.accountWithMethods({ ownerType, ownerId }),
        queryFn: async () => {
            try {
                const data = await getPaymentAccountWithMethods({
                    supabase,
                    ownerType,
                    ownerId,
                    providerName,
                });
                if (!data) {
                    throw new PaymentError('Payment account not found', 'NOT_FOUND', 404);
                }
                return data;
            }
            catch (err) {
                throw PaymentError.fromError(err, 'FETCH_ERROR');
            }
        },
    }),
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
export const useGetPaymentAccount = ({ supabase, ownerType, ownerId, providerName, enabled = true, }) => {
    const { data, error } = useQuery({
        ...paymentQueries.account({ supabase, ownerType, ownerId, providerName }),
        enabled: Boolean(ownerId) && enabled,
    });
    return {
        data: data ?? null,
        error: error ?? null,
    };
};
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
export const useGetPaymentMethods = ({ supabase, accountId, enabled = true, }) => {
    const { data, error } = useQuery({
        ...paymentQueries.methods({ supabase, accountId }),
        enabled: Boolean(accountId) && enabled,
    });
    return {
        data: data ?? [],
        error: error ?? null,
    };
};
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
export const useGetPaymentAccountWithMethods = ({ supabase, ownerType, ownerId, providerName, enabled = true, }) => {
    const { data, error } = useQuery({
        ...paymentQueries.accountWithMethods({
            supabase,
            ownerType,
            ownerId,
            providerName,
        }),
        enabled: Boolean(ownerId) && enabled,
    });
    return {
        data: data ?? null,
        error: error ?? null,
    };
};
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
export const useCreatePaymentAccount = ({ supabase }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ providerId, ownerType, ownerId, providerCustomerId, providerData, isDefault, }) => {
            try {
                return await createPaymentAccount({
                    supabase,
                    providerId,
                    ownerType,
                    ownerId,
                    providerCustomerId,
                    providerData,
                    isDefault,
                });
            }
            catch (err) {
                throw PaymentError.fromError(err, 'CREATE_ERROR');
            }
        },
        onSuccess: (_, { ownerType, ownerId }) => {
            void queryClient.invalidateQueries({
                queryKey: paymentKeys.account({ ownerType, ownerId }),
            });
            void queryClient.invalidateQueries({
                queryKey: paymentKeys.accountWithMethods({ ownerType, ownerId }),
            });
        },
    });
};
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
export const useAddPaymentMethod = ({ supabase }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ accountId, providerPaymentMethodId, type, providerData, isDefault, }) => {
            try {
                return await addPaymentMethod({
                    supabase,
                    accountId,
                    providerPaymentMethodId,
                    type,
                    providerData,
                    isDefault,
                });
            }
            catch (err) {
                throw PaymentError.fromError(err, 'ADD_ERROR');
            }
        },
        onSuccess: (_, { accountId, ownerType, ownerId }) => {
            void queryClient.invalidateQueries({
                queryKey: paymentKeys.methods({ accountId }),
            });
            void queryClient.invalidateQueries({
                queryKey: paymentKeys.accountWithMethods({ ownerType, ownerId }),
            });
        },
    });
};
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
export const useUpdatePaymentMethod = ({ supabase }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, isDefault, providerData }) => {
            try {
                return await updatePaymentMethod({
                    supabase,
                    id,
                    isDefault,
                    providerData,
                });
            }
            catch (err) {
                throw PaymentError.fromError(err, 'UPDATE_ERROR');
            }
        },
        onMutate: async ({ accountId, isDefault, ...request }) => {
            await queryClient.cancelQueries({
                queryKey: paymentKeys.methods({ accountId }),
            });
            const previousMethods = queryClient.getQueryData(paymentKeys.methods({ accountId }));
            if (previousMethods && isDefault !== undefined) {
                const updatedMethods = previousMethods.map((method) => ({
                    ...method,
                    is_default: method.id === request.id ? isDefault : false,
                }));
                queryClient.setQueryData(paymentKeys.methods({ accountId }), updatedMethods);
            }
            return { previousMethods };
        },
        onError: (err, { accountId }, context) => {
            if (context?.previousMethods) {
                queryClient.setQueryData(paymentKeys.methods({ accountId }), context.previousMethods);
            }
        },
        onSuccess: (_, { accountId, ownerType, ownerId }) => {
            void queryClient.invalidateQueries({
                queryKey: paymentKeys.methods({ accountId }),
            });
            void queryClient.invalidateQueries({
                queryKey: paymentKeys.accountWithMethods({ ownerType, ownerId }),
            });
        },
    });
};
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
export const useRemovePaymentMethod = ({ supabase }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id }) => {
            try {
                await removePaymentMethod({ supabase, id });
                return true;
            }
            catch (err) {
                throw PaymentError.fromError(err, 'REMOVE_ERROR');
            }
        },
        onMutate: async ({ accountId, id }) => {
            await queryClient.cancelQueries({
                queryKey: paymentKeys.methods({ accountId }),
            });
            const previousMethods = queryClient.getQueryData(paymentKeys.methods({ accountId }));
            if (previousMethods) {
                const updatedMethods = previousMethods.filter((method) => method.id !== id);
                queryClient.setQueryData(paymentKeys.methods({ accountId }), updatedMethods);
            }
            return { previousMethods };
        },
        onError: (err, { accountId }, context) => {
            if (context?.previousMethods) {
                queryClient.setQueryData(paymentKeys.methods({ accountId }), context.previousMethods);
            }
        },
        onSuccess: (_, { accountId, ownerType, ownerId }) => {
            void queryClient.invalidateQueries({
                queryKey: paymentKeys.methods({ accountId }),
            });
            void queryClient.invalidateQueries({
                queryKey: paymentKeys.accountWithMethods({ ownerType, ownerId }),
            });
        },
    });
};
