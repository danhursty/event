"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Beneficiary, deleteBeneficiary, getBeneficiaryWithDetails } from "@/app/api/beneficiaries/actions";
import { CustomField } from "@/app/api/custom-fields/actions";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { MoreHorizontal, Pencil, Trash2, Search } from "lucide-react";
import { formatRelative } from 'date-fns';
import { BeneficiaryEditModal } from "./BeneficiaryEditModal";
import type { VisibilityState } from "@tanstack/react-table";

// Extended type that includes field_values from our updated getBeneficiaries query
interface BeneficiaryWithFields extends Beneficiary {
  field_values: Array<{
    id: string;
    custom_field_id: string;
    value: string | null;
    custom_field: {
      id: string;
      label: string;
      field_type: string;
      options: any;
    };
  }> | null;
}

interface BeneficiariesTableProps {
  beneficiaries: BeneficiaryWithFields[];
  customFields: CustomField[];
  orgId: string;
}

export default function BeneficiariesTable({ 
  beneficiaries, 
  customFields,
  orgId
}: BeneficiariesTableProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [beneficiaryToDelete, setBeneficiaryToDelete] = useState<BeneficiaryWithFields | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<BeneficiaryWithFields | null>(null);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  // Show only organization-wide custom fields (not event-specific) in the table
  const orgFields = customFields.filter(field => !field.event_id);
  
  // Helper to get field value for a specific beneficiary and custom field
  const getFieldValue = (beneficiary: BeneficiaryWithFields, fieldId: string) => {
    const fieldValue = beneficiary.field_values?.find(
      fv => fv.custom_field_id === fieldId
    );
    return fieldValue?.value || '';
  };

  // Filter beneficiaries based on search query
  const filteredBeneficiaries = beneficiaries.filter(beneficiary => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    
    // Search by ID
    if (beneficiary.id.toLowerCase().includes(query)) return true;
    
    // Search by field values
    return beneficiary.field_values?.some(fv => 
      fv.value?.toLowerCase().includes(query)
    ) || false;
  });

  async function handleDelete() {
    if (!beneficiaryToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteBeneficiary(beneficiaryToDelete.id, orgId);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete beneficiary:", error);
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setBeneficiaryToDelete(null);
    }
  }

  // Format field value based on field type
  const formatFieldValue = (value: string | null, fieldType: string) => {
    if (value === null) return "";
    
    switch (fieldType) {
      case 'date':
        return value ? new Date(value).toLocaleDateString() : "";
      case 'checkbox':
        return value === 'true' ? "Yes" : "No";
      default:
        return value;
    }
  };

  // Function to open the edit modal for a beneficiary
  const handleEditBeneficiary = (beneficiary: BeneficiaryWithFields) => {
    setSelectedBeneficiary(beneficiary);
    setEditModalOpen(true);
  };

  return (
    <div className="space-y-4" data-testid="beneficiaries-table">
      {/* Search and filters */}
      <div className="flex items-center">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search beneficiaries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
            data-testid="search-beneficiaries"
          />
        </div>
      </div>

      {/* Beneficiaries table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              {orgFields.map((field) => (
                <TableHead key={field.id}>{field.label}</TableHead>
              ))}
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBeneficiaries.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={orgFields.length + 3} 
                  className="h-24 text-center"
                >
                  {beneficiaries.length === 0 
                    ? "No beneficiaries found. Add your first beneficiary to get started."
                    : "No matching beneficiaries found."}
                </TableCell>
              </TableRow>
            ) : (
              filteredBeneficiaries.map((beneficiary) => (
                <TableRow key={beneficiary.id} data-testid={`beneficiary-row-${beneficiary.id}`}>
                  <TableCell className="font-medium">
                    <span>
                      {beneficiary.id.split('-')[0]}
                    </span>
                  </TableCell>
                  
                  {/* Display actual field values */}
                  {orgFields.map((field) => {
                    const fieldValue = beneficiary.field_values?.find(
                      fv => fv.custom_field_id === field.id
                    );
                    
                    return (
                      <TableCell key={field.id}>
                        {fieldValue 
                          ? formatFieldValue(fieldValue.value, field.field_type)
                          : <span className="text-muted-foreground text-sm">—</span>
                        }
                      </TableCell>
                    );
                  })}
                  
                  <TableCell>
                    {formatRelative(new Date(beneficiary.created_at), new Date())}
                  </TableCell>
                  
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          data-testid={`beneficiary-actions-${beneficiary.id}`}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleEditBeneficiary(beneficiary)}
                          data-testid={`edit-beneficiary-${beneficiary.id}`}
                        >
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => {
                            setBeneficiaryToDelete(beneficiary);
                            setDeleteDialogOpen(true);
                          }}
                          data-testid={`delete-beneficiary-${beneficiary.id}`}
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
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the beneficiary
              and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 focus:ring-red-600"
              data-testid="confirm-delete-button"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit modal */}
      <BeneficiaryEditModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        beneficiary={selectedBeneficiary}
        customFields={customFields}
        orgId={orgId}
        onSuccess={() => router.refresh()}
      />
    </div>
  );
} 