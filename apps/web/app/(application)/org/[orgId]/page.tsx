import { Suspense } from "react";
import Dashboard from "@/components/dashboard/Dashboard";
import { dehydrate } from "@tanstack/react-query";
import { createQueryClient } from "@/lib/react-query";
import { createClient } from "@/utils/supabase/server";
import { getUsers } from "@repo/supabase";

// Loading component that will be shown while data is being fetched
function DashboardLoading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2">Loading dashboard...</p>
      </div>
    </div>
  );
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{
    orgId: string;
  }>;
}) {
  const { orgId } = await params;
  
  // Initialize query client without prefetching data
  const queryClient = createQueryClient();
  
  return (
    <Suspense fallback={<DashboardLoading />}>
      <Dashboard orgId={orgId} dehydratedState={dehydrate(queryClient)} />
    </Suspense>
  );
}
