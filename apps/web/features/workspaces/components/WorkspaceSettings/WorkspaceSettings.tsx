import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Team, Permission } from "@repo/supabase";
import { useRoleCheck } from "@/features/authorization/hooks/use-role-check";
import { GeneralSettings } from "./GeneralSettings";
import { InvitationsTab } from "./InvitationsTab";
import { PendingInvitationsTab } from "./PendingInvitationsTab";

interface WorkspaceSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  team: Team;
  currentMember: any; // Replace with proper type
}

export function WorkspaceSettings({
  isOpen,
  onClose,
  team,
  currentMember,
}: WorkspaceSettingsProps) {
  const [activeTab, setActiveTab] = useState("general");
  const { checkAccess } = useRoleCheck(currentMember || null);
  const canManageWorkspace = checkAccess({
    requiredPermissions: ["manage_organization" as Permission],
  });

  if (!canManageWorkspace) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Workspace Settings - {team.name}</DialogTitle>
          <DialogDescription>
            Manage your workspace settings, invitations, and team members.
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="invitations">Invite</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <GeneralSettings team={team} onClose={onClose} />
          </TabsContent>
          <TabsContent value="invitations">
            <InvitationsTab team={team} currentMember={currentMember} />
          </TabsContent>
          <TabsContent value="pending">
            <PendingInvitationsTab team={team} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
