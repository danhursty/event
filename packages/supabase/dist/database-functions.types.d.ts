import { Database } from "./database.types";
type Tables = Database["public"]["Tables"];
type Enums = Database["public"]["Enums"];
export type DatabaseFunctions = {
    create_organization: {
        Args: Database["public"]["Functions"]["create_organization"]["Args"];
        Returns: {
            organization: Tables["organizations"]["Row"];
            team: Tables["teams"]["Row"];
        };
    };
    invite_org_member: {
        Args: {
            p_organization_id: string;
            p_membership_type: Enums["membership_type"];
            p_email: string;
            p_org_role: Enums["org_role_type"];
            p_team_role: Enums["team_role_type"];
            p_invited_by: string;
            p_expires_at: string;
            p_team_id?: string | null;
        };
        Returns: string;
    };
    validate_invitation_token: {
        Args: {
            p_token: string;
        };
        Returns: {
            id: string;
            email: string;
            organization_id: string;
            role: Enums["org_role_type"];
            membership_type: Enums["membership_type"];
            expires_at: string;
            organizations: {
                name: string;
            };
        };
    };
    revoke_invitation: {
        Args: {
            p_token: string;
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
    add_org_member_to_all_teams: {
        Args: Record<string, never>;
        Returns: Tables["organization_members"]["Row"];
    };
    add_team_members_to_new_team: {
        Args: Record<string, never>;
        Returns: Tables["teams"]["Row"];
    };
};
export {};
