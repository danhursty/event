import type { Database } from "../database.types";
/**
 * Creates a Supabase admin client with service role access.
 * This should only be used for test setup and cleanup.
 */
export declare function createAdminClient(): import("@supabase/supabase-js").SupabaseClient<Database, "public", {
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
        attendance: {
            Row: {
                id: string;
                event_session_id: string;
                beneficiary_id: string;
                present: boolean;
                notes: string | null;
                recorded_by: string | null;
                created_at: string;
                updated_at: string;
            };
            Insert: {
                id?: string;
                event_session_id: string;
                beneficiary_id: string;
                present?: boolean;
                notes?: string | null;
                recorded_by?: string | null;
                created_at?: string;
                updated_at?: string;
            };
            Update: {
                id?: string;
                event_session_id?: string;
                beneficiary_id?: string;
                present?: boolean;
                notes?: string | null;
                recorded_by?: string | null;
                created_at?: string;
                updated_at?: string;
            };
            Relationships: [{
                foreignKeyName: "attendance_event_session_id_fkey";
                columns: ["event_session_id"];
                isOneToOne: false;
                referencedRelation: "event_sessions";
                referencedColumns: ["id"];
            }, {
                foreignKeyName: "attendance_beneficiary_id_fkey";
                columns: ["beneficiary_id"];
                isOneToOne: false;
                referencedRelation: "beneficiaries";
                referencedColumns: ["id"];
            }, {
                foreignKeyName: "attendance_recorded_by_fkey";
                columns: ["recorded_by"];
                isOneToOne: false;
                referencedRelation: "users";
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
        beneficiaries: {
            Row: {
                id: string;
                organization_id: string;
                submitted_by: string | null;
                created_at: string;
                updated_at: string;
            };
            Insert: {
                id?: string;
                organization_id: string;
                submitted_by?: string | null;
                created_at?: string;
                updated_at?: string;
            };
            Update: {
                id?: string;
                organization_id?: string;
                submitted_by?: string | null;
                created_at?: string;
                updated_at?: string;
            };
            Relationships: [{
                foreignKeyName: "beneficiaries_organization_id_fkey";
                columns: ["organization_id"];
                isOneToOne: false;
                referencedRelation: "organizations";
                referencedColumns: ["id"];
            }, {
                foreignKeyName: "beneficiaries_submitted_by_fkey";
                columns: ["submitted_by"];
                isOneToOne: false;
                referencedRelation: "users";
                referencedColumns: ["id"];
            }];
        };
        beneficiary_field_values: {
            Row: {
                id: string;
                beneficiary_id: string;
                custom_field_id: string;
                value: string | null;
                created_at: string;
                updated_at: string;
            };
            Insert: {
                id?: string;
                beneficiary_id: string;
                custom_field_id: string;
                value?: string | null;
                created_at?: string;
                updated_at?: string;
            };
            Update: {
                id?: string;
                beneficiary_id?: string;
                custom_field_id?: string;
                value?: string | null;
                created_at?: string;
                updated_at?: string;
            };
            Relationships: [{
                foreignKeyName: "beneficiary_field_values_beneficiary_id_fkey";
                columns: ["beneficiary_id"];
                isOneToOne: false;
                referencedRelation: "beneficiaries";
                referencedColumns: ["id"];
            }, {
                foreignKeyName: "beneficiary_field_values_custom_field_id_fkey";
                columns: ["custom_field_id"];
                isOneToOne: false;
                referencedRelation: "custom_fields";
                referencedColumns: ["id"];
            }];
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
        custom_fields: {
            Row: {
                id: string;
                organization_id: string;
                event_id: string | null;
                label: string;
                field_type: string;
                is_required: boolean;
                options: import("../database.types").Json | null;
                sort_order: number;
                created_at: string;
                updated_at: string;
            };
            Insert: {
                id?: string;
                organization_id: string;
                event_id?: string | null;
                label: string;
                field_type: string;
                is_required?: boolean;
                options?: import("../database.types").Json | null;
                sort_order?: number;
                created_at?: string;
                updated_at?: string;
            };
            Update: {
                id?: string;
                organization_id?: string;
                event_id?: string | null;
                label?: string;
                field_type?: string;
                is_required?: boolean;
                options?: import("../database.types").Json | null;
                sort_order?: number;
                created_at?: string;
                updated_at?: string;
            };
            Relationships: [{
                foreignKeyName: "custom_fields_organization_id_fkey";
                columns: ["organization_id"];
                isOneToOne: false;
                referencedRelation: "organizations";
                referencedColumns: ["id"];
            }, {
                foreignKeyName: "custom_fields_event_id_fkey";
                columns: ["event_id"];
                isOneToOne: false;
                referencedRelation: "events";
                referencedColumns: ["id"];
            }];
        };
        events: {
            Row: {
                id: string;
                organization_id: string;
                name: string;
                description: string | null;
                start_date: string | null;
                end_date: string | null;
                recurring: boolean;
                recurrence_pattern: import("../database.types").Json | null;
                created_at: string;
                updated_at: string;
            };
            Insert: {
                id?: string;
                organization_id: string;
                name: string;
                description?: string | null;
                start_date?: string | null;
                end_date?: string | null;
                recurring?: boolean;
                recurrence_pattern?: import("../database.types").Json | null;
                created_at?: string;
                updated_at?: string;
            };
            Update: {
                id?: string;
                organization_id?: string;
                name?: string;
                description?: string | null;
                start_date?: string | null;
                end_date?: string | null;
                recurring?: boolean;
                recurrence_pattern?: import("../database.types").Json | null;
                created_at?: string;
                updated_at?: string;
            };
            Relationships: [{
                foreignKeyName: "events_organization_id_fkey";
                columns: ["organization_id"];
                isOneToOne: false;
                referencedRelation: "organizations";
                referencedColumns: ["id"];
            }];
        };
        event_sessions: {
            Row: {
                id: string;
                event_id: string;
                session_date: string;
                start_time: string | null;
                end_time: string | null;
                location: string | null;
                notes: string | null;
                created_by: string | null;
                created_at: string;
                updated_at: string;
            };
            Insert: {
                id?: string;
                event_id: string;
                session_date: string;
                start_time?: string | null;
                end_time?: string | null;
                location?: string | null;
                notes?: string | null;
                created_by?: string | null;
                created_at?: string;
                updated_at?: string;
            };
            Update: {
                id?: string;
                event_id?: string;
                session_date?: string;
                start_time?: string | null;
                end_time?: string | null;
                location?: string | null;
                notes?: string | null;
                created_by?: string | null;
                created_at?: string;
                updated_at?: string;
            };
            Relationships: [{
                foreignKeyName: "event_sessions_event_id_fkey";
                columns: ["event_id"];
                isOneToOne: false;
                referencedRelation: "events";
                referencedColumns: ["id"];
            }, {
                foreignKeyName: "event_sessions_created_by_fkey";
                columns: ["created_by"];
                isOneToOne: false;
                referencedRelation: "users";
                referencedColumns: ["id"];
            }];
        };
        invitations: {
            Row: {
                accepted_at: string | null;
                created_at: string | null;
                email: string;
                expires_at: string;
                id: string;
                invited_by: string | null;
                membership_type: Database["public"]["Enums"]["membership_type"];
                organization_id: string | null;
                role_id: string | null;
                team_id: string | null;
                token: string;
                updated_at: string | null;
            };
            Insert: {
                accepted_at?: string | null;
                created_at?: string | null;
                email: string;
                expires_at: string;
                id?: string;
                invited_by?: string | null;
                membership_type: Database["public"]["Enums"]["membership_type"];
                organization_id?: string | null;
                role_id?: string | null;
                team_id?: string | null;
                token: string;
                updated_at?: string | null;
            };
            Update: {
                accepted_at?: string | null;
                created_at?: string | null;
                email?: string;
                expires_at?: string;
                id?: string;
                invited_by?: string | null;
                membership_type?: Database["public"]["Enums"]["membership_type"];
                organization_id?: string | null;
                role_id?: string | null;
                team_id?: string | null;
                token?: string;
                updated_at?: string | null;
            };
            Relationships: [{
                foreignKeyName: "invitations_organization_id_fkey";
                columns: ["organization_id"];
                isOneToOne: false;
                referencedRelation: "organizations";
                referencedColumns: ["id"];
            }, {
                foreignKeyName: "invitations_role_id_fkey";
                columns: ["role_id"];
                isOneToOne: false;
                referencedRelation: "roles";
                referencedColumns: ["id"];
            }, {
                foreignKeyName: "invitations_team_id_fkey";
                columns: ["team_id"];
                isOneToOne: false;
                referencedRelation: "teams";
                referencedColumns: ["id"];
            }];
        };
        organization_members: {
            Row: {
                created_at: string | null;
                id: string;
                membership_type: Database["public"]["Enums"]["membership_type"];
                organization_id: string | null;
                role_id: string | null;
                updated_at: string | null;
                user_id: string | null;
            };
            Insert: {
                created_at?: string | null;
                id?: string;
                membership_type: Database["public"]["Enums"]["membership_type"];
                organization_id?: string | null;
                role_id?: string | null;
                updated_at?: string | null;
                user_id?: string | null;
            };
            Update: {
                created_at?: string | null;
                id?: string;
                membership_type?: Database["public"]["Enums"]["membership_type"];
                organization_id?: string | null;
                role_id?: string | null;
                updated_at?: string | null;
                user_id?: string | null;
            };
            Relationships: [{
                foreignKeyName: "organization_members_organization_id_fkey";
                columns: ["organization_id"];
                isOneToOne: false;
                referencedRelation: "organizations";
                referencedColumns: ["id"];
            }, {
                foreignKeyName: "organization_members_role_id_fkey";
                columns: ["role_id"];
                isOneToOne: false;
                referencedRelation: "roles";
                referencedColumns: ["id"];
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
                id: string;
                is_subscribed: boolean | null;
                name: string;
                onboarding_data: import("../database.types").Json | null;
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
                id?: string;
                is_subscribed?: boolean | null;
                name: string;
                onboarding_data?: import("../database.types").Json | null;
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
                id?: string;
                is_subscribed?: boolean | null;
                name?: string;
                onboarding_data?: import("../database.types").Json | null;
                stripe_customer_id?: string | null;
                updated_at?: string | null;
            };
            Relationships: [];
        };
        permissions: {
            Row: {
                action: Database["public"]["Enums"]["permission_action"];
                description: string | null;
                id: string;
                name: string;
            };
            Insert: {
                action: Database["public"]["Enums"]["permission_action"];
                description?: string | null;
                id?: string;
                name: string;
            };
            Update: {
                action?: Database["public"]["Enums"]["permission_action"];
                description?: string | null;
                id?: string;
                name?: string;
            };
            Relationships: [];
        };
        role_permissions: {
            Row: {
                permission_id: string;
                role_id: string;
            };
            Insert: {
                permission_id: string;
                role_id: string;
            };
            Update: {
                permission_id?: string;
                role_id?: string;
            };
            Relationships: [{
                foreignKeyName: "role_permissions_permission_id_fkey";
                columns: ["permission_id"];
                isOneToOne: false;
                referencedRelation: "permissions";
                referencedColumns: ["id"];
            }, {
                foreignKeyName: "role_permissions_role_id_fkey";
                columns: ["role_id"];
                isOneToOne: false;
                referencedRelation: "roles";
                referencedColumns: ["id"];
            }];
        };
        roles: {
            Row: {
                created_at: string | null;
                description: string | null;
                id: string;
                name: string;
                updated_at: string | null;
            };
            Insert: {
                created_at?: string | null;
                description?: string | null;
                id?: string;
                name: string;
                updated_at?: string | null;
            };
            Update: {
                created_at?: string | null;
                description?: string | null;
                id?: string;
                name?: string;
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
                id: string;
                role_id: string | null;
                team_id: string | null;
                updated_at: string | null;
                user_id: string | null;
            };
            Insert: {
                created_at?: string | null;
                id?: string;
                role_id?: string | null;
                team_id?: string | null;
                updated_at?: string | null;
                user_id?: string | null;
            };
            Update: {
                created_at?: string | null;
                id?: string;
                role_id?: string | null;
                team_id?: string | null;
                updated_at?: string | null;
                user_id?: string | null;
            };
            Relationships: [{
                foreignKeyName: "team_members_role_id_fkey";
                columns: ["role_id"];
                isOneToOne: false;
                referencedRelation: "roles";
                referencedColumns: ["id"];
            }, {
                foreignKeyName: "team_members_team_id_fkey";
                columns: ["team_id"];
                isOneToOne: false;
                referencedRelation: "teams";
                referencedColumns: ["id"];
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
                id: string;
                name: string;
                organization_id: string | null;
                updated_at: string | null;
                website: string | null;
            };
            Insert: {
                created_at?: string | null;
                id?: string;
                name: string;
                organization_id?: string | null;
                updated_at?: string | null;
                website?: string | null;
            };
            Update: {
                created_at?: string | null;
                id?: string;
                name?: string;
                organization_id?: string | null;
                updated_at?: string | null;
                website?: string | null;
            };
            Relationships: [{
                foreignKeyName: "teams_organization_id_fkey";
                columns: ["organization_id"];
                isOneToOne: false;
                referencedRelation: "organizations";
                referencedColumns: ["id"];
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
                p_onboarding_role: Database["public"]["Enums"]["onboarding_role_type"];
                p_goals: Database["public"]["Enums"]["organization_goal"][];
                p_team_website?: string;
                p_referral_source?: Database["public"]["Enums"]["organization_referral_source"];
            };
            Returns: import("../database.types").Json;
        };
        has_org_permission: {
            Args: {
                _org_id: string;
                _permission_action: Database["public"]["Enums"]["permission_action"];
            };
            Returns: boolean;
        };
        has_team_permission: {
            Args: {
                _team_id: string;
                _permission_action: Database["public"]["Enums"]["permission_action"];
            };
            Returns: boolean;
        };
        invite_org_member: {
            Args: {
                p_organization_id: string;
                p_membership_type: Database["public"]["Enums"]["membership_type"];
                p_email: string;
                p_role_id: string;
                p_invited_by: string;
                p_expires_at: string;
                p_team_id?: string;
            };
            Returns: string;
        };
        is_org_member: {
            Args: {
                _org_id: string;
            };
            Returns: boolean;
        };
        process_invitation: {
            Args: {
                p_token: string;
                p_user_id: string;
            };
            Returns: boolean;
        };
        reset_test_db: {
            Args: Record<PropertyKey, never>;
            Returns: undefined;
        };
        revoke_invitation: {
            Args: {
                p_token: string;
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
                role_id: string;
                role_name: string;
                membership_type: Database["public"]["Enums"]["membership_type"];
                expires_at: string;
                organizations: import("../database.types").Json;
            }[];
        };
    };
    Enums: {
        membership_type: "team" | "client";
        onboarding_role_type: "freelance_marketer" | "marketing_agency_owner" | "marketing_agency_employee" | "in_house_marketer" | "small_business_owner" | "other";
        organization_goal: "publish_multiple_platforms" | "manage_multiple_brands" | "implement_collaboration" | "approval_workflow" | "visual_planning" | "automate_content" | "other";
        organization_referral_source: "google_search" | "friend_colleague" | "influencer" | "newsletter" | "ads" | "community" | "podcast" | "cant_remember";
        permission_action: "view_comments_and_dms" | "manage_comments_and_dms" | "manage_email_inbox" | "manage_connected_pages" | "manage_integrations" | "create_posts" | "edit_posts" | "delete_posts" | "view_posts" | "schedule_posts" | "upload_media" | "manage_media_library" | "view_analytics" | "export_analytics" | "manage_team_members" | "assign_roles" | "manage_organization" | "manage_organization_members" | "manage_billing";
    };
    CompositeTypes: { [_ in never]: never; };
}>;
//# sourceMappingURL=utils.d.ts.map