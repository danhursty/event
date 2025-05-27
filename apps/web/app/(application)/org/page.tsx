/**
 * OrgRedirectPage handles the top-level /org route.
 * It simply verifies if the user has org membership and a team,
 * then redirects to the correct /org/[orgId]/[teamId].
 */

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function OrgRedirectPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Org membership check
  const { data: memberships } = await supabase
    .from("organization_members")
    .select("organization_id")
    .eq("user_id", user.id)
    .limit(1);

  // If no org membership => onboarding
  if (!memberships || memberships.length === 0) {
    redirect("/onboarding");
  }

  const organizationId = memberships[0].organization_id;

  // Redirect directly to the organization page
  redirect(`/org/${organizationId}/`);
}
