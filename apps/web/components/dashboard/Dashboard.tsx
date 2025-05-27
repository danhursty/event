"use client";

import { HydrationBoundary, DehydratedState } from "@tanstack/react-query";
import { LoadingSkeleton } from "@/components/loading/loading-skeleton";
import { Suspense, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface DashboardProps {
  dehydratedState: DehydratedState;
  orgId: string;
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6 mb-8 p-6">
      <div className="bg-gray-100 dark:bg-gray-800 h-8 w-48 rounded animate-pulse mb-4"></div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="bg-gray-100 dark:bg-gray-700 h-6 w-72 rounded animate-pulse mb-6"></div>
        <div className="space-y-3">
          <div className="bg-gray-100 dark:bg-gray-700 h-10 rounded animate-pulse"></div>
          <div className="bg-gray-100 dark:bg-gray-700 h-10 rounded animate-pulse"></div>
          <div className="bg-gray-100 dark:bg-gray-700 h-10 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

// Function to convert non-example email to example.com format
function sanitizeEmail(email: string): string {
  if (!email) return '';
  
  // If it's already using example.com, return as is
  if (email.endsWith('@example.com')) return email;
  
  // Extract the username and replace with example.com
  const parts = email.split('@');
  if (parts.length === 2) {
    return `${parts[0]}@example.com`;
  }
  
  return email;
}

function DashboardContent({ orgId }: { orgId: string }) {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [orgDetails, setOrgDetails] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasNonExampleEmails, setHasNonExampleEmails] = useState(false);

  useEffect(() => {
    // Use AbortController to handle component unmount
    const controller = new AbortController();
    const { signal } = controller;

    const fetchOrgData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch organization details - only what we need
        const { data: org, error: orgError } = await supabase
          .from("organizations")
          .select("id, name, billing_email")
          .eq("id", orgId)
          .single();

        if (orgError) throw orgError;
        setOrgDetails(org);
        
        // Check if org email uses non-example domain
        if (org?.billing_email && !org.billing_email.endsWith('@example.com')) {
          setHasNonExampleEmails(true);
        }

        // Fetch only organization members with users - more efficient join
        const { data: orgMembers, error: membersError } = await supabase
          .from("organization_members")
          .select(`
            id, 
            user_id,
            users (id, full_name, email)
          `)
          .eq("organization_id", orgId)
          .limit(10);

        if (membersError) throw membersError;
        
        // Check if any user emails use non-example domains
        if (orgMembers?.some(member => 
          member.users?.email && !member.users.email.endsWith('@example.com'))) {
          setHasNonExampleEmails(true);
        }
        
        setMembers(orgMembers || []);
      } catch (error: any) {
        console.error("Error fetching organization data:", error);
        setError(error.message || "Failed to load organization data");
      } finally {
        setIsLoading(false);
      }
    };

    if (orgId) {
      fetchOrgData();
    }

    return () => controller.abort();
  }, [supabase, orgId]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
          <h2 className="text-red-800 dark:text-red-400 font-medium">Error loading dashboard</h2>
          <p className="text-red-700 dark:text-red-300 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!orgDetails) {
    return (
      <div className="p-6">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
          <h2 className="text-yellow-800 dark:text-yellow-400 font-medium">Organization not found</h2>
          <p className="text-yellow-700 dark:text-yellow-300 mt-1">Could not find organization with ID: {orgId}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Organization Dashboard</h1>
      
      {hasNonExampleEmails && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg mb-6">
          <h2 className="text-amber-800 dark:text-amber-400 font-medium">Development Environment Note</h2>
          <p className="text-amber-700 dark:text-amber-300 mt-1">
            Some email addresses in the seed data are using real domains instead of example.com.
            Consider updating the seed files to use example.com domains for best practices.
          </p>
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-2">{orgDetails.name}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {sanitizeEmail(orgDetails.billing_email)}
          {!orgDetails.billing_email?.endsWith('@example.com') && (
            <span className="ml-2 text-xs text-amber-600 dark:text-amber-400">(should use example.com)</span>
          )}
        </p>
        
        <h3 className="text-lg font-medium mb-3 border-b pb-2">Organization Members</h3>
        {members.length > 0 ? (
          <div className="grid gap-2">
            {members.map((member) => (
              <div key={member.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-medium mr-3">
                  {member.users?.full_name ? member.users.full_name.charAt(0).toUpperCase() : '?'}
                </div>
                <div>
                  <div className="font-medium">{member.users?.full_name || 'Unnamed User'}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {sanitizeEmail(member.users?.email) || member.user_id}
                    {member.users?.email && !member.users.email.endsWith('@example.com') && (
                      <span className="ml-2 text-xs text-amber-600 dark:text-amber-400">(should use example.com)</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No members found</p>
        )}
      </div>
    </div>
  );
}

export default function Dashboard({ dehydratedState, orgId }: DashboardProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent orgId={orgId} />
      </Suspense>
    </HydrationBoundary>
  );
}
