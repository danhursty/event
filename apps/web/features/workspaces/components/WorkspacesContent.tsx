"use client";

import { createClient } from "@/utils/supabase/client";
import { useTeams } from "@repo/supabase";
import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";
import { useWorkspaceMember } from "@/features/authorization/hooks/use-workspace-member";
import { useRoleCheck } from "@/features/authorization/hooks/use-role-check";
import { User } from "@supabase/supabase-js";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { WorkspaceGrid } from "./WorkspaceGrid/WorkspaceGrid";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface WorkspacesContentProps {
  orgId: string;
  user: User;
  state: DehydratedState;
}

function WorkspacesContentInner({
  orgId,
  user,
}: Omit<WorkspacesContentProps, "state">) {
  const supabase = createClient();
  const { member, isLoading: isLoadingMember } = useWorkspaceMember({
    userId: user.id,
    orgId,
    supabase,
  });
  const router = useRouter();

  const { checkAccess } = useRoleCheck(member || null);
  const canCreateWorkspace = checkAccess({
    requiredPermissions: ["manage_organization"],
  });

  const {
    data: workspaces = [],
    refetch,
    isLoading: isLoadingWorkspaces,
  } = useTeams({
    organizationId: orgId,
    supabase,
  });

  // Show loading state while either member or workspaces are loading
  const isLoading = isLoadingMember || isLoadingWorkspaces;

  // Return loading state if data is still loading
  if (isLoading) {
    return <LoadingFallback />;
  }

  // Redirect if no member or no workspaces
  if (!member || workspaces.length === 0) {
    router.push("/org"); // Redirect to organizations page
  }

  return (
    <div className="grid gap-6 p-6">
      <WorkspaceGrid
        teams={workspaces}
        currentMember={member!}
        isLoading={false}
      />
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="grid gap-6 p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton width={200} height={32} />
          <Skeleton width={180} height={40} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton height={200} className="rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WorkspacesContent({
  orgId,
  user,
  state,
}: WorkspacesContentProps) {
  return (
    <HydrationBoundary state={state}>
      <ErrorBoundary fallback={<div>Error loading workspaces</div>}>
        <Suspense fallback={<LoadingFallback />}>
          <WorkspacesContentInner orgId={orgId} user={user} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
}
