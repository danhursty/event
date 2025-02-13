import { Team } from "@repo/supabase";
import { useInvitations, useRevokeInvitation } from "@repo/supabase";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PendingInvitationsTabProps {
  team: Team;
}

export function PendingInvitationsTab({ team }: PendingInvitationsTabProps) {
  const supabase = createClient();
  const { data: invitations = [] } = useInvitations({
    teamId: team.id,
    includeNoTeam: true,
    supabase,
  });

  const { mutate: revokeInvitation } = useRevokeInvitation({
    supabase,
  });

  const handleRevoke = (token: string) => {
    revokeInvitation({
      token,
      teamId: team.id,
    });
  };

  return (
    <div className="space-y-6 py-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitations.map((invitation) => (
            <TableRow key={invitation.id}>
              <TableCell>{invitation.email}</TableCell>
              <TableCell>{invitation.membership_type}</TableCell>
              <TableCell>
                {new Date(invitation.expires_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRevoke(invitation.token)}
                >
                  Revoke
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {invitations.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                No pending invitations
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
