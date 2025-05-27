'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Event } from '@/app/api/events/actions'; // Import the Event type

interface EventsTableProps {
  events: Event[];
  orgId: string;
}

export default function EventsTable({ events, orgId }: EventsTableProps) {
  const router = useRouter();
  // Add state for modals, deletion etc. later if needed
  // const [editModalOpen, setEditModalOpen] = useState(false);
  // const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  // const [eventToInteract, setEventToInteract] = useState<Event | null>(null);

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "-"; // Handle null/undefined
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      console.error("Invalid date string:", dateString, e);
      return "Invalid Date";
    }
  };

  const handleEdit = (event: Event) => {
    console.log("Edit event:", event.id); 
    // TODO: Implement edit modal opening
    // setEventToInteract(event);
    // setEditModalOpen(true);
  };

  const handleDelete = (event: Event) => {
    console.log("Delete event:", event.id);
    // TODO: Implement delete confirmation
    // setEventToInteract(event);
    // setDeleteDialogOpen(true);
  };

  return (
    <div className="rounded-md border" data-testid="events-table">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No events found.
              </TableCell>
            </TableRow>
          ) : (
            events.map((event) => (
              <TableRow key={event.id} data-testid={`event-row-${event.id}`}>
                <TableCell className="font-medium">{event.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {event.description ?? "-"}
                </TableCell>
                <TableCell>{formatDate(event.start_date)}</TableCell>
                <TableCell>{formatDate(event.end_date)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        data-testid={`event-actions-${event.id}`}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleEdit(event)}
                        data-testid={`edit-event-${event.id}`}
                      >
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDelete(event)}
                        data-testid={`delete-event-${event.id}`}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {/* Add Edit Modal and Delete Dialog components here later */}
    </div>
  );
} 