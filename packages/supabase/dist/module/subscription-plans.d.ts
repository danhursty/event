import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';
export type SubscriptionPlan = Database['public']['Tables']['subscription_plans']['Row'];
export type SubscriptionPlanType = 'individual' | 'agency';
export type SubscriptionPlanFeatures = Record<string, boolean>;
/**
 * Gets all active subscription plans
 */
export declare const getSubscriptionPlans: ({ supabase, type, }: {
    supabase: SupabaseClient<Database>;
    type?: SubscriptionPlanType;
}) => Promise<SubscriptionPlan[]>;
/**
 * Gets a specific subscription plan by ID
 */
export declare const getSubscriptionPlan: ({ supabase, planId, }: {
    supabase: SupabaseClient<Database>;
    planId: string;
}) => Promise<SubscriptionPlan | null>;
/**
 * Gets a subscription plan by its Stripe price ID
 */
export declare const getSubscriptionPlanByStripePrice: ({ supabase, stripePriceId, }: {
    supabase: SupabaseClient<Database>;
    stripePriceId: string;
}) => Promise<SubscriptionPlan | null>;
/**
 * Checks if a plan has a specific feature
 */
export declare const hasPlanFeature: ({ plan, feature, }: {
    plan: SubscriptionPlan;
    feature: string;
}) => boolean;
/**
 * Gets the monthly credit limit for a plan
 */
export declare const getPlanMonthlyCredits: ({ plan, }: {
    plan: SubscriptionPlan;
}) => number;
/**
 * Gets the maximum number of clients allowed for a plan
 */
export declare const getPlanMaxClients: ({ plan, }: {
    plan: SubscriptionPlan;
}) => number | null;
/**
 * Gets the maximum number of team members allowed for a plan
 */
export declare const getPlanMaxTeamMembers: ({ plan, }: {
    plan: SubscriptionPlan;
}) => number | null;
/**
 * Checks if a plan is an agency plan
 */
export declare const isAgencyPlan: ({ plan }: {
    plan: SubscriptionPlan;
}) => boolean;
//# sourceMappingURL=subscription-plans.d.ts.map