import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';
export type Json = Database['public']['CompositeTypes'];
export type PaymentProvider = Database['public']['Tables']['payment_providers']['Row'];
export type PaymentProviderAccount = Database['public']['Tables']['payment_provider_accounts']['Row'];
export type PaymentMethod = Database['public']['Tables']['payment_methods']['Row'];
export type PaymentAccountWithMethods = PaymentProviderAccount & {
    methods: PaymentMethod[];
};
/**
 * Gets the default payment account for an owner
 */
export declare const getPaymentAccount: ({ supabase, ownerType, ownerId, providerName, }: {
    supabase: SupabaseClient<Database>;
    ownerType: "user" | "organization";
    ownerId: string;
    providerName?: string;
}) => Promise<PaymentProviderAccount | null>;
/**
 * Gets payment methods for an account
 */
export declare const getPaymentMethods: ({ supabase, accountId, }: {
    supabase: SupabaseClient<Database>;
    accountId: string;
}) => Promise<PaymentMethod[]>;
/**
 * Gets a payment account with its methods
 */
export declare const getPaymentAccountWithMethods: ({ supabase, ownerType, ownerId, providerName, }: {
    supabase: SupabaseClient<Database>;
    ownerType: "user" | "organization";
    ownerId: string;
    providerName?: string;
}) => Promise<PaymentAccountWithMethods | null>;
/**
 * Creates a new payment provider account
 */
export declare const createPaymentAccount: ({ supabase, providerId, ownerType, ownerId, providerCustomerId, providerData, isDefault, }: {
    supabase: SupabaseClient<Database>;
    providerId: string;
    ownerType: "user" | "organization";
    ownerId: string;
    providerCustomerId: string;
    providerData?: Record<string, unknown>;
    isDefault?: boolean;
}) => Promise<PaymentProviderAccount>;
/**
 * Adds a payment method to an account
 */
export declare const addPaymentMethod: ({ supabase, accountId, providerPaymentMethodId, type, providerData, isDefault, }: {
    supabase: SupabaseClient<Database>;
    accountId: string;
    providerPaymentMethodId: string;
    type: string;
    providerData?: Record<string, unknown>;
    isDefault?: boolean;
}) => Promise<PaymentMethod>;
/**
 * Updates a payment method
 */
export declare const updatePaymentMethod: ({ supabase, id, isDefault, providerData, }: {
    supabase: SupabaseClient<Database>;
    id: string;
    isDefault?: boolean;
    providerData?: Record<string, unknown>;
}) => Promise<PaymentMethod>;
/**
 * Removes a payment method
 */
export declare const removePaymentMethod: ({ supabase, id, }: {
    supabase: SupabaseClient<Database>;
    id: string;
}) => Promise<void>;
//# sourceMappingURL=payments.d.ts.map