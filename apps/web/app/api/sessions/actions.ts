"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { Tables, TablesInsert } from "@repo/supabase";

export type EventSession = Tables<"event_sessions">;
export type EventSessionInsert = TablesInsert<"event_sessions">;
export type Attendance = Tables<"attendance">;
export type AttendanceInsert = TablesInsert<"attendance">;

// Event Sessions
export async function getEventSessions(eventId?: string, fromDate?: string, toDate?: string) {
  const supabase = await createClient();
  
  let query = supabase.from("event_sessions").select("*");
  
  if (eventId) {
    query = query.eq("event_id", eventId);
  }
  
  if (fromDate) {
    query = query.gte("session_date", fromDate);
  }
  
  if (toDate) {
    query = query.lte("session_date", toDate);
  }
  
  const { data, error } = await query.order("session_date", { ascending: true });
  
  if (error) {
    console.error("Error fetching event sessions:", error);
    throw new Error(`Error fetching event sessions: ${error.message}`);
  }
  
  return data;
}

export async function getEventSessionById(id: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("event_sessions")
    .select("*, event:events(*)")
    .eq("id", id)
    .single();
  
  if (error) {
    console.error(`Error fetching event session ${id}:`, error);
    throw new Error(`Error fetching event session: ${error.message}`);
  }
  
  return data;
}

export async function createEventSession(session: EventSessionInsert) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("event_sessions")
    .insert([session])
    .select()
    .single();
  
  if (error) {
    console.error("Error creating event session:", error);
    throw new Error(`Error creating event session: ${error.message}`);
  }
  
  revalidatePath(`/events/${session.event_id}/sessions`);
  return data;
}

export async function updateEventSession(id: string, session: Partial<EventSessionInsert>) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("event_sessions")
    .update(session)
    .eq("id", id)
    .select()
    .single();
  
  if (error) {
    console.error(`Error updating event session ${id}:`, error);
    throw new Error(`Error updating event session: ${error.message}`);
  }
  
  if (data && data.event_id) {
    revalidatePath(`/events/${data.event_id}/sessions`);
    revalidatePath(`/sessions/${id}`);
  }
  
  return data;
}

export async function deleteEventSession(id: string, eventId: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("event_sessions")
    .delete()
    .eq("id", id);
  
  if (error) {
    console.error(`Error deleting event session ${id}:`, error);
    throw new Error(`Error deleting event session: ${error.message}`);
  }
  
  revalidatePath(`/events/${eventId}/sessions`);
  return { success: true };
}

// Attendance
export async function getAttendanceForSession(sessionId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("attendance")
    .select(`
      *,
      beneficiary:beneficiaries(*),
      recorded_by_user:users(id, email, full_name)
    `)
    .eq("event_session_id", sessionId);
  
  if (error) {
    console.error(`Error fetching attendance for session ${sessionId}:`, error);
    throw new Error(`Error fetching attendance: ${error.message}`);
  }
  
  return data;
}

export async function getAttendanceForBeneficiary(beneficiaryId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("attendance")
    .select(`
      *,
      session:event_sessions(
        id,
        session_date,
        event:events(
          id,
          name
        )
      )
    `)
    .eq("beneficiary_id", beneficiaryId)
    .order("created_at", { ascending: false });
  
  if (error) {
    console.error(`Error fetching attendance for beneficiary ${beneficiaryId}:`, error);
    throw new Error(`Error fetching attendance: ${error.message}`);
  }
  
  return data;
}

export async function recordAttendance(attendance: AttendanceInsert) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("attendance")
    .insert([attendance])
    .select()
    .single();
  
  if (error) {
    console.error("Error recording attendance:", error);
    throw new Error(`Error recording attendance: ${error.message}`);
  }
  
  revalidatePath(`/sessions/${attendance.event_session_id}/attendance`);
  revalidatePath(`/beneficiaries/${attendance.beneficiary_id}/attendance`);
  return data;
}

export async function updateAttendance(id: string, attendance: Partial<AttendanceInsert>) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("attendance")
    .update(attendance)
    .eq("id", id)
    .select()
    .single();
  
  if (error) {
    console.error(`Error updating attendance ${id}:`, error);
    throw new Error(`Error updating attendance: ${error.message}`);
  }
  
  if (data) {
    revalidatePath(`/sessions/${data.event_session_id}/attendance`);
    revalidatePath(`/beneficiaries/${data.beneficiary_id}/attendance`);
  }
  
  return data;
}

export async function deleteAttendance(id: string, sessionId: string, beneficiaryId: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("attendance")
    .delete()
    .eq("id", id);
  
  if (error) {
    console.error(`Error deleting attendance ${id}:`, error);
    throw new Error(`Error deleting attendance: ${error.message}`);
  }
  
  revalidatePath(`/sessions/${sessionId}/attendance`);
  revalidatePath(`/beneficiaries/${beneficiaryId}/attendance`);
  return { success: true };
} 