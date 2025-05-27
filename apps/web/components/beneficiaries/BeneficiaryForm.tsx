"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createBeneficiary, updateBeneficiaryFieldValue, Beneficiary } from "@/app/api/beneficiaries/actions";
import { CustomField } from "@/app/api/custom-fields/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, Loader2 } from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

// Define BeneficiaryWithFields locally
interface BeneficiaryFieldValue {
  id: string;
  custom_field_id: string;
  value: string | null;
  custom_field?: { // Make custom_field optional if not always present
    id: string;
    label: string;
    field_type: string;
    options: any;
  };
}
interface BeneficiaryWithFields extends Beneficiary { // Extend the base Beneficiary type
  field_values: BeneficiaryFieldValue[] | null;
}

interface BeneficiaryFormProps {
  customFields: CustomField[];
  orgId: string;
  beneficiary?: BeneficiaryWithFields | null; // Use the local extended type
}

export function BeneficiaryForm({ 
  customFields, 
  beneficiary, 
  orgId,
}: BeneficiaryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditing = !!beneficiary;
  
  // Filter to show only organization-level fields, not event-specific
  const orgFields = customFields.filter(field => !field.event_id);
  
  // Dynamically build the form schema based on custom fields
  const formSchema = z.object({
    // Add any field values as needed
    fieldValues: z.array(
      z.object({
        id: z.string().optional(),
        custom_field_id: z.string(),
        value: z.string().nullable(),
      })
    ),
  });

  type FormValues = z.infer<typeof formSchema>;

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fieldValues: orgFields.map(field => ({
        custom_field_id: field.id,
        value: null,
      })),
    },
  });

  // Set form values when editing an existing beneficiary
  useEffect(() => {
    if (isEditing && beneficiary && beneficiary.field_values) {
      // Map the existing field values
      const initialValues = orgFields.map(field => {
        // Find matching field value if it exists
        const existingValue = beneficiary.field_values?.find(
          (fv) => fv.custom_field_id === field.id // Access custom_field_id directly
        );
        
        return {
          id: existingValue?.id,
          custom_field_id: field.id,
          value: existingValue?.value || null,
        };
      });
      
      form.reset({ fieldValues: initialValues });
    }
  }, [isEditing, beneficiary, orgFields, form]);

  async function onSubmit(data: FormValues) {
    setLoading(true);

    try {
      if (isEditing) {
        // Handle updating existing beneficiary
        const updatePromises = data.fieldValues.map(async fieldValue => {
          if (fieldValue.id) {
            // Update existing field value
            return updateBeneficiaryFieldValue(fieldValue.id, fieldValue.value);
          } else {
            // Create new field value for existing beneficiary
            // This would need an additional API function
            console.log("Would create new field value:", fieldValue);
            return null;
          }
        });
        
        await Promise.all(updatePromises);
      } else {
        // Handle creating new beneficiary
        await createBeneficiary(
          { organization_id: orgId }, // Basic beneficiary info
          data.fieldValues // Field values from the form
        );
      }
      
      // Navigate back to the beneficiaries list
      router.push(`/org/${orgId}/beneficiaries`);
      router.refresh();
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} beneficiary:`, error);
    } finally {
      setLoading(false);
    }
  }

  // Render form control based on field type
  function renderField(field: CustomField, index: number) {
    switch (field.field_type) {
      case 'text':
        return (
          <FormField
            key={field.id}
            control={form.control}
            name={`fieldValues.${index}.value`}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}{field.is_required && ' *'}</FormLabel>
                <FormControl>
                  <Input 
                    {...formField} 
                    value={formField.value || ''} 
                    data-testid={`field-${field.id}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      
      case 'textarea':
        return (
          <FormField
            key={field.id}
            control={form.control}
            name={`fieldValues.${index}.value`}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}{field.is_required && ' *'}</FormLabel>
                <FormControl>
                  <Textarea 
                    {...formField} 
                    value={formField.value || ''} 
                    rows={4}
                    data-testid={`field-${field.id}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      
      case 'select':
        const options = field.options as { options: string[] } | null;
        return (
          <FormField
            key={field.id}
            control={form.control}
            name={`fieldValues.${index}.value`}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}{field.is_required && ' *'}</FormLabel>
                <Select 
                  onValueChange={formField.onChange} 
                  defaultValue={formField.value || ''}
                  value={formField.value || ''}
                >
                  <FormControl>
                    <SelectTrigger data-testid={`field-${field.id}`}>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {options?.options?.map((option: string) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        );
        
      case 'date':
        return (
          <FormField
            key={field.id}
            control={form.control}
            name={`fieldValues.${index}.value`}
            render={({ field: formField }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{field.label}{field.is_required && ' *'}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !formField.value && "text-muted-foreground"
                        )}
                        data-testid={`field-${field.id}`}
                      >
                        {formField.value ? (
                          format(new Date(formField.value), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formField.value ? new Date(formField.value) : undefined}
                      onSelect={(date) => formField.onChange(date ? format(date, 'yyyy-MM-dd') : null)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        );
        
      case 'checkbox':
        return (
          <FormField
            key={field.id}
            control={form.control}
            name={`fieldValues.${index}.value`}
            render={({ field: formField }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={formField.value === 'true'}
                    onCheckedChange={(checked) => {
                      formField.onChange(checked ? 'true' : 'false');
                    }}
                    data-testid={`field-${field.id}`}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{field.label}{field.is_required && ' *'}</FormLabel>
                  <FormDescription>
                    Check this box if applicable
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        );
        
      default:
        return (
          <FormField
            key={field.id}
            control={form.control}
            name={`fieldValues.${index}.value`}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}{field.is_required && ' *'}</FormLabel>
                <FormControl>
                  <Input 
                    {...formField} 
                    value={formField.value || ''} 
                    data-testid={`field-${field.id}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {orgFields.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No custom fields defined. Please define some custom fields first.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {orgFields.map((field, index) => renderField(field, index))}
              </div>
            )}
            
            <div className="flex justify-end space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.back()}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading || orgFields.length === 0}
                data-testid="submit-beneficiary"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? 'Update' : 'Create'} Beneficiary
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 