"use client";

import { User } from "@supabase/supabase-js";
import { getDashboardConfig } from "@/config";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { UserDropdown } from "./UserDropdown";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMemberRoles } from "@/features/authorization/actions/get-member-roles";
import { WorkspaceSelector } from "./WorkspaceSelector";

interface MainSidebarProps {
  user: User;
  currentOrganizationId: string;
  role: Awaited<ReturnType<typeof getMemberRoles>>;
}

export function MainSidebar({
  user,
  currentOrganizationId,
  role,
}: MainSidebarProps) {
  const pathname = usePathname();
  const { sidebarNavItems } = getDashboardConfig();

  // Extract current workspace ID from URL if it exists
  const currentWorkspaceId = pathname
    .split("/")
    .find((segment, index, array) => {
      const prevSegment = array[index - 1];
      return prevSegment === currentOrganizationId;
    });

  // Filter out the home icon and any items that should be hidden
  const filteredNavItems = sidebarNavItems.filter((item) => {
    // TODO FEAT - If we want want to hide specific pages from different roles
    return true;
  });

  return (
    <Sidebar className="border-r" data-testid="main-sidebar">
      <SidebarHeader className="border-b px-3 py-2">
        <Link
          href={`/org/${currentOrganizationId}/workspaces`}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <h2 className="text-lg font-semibold">Workspaces</h2>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex flex-col">
        <WorkspaceSelector
          currentOrganizationId={currentOrganizationId}
          currentWorkspaceId={currentWorkspaceId}
        />
        <div className="px-3 py-2">
          <SidebarMenu>
            {filteredNavItems
              .filter((item) => item.title !== "Workspaces")
              .map((item) => {
                const href = item.href.includes("[teamId]")
                  ? `/org/${currentOrganizationId}/${item.href.replace("[teamId]", currentWorkspaceId || "")}`
                  : `/org/${currentOrganizationId}/${item.href}`;

                const isActive =
                  pathname === href ||
                  pathname.endsWith(
                    item.href.replace("[teamId]", currentWorkspaceId || "")
                  );

                // Don't render team-specific links if no workspace is selected
                if (item.href.includes("[teamId]") && !currentWorkspaceId) {
                  return null;
                }

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "w-full justify-start gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        isActive && "bg-accent text-accent-foreground"
                      )}
                      data-testid={`sidebar-menu-${item.title.toLowerCase()}`}
                    >
                      <Link href={href} prefetch={true}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t p-3">
        <UserDropdown
          user={user}
          role={role}
          currentOrganizationId={currentOrganizationId}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
