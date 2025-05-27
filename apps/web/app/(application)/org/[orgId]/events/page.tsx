import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { getEvents } from "@/app/api/events/actions";
import EventsTable from "@/components/events/EventsTable";

export const metadata: Metadata = {
  title: "Events",
  description: "Manage events for your organization",
};

export default async function EventsPage({
  params,
  searchParams, // Keep searchParams if needed for new/edit actions later
}: {
  params: Promise<{ orgId: string }>;
  searchParams: { action?: string; id?: string };
}) {
  const { orgId } = await params;
  const { action } = searchParams;

  // TODO: Handle action === 'new' later by showing an EventForm component
  // if (action === 'new') { ... }

  // Fetch events for this organization
  const events = await getEvents(orgId);

  return (
    <div className="container py-6 space-y-6" data-testid="events-page">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">
            View and manage your organization's events
          </p>
        </div>
        <Link href={`/org/${orgId}/events?action=new`}>
          <Button data-testid="create-event-button">
            <Plus className="mr-2 h-4 w-4" /> Add Event
          </Button>
        </Link>
      </div>
      
      <Separator />
      
      <EventsTable 
        events={events}
        orgId={orgId}
      />
    </div>
  );
} 