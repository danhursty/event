import { dehydrate } from "@tanstack/react-query";
import { createQueryClient } from "@/lib/react-query";
import { createClient } from "@/utils/supabase/server";
import { getTeams } from "@repo/supabase";
import { WorkspacesContent } from "./components/WorkspacesContent";
import { redirect } from "next/navigation";

interface WorkspacesPageProps {
  params: {
    orgId: string;
  };
}

export default async function WorkspacesPage({ params }: WorkspacesPageProps) {
  if (!params || !params.orgId) {
    return <div>No organization provided.</div>;
  }
  const queryClient = createQueryClient();
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;
  if (!user) {
    redirect("/login");
  }

  await queryClient.prefetchQuery({
    queryKey: ["teams", "list", { organizationId: params.orgId }],
    queryFn: () => getTeams({ supabase, organizationId: params.orgId }),
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <WorkspacesContent
      orgId={params.orgId}
      user={user}
      state={dehydratedState}
    />
  );
}
