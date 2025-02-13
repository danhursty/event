import type { MembershipType } from "@repo/supabase";
export interface TeamInvitationEmailProps {
    organizationName: string;
    inviterName: string;
    signUpUrl: string;
    role: MembershipType;
}
export interface TeamInvitationEmailComponent {
    (props: TeamInvitationEmailProps): JSX.Element;
}
