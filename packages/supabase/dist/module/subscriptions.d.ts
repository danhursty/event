import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';
import type { SubscriberType } from '../types';
import type { SubscriptionPlan } from './subscription-plans';
import type { PaymentProviderAccount } from './payments';
export type Subscription = Database['public']['Tables']['subscriptions']['Row'];
export type SubscriptionStatus = 'active' | 'inactive' | 'past_due' | 'canceled';
export type SubscriptionWithPlan = Omit<Subscription, 'plan_id'> & {
    plan: SubscriptionPlan | null;
    payment_account?: PaymentProviderAccount | null;
};
/**
 * Gets the current subscription with its associated plan and payment info
 */
export declare const getCurrentSubscription: ({ supabase, subscriberType, subscriberId, }: {
    supabase: SupabaseClient<Database>;
    subscriberType: SubscriberType;
    subscriberId: string;
}) => Promise<SubscriptionWithPlan | null>;
/**
 * Creates a new subscription record
 */
export declare const createSubscription: ({ supabase, subscriberType, subscriberId, planId, paymentAccountId, providerSubscriptionId, providerData, status, trialEndsAt, currentPeriodStart, currentPeriodEnd, }: {
    supabase: SupabaseClient<Database>;
    subscriberType: SubscriberType;
    subscriberId: string;
    planId: string;
    paymentAccountId: string;
    providerSubscriptionId: string;
    providerData?: Record<string, unknown>;
    status: SubscriptionStatus;
    trialEndsAt?: string | null;
    currentPeriodStart?: string | null;
    currentPeriodEnd?: string | null;
}) => Promise<Subscription>;
/**
 * Updates a subscription's properties
 */
export declare const updateSubscription: ({ supabase, id, planId, status, trialEndsAt, nextCreditAllocationAt, currentPeriodStart, currentPeriodEnd, cancelAtPeriodEnd, providerData, }: {
    supabase: SupabaseClient<Database>;
    id: string;
    planId?: string;
    status?: SubscriptionStatus;
    trialEndsAt?: string | null;
    nextCreditAllocationAt?: string | null;
    currentPeriodStart?: string | null;
    currentPeriodEnd?: string | null;
    cancelAtPeriodEnd?: boolean | null;
    providerData?: Record<string, unknown>;
}) => Promise<Subscription>;
/**
 * Checks if a subscription is in trial period
 */
export declare const isInTrialPeriod: (subscription: Subscription) => boolean;
/**
 * Checks if a subscription is active (including trial period)
 */
export declare const isSubscriptionActive: (subscription: Subscription) => boolean;
/**
 * Gets subscription by provider subscription ID
 */
export declare const getSubscriptionByProviderId: ({ supabase, providerSubscriptionId, }: {
    supabase: SupabaseClient<Database>;
    providerSubscriptionId: string;
}) => Promise<Subscription | null>;
//# sourceMappingURL=subscriptions.d.ts.map