"use client";

import { useState } from "react";
import {
  Team,
  MembershipType,
  Permission,
  type RoleData,
  useInviteMember,
  useRoles,
} from "@repo/supabase";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { useRoleCheck } from "@/features/authorization/hooks/use-role-check";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InvitationsTabProps {
  team: Team;
  currentMember: any; // Replace with proper type
}

export function InvitationsTab({ team, currentMember }: InvitationsTabProps) {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [membershipType, setMembershipType] = useState<MembershipType>("team");
  const [roleType, setRoleType] = useState<RoleData["name"]>("member");

  const { data: roles = [], isLoading: isLoadingRoles } = useRoles({
    supabase,
  });
  const adminRoleId = roles.find((role) => role.name === "admin")?.id;
  const memberRoleId = roles.find((role) => role.name === "member")?.id;

  const { checkAccess } = useRoleCheck(currentMember || null);
  const canManageOrg = checkAccess({
    requiredPermissions: ["manage_organization" as Permission],
  });
  const canManageTeam = checkAccess({
    requiredPermissions: ["manage_team" as Permission],
  });
  const canManageInvites = canManageOrg || canManageTeam;

  // Check if the current member is a client admin
  const isClientAdmin =
    currentMember?.membership_type === "client" &&
    currentMember?.role?.name === "admin";

  const { mutate: inviteMember, isPending: isInviting } = useInviteMember({
    supabase,
  });

  if (!canManageInvites) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        You don't have permission to manage invitations
      </div>
    );
  }

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleInvite called");

    try {
      const response = await supabase.auth.getUser();

      if (!response || !response.data) {
        toast.error("Authentication error. Please try again.");
        return;
      }

      const user = response.data.user;

      if (!user) {
        toast.error("You must be logged in to invite members");
        return;
      }

      if (!adminRoleId || !memberRoleId) {
        toast.error("Unable to fetch role information. Please try again.");
        return;
      }

      if (isLoadingRoles) {
        toast.error("Loading roles. Please try again in a moment.");
        return;
      }

      // Security check: Client admins can only add users to client organization, not to team
      if (isClientAdmin && membershipType === "team") {
        toast.error(
          "Client administrators can only invite users to client organizations"
        );
        return;
      }

      await inviteMember(
        {
          organizationId: team.organization_id!,
          membershipType,
          email,
          roleId: roleType === "admin" ? adminRoleId : memberRoleId,
          teamId: membershipType === "client" ? team.id : null,
          invitedBy: user.id,
          organizationName: team.name || "Organization",
          inviterName: user.email || "Team Member",
        },
        {
          onSuccess: () => {
            setEmail("");
          },
        }
      );
    } catch (error) {
      console.error("Error inviting member:", error);
      toast.error("Failed to invite member. Please try again.");
    }
  };

  return (
    <div className="space-y-6 py-4">
      <form role="form" onSubmit={handleInvite} className="space-y-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoadingRoles || isInviting}
            />
          </div>

          <div className="grid gap-2">
            <Label>Membership Type</Label>
            <Select
              value={membershipType}
              onValueChange={(value: MembershipType) =>
                setMembershipType(value)
              }
              disabled={
                isLoadingRoles ||
                isInviting ||
                (isClientAdmin && membershipType === "team")
              }
            >
              <SelectTrigger aria-label="Membership Type">
                <SelectValue placeholder="Select membership type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="team"
                  disabled={isClientAdmin}
                  data-radix-select-item
                >
                  Team
                </SelectItem>
                <SelectItem value="client" data-radix-select-item>
                  Client
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              {membershipType === "team"
                ? "Team members have access to all workspaces in the organization"
                : "Clients are limited to this workspace only"}
            </p>
            {isClientAdmin && (
              <p className="text-sm text-red-500">
                As a client administrator, you can only invite users to client
                organizations
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Role Type</Label>
            <Select
              value={roleType}
              onValueChange={(value: RoleData["name"]) => setRoleType(value)}
              disabled={isLoadingRoles || isInviting}
            >
              <SelectTrigger aria-label="Role Type">
                <SelectValue placeholder="Select role type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin" data-radix-select-item>
                  Admin
                </SelectItem>
                <SelectItem value="member" data-radix-select-item>
                  Member
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={
              isLoadingRoles ||
              isInviting ||
              (isClientAdmin && membershipType === "team")
            }
          >
            {isInviting ? "Sending..." : "Send Invite"}
          </Button>
        </div>
      </form>
    </div>
  );
}
