"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { Tables, TablesInsert } from "@repo/supabase";

export type CustomField = Tables<"custom_fields">;
export type CustomFieldInsert = TablesInsert<"custom_fields">;

export async function getCustomFields(organizationId?: string, eventId?: string) {
  const supabase = await createClient();
  
  let query = supabase.from("custom_fields").select("*");
  
  if (organizationId) {
    query = query.eq("organization_id", organizationId);
  }
  
  if (eventId) {
    query = query.eq("event_id", eventId);
  }
  
  const { data, error } = await query.order("sort_order", { ascending: true });
  
  if (error) {
    console.error("Error fetching custom fields:", error);
    throw new Error(`Error fetching custom fields: ${error.message}`);
  }
  
  return data;
}

export async function getCustomFieldById(id: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("custom_fields")
    .select("*")
    .eq("id", id)
    .single();
  
  if (error) {
    console.error(`Error fetching custom field ${id}:`, error);
    throw new Error(`Error fetching custom field: ${error.message}`);
  }
  
  return data;
}

export async function createCustomField(customField: CustomFieldInsert) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("custom_fields")
    .insert([customField])
    .select()
    .single();
  
  if (error) {
    console.error("Error creating custom field:", error);
    throw new Error(`Error creating custom field: ${error.message}`);
  }
  
  revalidatePath(`/events/${customField.event_id}/fields`);
  revalidatePath(`/organizations/${customField.organization_id}/fields`);
  return data;
}

export async function updateCustomField(id: string, customField: Partial<CustomFieldInsert>) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("custom_fields")
    .update(customField)
    .eq("id", id)
    .select()
    .single();
  
  if (error) {
    console.error(`Error updating custom field ${id}:`, error);
    throw new Error(`Error updating custom field: ${error.message}`);
  }
  
  if (data) {
    if (data.event_id) {
      revalidatePath(`/events/${data.event_id}/fields`);
    }
    revalidatePath(`/organizations/${data.organization_id}/fields`);
  }
  
  return data;
}

export async function deleteCustomField(id: string) {
  const supabase = await createClient();
  
  // First get the field to know which paths to revalidate
  const { data: field, error: fetchError } = await supabase
    .from("custom_fields")
    .select("event_id, organization_id")
    .eq("id", id)
    .single();
  
  if (fetchError) {
    console.error(`Error fetching custom field ${id} before deletion:`, fetchError);
    throw new Error(`Error fetching custom field: ${fetchError.message}`);
  }
  
  const { error } = await supabase
    .from("custom_fields")
    .delete()
    .eq("id", id);
  
  if (error) {
    console.error(`Error deleting custom field ${id}:`, error);
    throw new Error(`Error deleting custom field: ${error.message}`);
  }
  
  if (field) {
    if (field.event_id) {
      revalidatePath(`/events/${field.event_id}/fields`);
    }
    revalidatePath(`/organizations/${field.organization_id}/fields`);
  }
  
  return { success: true };
} 