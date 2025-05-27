"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { Tables, TablesInsert } from "@repo/supabase";

export type Beneficiary = Tables<"beneficiaries">;
export type BeneficiaryInsert = TablesInsert<"beneficiaries">;
export type BeneficiaryFieldValue = Tables<"beneficiary_field_values">;
export type BeneficiaryFieldValueInsert = TablesInsert<"beneficiary_field_values">;

export async function getBeneficiaries(organizationId?: string) {
  const supabase = await createClient();
  
  console.log('FETCHING BENEFICIARIES FOR ORG:', organizationId);
  
  let query = supabase
    .from("beneficiaries")
    .select(`
      *,
      field_values:beneficiary_field_values(
        id,
        custom_field_id,
        value,
        custom_field:custom_fields(
          id,
          label,
          field_type,
          options
        )
      )
    `);
  
  if (organizationId) {
    query = query.eq("organization_id", organizationId);
  }
  
  const { data, error } = await query.order("created_at", { ascending: false });
  
  if (error) {
    console.error("Error fetching beneficiaries:", error);
    throw new Error(`Error fetching beneficiaries: ${error.message}`);
  }
  
  console.log('BENEFICIARIES DATA:', JSON.stringify(data, null, 2));
  console.log('BENEFICIARIES COUNT:', data?.length || 0);
  
  return data;
}

export async function getBeneficiaryWithDetails(id: string) {
  const supabase = await createClient();
  
  // First get the beneficiary
  const { data: beneficiary, error: beneficiaryError } = await supabase
    .from("beneficiaries")
    .select("*")
    .eq("id", id)
    .single();
  
  if (beneficiaryError) {
    console.error(`Error fetching beneficiary ${id}:`, beneficiaryError);
    throw new Error(`Error fetching beneficiary: ${beneficiaryError.message}`);
  }
  
  // Then get all field values
  const { data: fieldValues, error: fieldValuesError } = await supabase
    .from("beneficiary_field_values")
    .select(`
      id,
      value,
      custom_field:custom_fields(
        id,
        label,
        field_type,
        options
      )
    `)
    .eq("beneficiary_id", id);
  
  if (fieldValuesError) {
    console.error(`Error fetching field values for beneficiary ${id}:`, fieldValuesError);
    throw new Error(`Error fetching field values: ${fieldValuesError.message}`);
  }
  
  return {
    ...beneficiary,
    fieldValues: fieldValues || []
  };
}

export async function createBeneficiary(
  beneficiary: BeneficiaryInsert,
  fieldValues: Array<{ custom_field_id: string; value: string | null }>
) {
  const supabase = await createClient();
  
  // Start a transaction
  try {
    // Create the beneficiary
    const { data: newBeneficiary, error: beneficiaryError } = await supabase
      .from("beneficiaries")
      .insert([beneficiary])
      .select()
      .single();
    
    if (beneficiaryError) {
      console.error("Error creating beneficiary:", beneficiaryError);
      throw new Error(`Error creating beneficiary: ${beneficiaryError.message}`);
    }
    
    // Create field values if they exist
    if (fieldValues.length > 0) {
      const formattedFieldValues = fieldValues.map(fv => ({
        beneficiary_id: newBeneficiary.id,
        custom_field_id: fv.custom_field_id,
        value: fv.value
      }));
      
      const { error: fieldValuesError } = await supabase
        .from("beneficiary_field_values")
        .insert(formattedFieldValues);
        
      if (fieldValuesError) {
        console.error("Error creating beneficiary field values:", fieldValuesError);
        throw new Error(`Error creating beneficiary field values: ${fieldValuesError.message}`);
      }
    }
    
    // Revalidate all possible paths that could display beneficiaries
    revalidatePath(`/org/${beneficiary.organization_id}`);
    revalidatePath(`/org/${beneficiary.organization_id}/beneficiaries`);
    // Revalidate team paths - this is imprecise but should cover most use cases
    revalidatePath(`/org/${beneficiary.organization_id}/[teamId]/beneficiaries`);

    return newBeneficiary;
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  }
}

export async function updateBeneficiaryFieldValue(id: string, value: string | null) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("beneficiary_field_values")
    .update({ value })
    .eq("id", id);
  
  if (error) {
    console.error(`Error updating field value ${id}:`, error);
    throw new Error(`Error updating field value: ${error.message}`);
  }
  
  return { success: true };
}

