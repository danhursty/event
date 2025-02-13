"use client";

import { HydrationBoundary, DehydratedState } from "@tanstack/react-query";
import { LoadingSkeleton } from "@/components/loading/loading-skeleton";
import { Suspense } from "react";
import { useUsers } from "@repo/supabase";
import { createClient } from "@/utils/supabase/client";

interface DashboardProps {
  dehydratedState: DehydratedState;
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6 mb-8">
      <div className="space-y-4">
        {/* Name text skeleton */}
        <LoadingSkeleton variant="text" width="200px" />
        {/* Button skeleton */}
        <LoadingSkeleton variant="button" />
      </div>
    </div>
  );
}

function DashboardContent() {
  const supabase = createClient();
  const { data } = useUsers({ supabase });
  return (
    <>
      {data.map((user) => (
        <div key={user.id}>{user.id}</div>
      ))}
    </>
  );
}

export default function Dashboard({ dehydratedState }: DashboardProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </HydrationBoundary>
  );
}
