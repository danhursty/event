"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { Tables, TablesInsert } from "@repo/supabase";

export type Event = Tables<"events">;
export type EventInsert = TablesInsert<"events">;

/**
 * Fetches all events for a given organization.
 * @param organizationId The UUID of the organization.
 * @returns Promise<Event[]> An array of events.
 */
export async function getEvents(organizationId: string): Promise<Event[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .select("*") // Select all columns for now
    .eq("organization_id", organizationId)
    .order("start_date", { ascending: true }); // Order by start date

  if (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events. " + error.message);
  }

  return data || [];
}

export async function getEventById(id: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();
  
  if (error) {
    console.error(`Error fetching event ${id}:`, error);
    throw new Error(`Error fetching event: ${error.message}`);
  }
  
  return data;
}

export async function createEvent(event: EventInsert) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("events")
    .insert([event])
    .select()
    .single();
  
  if (error) {
    console.error("Error creating event:", error);
    throw new Error(`Error creating event: ${error.message}`);
  }
  
  revalidatePath("/events");
  return data;
}

export async function updateEvent(id: string, event: Partial<EventInsert>) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("events")
    .update(event)
    .eq("id", id)
    .select()
    .single();
  
  if (error) {
    console.error(`Error updating event ${id}:`, error);
    throw new Error(`Error updating event: ${error.message}`);
  }
  
  revalidatePath("/events");
  revalidatePath(`/events/${id}`);
  return data;
}

export async function deleteEvent(id: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("events")
    .delete()
    .eq("id", id);
  
  if (error) {
    console.error(`Error deleting event ${id}:`, error);
    throw new Error(`Error deleting event: ${error.message}`);
  }
  
  revalidatePath("/events");
  return { success: true };
} 