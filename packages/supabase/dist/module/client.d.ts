import type { Database } from '../database.types';
/**
 * Creates a typed Supabase client instance.
 *
 * @example
 * ```typescript
 * // Using environment variables
 * const supabase = createSupabaseClient({
 *   supabaseUrl: process.env.SUPABASE_URL!,
 *   supabaseKey: process.env.SUPABASE_ANON_KEY!
 * });
 *
 * // Using custom credentials
 * const supabase = createSupabaseClient({
 *   supabaseUrl: 'https://your-project.supabase.co',
 *   supabaseKey: 'your-anon-key'
 * });
 * ```
 *
 * @throws {Error} If supabaseUrl or supabaseKey is missing
 */
declare const createSupabaseClient: ({ supabaseUrl, supabaseKey, }: {
    supabaseUrl: string;
    supabaseKey: string;
}) => import("@supabase/supabase-js").SupabaseClient<Database, "public", {
    Tables: {
        articles: {
            Row: {
                author_id: string;
                category_id: string;
                content: string;
                created_at: string;
                excerpt: string;
                featured_image: string;
                id: string;
                published_at: string;
                title: string;
                updated_at: string;
            };
            Insert: {
                author_id: string;
                category_id: string;
                content: string;
                created_at?: string;
                excerpt?: string;
                featured_image?: string;
                id?: string;
                published_at?: string;
                title: string;
                updated_at?: string;
            };
            Update: {
                author_id?: string;
                category_id?: string;
                content?: string;
                created_at?: string;
                excerpt?: string;
                featured_image?: string;
                id?: string;
                published_at?: string;
                title?: string;
                updated_at?: string;
            };
            Relationships: [{
                foreignKeyName: "articles_author_id_fkey";
                columns: ["author_id"];
                isOneToOne: false;
                referencedRelation: "authors";
                referencedColumns: ["id"];
            }, {
                foreignKeyName: "articles_category_id_fkey";
                columns: ["category_id"];
                isOneToOne: false;
                referencedRelation: "categories";
                referencedColumns: ["id"];
            }];
        };
        authors: {
            Row: {
                avatar_url: string;
                bio: string;
                created_at: string;
                id: string;
                name: string;
                updated_at: string;
            };
            Insert: {
                avatar_url?: string;
                bio?: string;
                created_at?: string;
                id?: string;
                name: string;
                updated_at?: string;
            };
            Update: {
                avatar_url?: string;
                bio?: string;
                created_at?: string;
                id?: string;
                name?: string;
                updated_at?: string;
            };
            Relationships: [];
        };
        categories: {
            Row: {
                created_at: string;
                description: string;
                id: string;
                name: string;
                updated_at: string;
            };
            Insert: {
                created_at?: string;
                description?: string;
                id?: string;
                name: string;
                updated_at?: string;
            };
            Update: {
                created_at?: string;
                description?: string;
                id?: string;
                name?: string;
                updated_at?: string;
            };
            Relationships: [];
        };
        invitations: {
            Row: {
                accepted_at: string | null;
                created_at: string | null;
                email: string;
                expires_at: string;
                id: string;
                invited_by: string | null;
                organization_id: string | null;
                role: string;
                token: string;
            };
            Insert: {
                accepted_at?: string | null;
                created_at?: string | null;
                email: string;
                expires_at: string;
                id?: string;
                invited_by?: string | null;
                organization_id?: string | null;
                role: string;
                token: string;
            };
            Update: {
                accepted_at?: string | null;
                created_at?: string | null;
                email?: string;
                expires_at?: string;
                id?: string;
                invited_by?: string | null;
                organization_id?: string | null;
                role?: string;
                token?: string;
            };
            Relationships: [{
                foreignKeyName: "invitations_organization_id_fkey";
                columns: ["organization_id"];
                isOneToOne: false;
                referencedRelation: "organizations";
                referencedColumns: ["organization_id"];
            }];
        };
        organization_members: {
            Row: {
                created_at: string | null;
                member_id: string;
                organization_id: string | null;
                role: string;
                updated_at: string | null;
                user_id: string | null;
            };
            Insert: {
                created_at?: string | null;
                member_id?: string;
                organization_id?: string | null;
                role: string;
                updated_at?: string | null;
                user_id?: string | null;
            };
            Update: {
                created_at?: string | null;
                member_id?: string;
                organization_id?: string | null;
                role?: string;
                updated_at?: string | null;
                user_id?: string | null;
            };
            Relationships: [{
                foreignKeyName: "organization_members_organization_id_fkey";
                columns: ["organization_id"];
                isOneToOne: false;
                referencedRelation: "organizations";
                referencedColumns: ["organization_id"];
            }, {
                foreignKeyName: "organization_members_user_id_fkey";
                columns: ["user_id"];
                isOneToOne: false;
                referencedRelation: "users";
                referencedColumns: ["id"];
            }];
        };
        organizations: {
            Row: {
                auto_recharge_amount: number | null;
                auto_recharge_enabled: boolean | null;
                auto_recharge_threshold: number | null;
                billing_email: string;
                created_at: string | null;
                credits_balance: number | null;
                is_subscribed: boolean | null;
                name: string;
                onboarding_data: import("../database.types").Json | null;
                organization_id: string;
                stripe_customer_id: string | null;
                updated_at: string | null;
            };
            Insert: {
                auto_recharge_amount?: number | null;
                auto_recharge_enabled?: boolean | null;
                auto_recharge_threshold?: number | null;
                billing_email: string;
                created_at?: string | null;
                credits_balance?: number | null;
                is_subscribed?: boolean | null;
                name: string;
                onboarding_data?: import("../database.types").Json | null;
                organization_id?: string;
                stripe_customer_id?: string | null;
                updated_at?: string | null;
            };
            Update: {
                auto_recharge_amount?: number | null;
                auto_recharge_enabled?: boolean | null;
                auto_recharge_threshold?: number | null;
                billing_email?: string;
                created_at?: string | null;
                credits_balance?: number | null;
                is_subscribed?: boolean | null;
                name?: string;
                onboarding_data?: import("../database.types").Json | null;
                organization_id?: string;
                stripe_customer_id?: string | null;
                updated_at?: string | null;
            };
            Relationships: [];
        };
        system_settings: {
            Row: {
                description: string | null;
                key: string;
                updated_at: string | null;
                value: import("../database.types").Json;
            };
            Insert: {
                description?: string | null;
                key: string;
                updated_at?: string | null;
                value: import("../database.types").Json;
            };
            Update: {
                description?: string | null;
                key?: string;
                updated_at?: string | null;
                value?: import("../database.types").Json;
            };
            Relationships: [];
        };
        team_members: {
            Row: {
                created_at: string | null;
                role: string;
                team_id: string | null;
                team_member_id: string;
                updated_at: string | null;
                user_id: string | null;
            };
            Insert: {
                created_at?: string | null;
                role: string;
                team_id?: string | null;
                team_member_id?: string;
                updated_at?: string | null;
                user_id?: string | null;
            };
            Update: {
                created_at?: string | null;
                role?: string;
                team_id?: string | null;
                team_member_id?: string;
                updated_at?: string | null;
                user_id?: string | null;
            };
            Relationships: [{
                foreignKeyName: "team_members_team_id_fkey";
                columns: ["team_id"];
                isOneToOne: false;
                referencedRelation: "teams";
                referencedColumns: ["team_id"];
            }, {
                foreignKeyName: "team_members_user_id_fkey";
                columns: ["user_id"];
                isOneToOne: false;
                referencedRelation: "users";
                referencedColumns: ["id"];
            }];
        };
        teams: {
            Row: {
                created_at: string | null;
                name: string;
                organization_id: string | null;
                team_id: string;
                updated_at: string | null;
                website: string | null;
            };
            Insert: {
                created_at?: string | null;
                name: string;
                organization_id?: string | null;
                team_id?: string;
                updated_at?: string | null;
                website?: string | null;
            };
            Update: {
                created_at?: string | null;
                name?: string;
                organization_id?: string | null;
                team_id?: string;
                updated_at?: string | null;
                website?: string | null;
            };
            Relationships: [{
                foreignKeyName: "teams_organization_id_fkey";
                columns: ["organization_id"];
                isOneToOne: false;
                referencedRelation: "organizations";
                referencedColumns: ["organization_id"];
            }];
        };
        users: {
            Row: {
                avatar: string | null;
                created_at: string | null;
                email: string | null;
                full_name: string | null;
                id: string;
                updated_at: string | null;
            };
            Insert: {
                avatar?: string | null;
                created_at?: string | null;
                email?: string | null;
                full_name?: string | null;
                id: string;
                updated_at?: string | null;
            };
            Update: {
                avatar?: string | null;
                created_at?: string | null;
                email?: string | null;
                full_name?: string | null;
                id?: string;
                updated_at?: string | null;
            };
            Relationships: [];
        };
    };
    Views: { [_ in never]: never; };
    Functions: {
        create_organization: {
            Args: {
                p_name: string;
                p_billing_email: string;
                p_user_id: string;
                p_team_name: string;
                p_role_type: Database["public"]["Enums"]["organization_role_type"];
                p_goals: Database["public"]["Enums"]["organization_goal"][];
                p_team_website?: string;
                p_referral_source?: Database["public"]["Enums"]["organization_referral_source"];
            };
            Returns: import("../database.types").Json;
        };
        process_invitation: {
            Args: {
                p_token: string;
                p_user_id: string;
            };
            Returns: boolean;
        };
        validate_invitation_token: {
            Args: {
                p_token: string;
            };
            Returns: {
                id: string;
                email: string;
                organization_id: string;
                role: string;
                expires_at: string;
                organizations: import("../database.types").Json;
            }[];
        };
    };
    Enums: {
        organization_goal: "publish_multiple_platforms" | "manage_multiple_brands" | "implement_collaboration" | "approval_workflow" | "visual_planning" | "automate_content" | "other";
        organization_referral_source: "google_search" | "friend_colleague" | "influencer" | "newsletter" | "ads" | "community" | "podcast" | "cant_remember";
        organization_role_type: "freelance_marketer" | "marketing_agency_owner" | "marketing_agency_employee" | "in_house_marketer" | "small_business_owner" | "other";
    };
    CompositeTypes: {
        organization_creation_result: {
            organization: unknown;
            team: unknown;
        };
    };
}>;
export { createSupabaseClient };