export async function createBeneficiaryFieldValue(
  beneficiaryId: string,
  customFieldId: string,
  value: string | null,
  organizationId: string
) {
  const supabase = await createClient();
  
  try {
    const { data, error } = await supabase
      .from("beneficiary_field_values")
      .insert({
        beneficiary_id: beneficiaryId,
        custom_field_id: customFieldId,
        value
      })
      .select()
      .single();
    
    if (error) {
      console.error("Error creating field value:", error);
      throw new Error(`Error creating field value: ${error.message}`);
    }
    
    // Revalidate paths
    revalidatePath(`/org/${organizationId}`);
    revalidatePath(`/org/${organizationId}/beneficiaries`);
    revalidatePath(`/org/${organizationId}/[teamId]/beneficiaries`);
    
    return data;
  } catch (error) {
    console.error("Error in createBeneficiaryFieldValue:", error);
    throw error;
  }
}

export async function deleteBeneficiary(id: string, organizationId: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("beneficiaries")
    .delete()
    .eq("id", id);
  
  if (error) {
    console.error(`Error deleting beneficiary ${id}:`, error);
    throw new Error(`Error deleting beneficiary: ${error.message}`);
  }
  
  // Revalidate all possible paths that could display beneficiaries
  revalidatePath(`/org/${organizationId}`);
  revalidatePath(`/org/${organizationId}/beneficiaries`);
  // Revalidate team paths - this is imprecise but should cover most use cases
  revalidatePath(`/org/${organizationId}/[teamId]/beneficiaries`);
  
  return { success: true };
}

export async function createTestBeneficiary(organizationId: string) {
  const supabase = await createClient();
  
  try {
    // 1. Get custom fields for this organization
    let { data: customFields, error: fieldsError } = await supabase
      .from("custom_fields")
      .select("*")
      .eq("organization_id", organizationId)
      .is("event_id", null);
      
    if (fieldsError) {
      console.error("Error fetching custom fields:", fieldsError);
      throw new Error(`Error fetching custom fields: ${fieldsError.message}`);
    }
    
    // Initialize customFields if null
    customFields = customFields || [];
    
    if (customFields.length === 0) {
      console.log('No custom fields found for this organization. Creating some...');
      
      // Create some test fields if none exist
      const { error: createFieldsError } = await supabase
        .from("custom_fields")
        .insert([
          {
            organization_id: organizationId,
            label: 'Full Name',
            field_type: 'text',
            is_required: true,
            sort_order: 1
          },
          {
            organization_id: organizationId,
            label: 'Email',
            field_type: 'text',
            is_required: false,
            sort_order: 2
          }
        ]);
        
      if (createFieldsError) {
        console.error("Error creating test fields:", createFieldsError);
        throw new Error(`Error creating test fields: ${createFieldsError.message}`);
      }
      
      // Fetch the created fields
      const { data: newFields, error: newFieldsError } = await supabase
        .from("custom_fields")
        .select("*")
        .eq("organization_id", organizationId)
        .is("event_id", null);
        
      if (newFieldsError) {
        console.error("Error fetching new fields:", newFieldsError);
        throw new Error(`Error fetching new fields: ${newFieldsError.message}`);
      }
      
      customFields = newFields || [];
    }
    
    // 2. Create a new beneficiary
    const { data: beneficiary, error: beneficiaryError } = await supabase
      .from("beneficiaries")
      .insert([
        {
          organization_id: organizationId
        }
      ])
      .select()
      .single();
      
    if (beneficiaryError || !beneficiary) {
      console.error("Error creating test beneficiary:", beneficiaryError);
      throw new Error(`Error creating test beneficiary: ${beneficiaryError?.message || "Unknown error"}`);
    }
    
    // 3. Create field values for the beneficiary
    const fieldValues = customFields.map((field) => ({
      beneficiary_id: beneficiary.id,
      custom_field_id: field.id,
      value: field.label === 'Full Name' ? 'Test User' : 'test@example.com'
    }));
    
    const { error: fieldValuesError } = await supabase
      .from("beneficiary_field_values")
      .insert(fieldValues);
      
    if (fieldValuesError) {
      console.error("Error creating test field values:", fieldValuesError);
      throw new Error(`Error creating test field values: ${fieldValuesError.message}`);
    }
    
    console.log('Created test beneficiary with ID:', beneficiary.id);
    return beneficiary;
    
  } catch (error) {
    console.error("Error in createTestBeneficiary:", error);
    throw error;
  }
} 