import { Metadata } from "next";
import { getBeneficiaries } from "@/app/api/beneficiaries/actions";
import { getCustomFields } from "@/app/api/custom-fields/actions";
import BeneficiariesTable from "@/components/beneficiaries/BeneficiariesTable";
import { BeneficiaryForm } from "@/components/beneficiaries/BeneficiaryForm";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Beneficiaries",
  description: "Manage beneficiaries and their information",
};

export default async function BeneficiariesPage({
  params,
  searchParams,
}: {
  params: Promise<{ orgId: string }>;
  searchParams: { action?: string; id?: string };
}) {
  const { orgId } = await params;
  const { action } = searchParams;
  
  // Fetch custom fields to determine table columns
  const customFields = await getCustomFields(orgId);
  
  // Show beneficiary form if action is 'new'
  if (action === 'new') {
    return (
      <div className="container py-6 space-y-6" data-testid="new-beneficiary-page">
        <div className="flex items-center justify-between">
          <div>
            <Link
              href={`/org/${orgId}/beneficiaries`}
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> 
              Back to Beneficiaries
            </Link>
            <h1 className="text-3xl font-bold tracking-tight mt-2">Add New Beneficiary</h1>
            <p className="text-muted-foreground">
              Create a new beneficiary record for your organization
            </p>
          </div>
        </div>
        
        <Separator />
        
        <BeneficiaryForm 
          customFields={customFields}
          orgId={orgId}
        />
      </div>
    );
  }
  
  // Main beneficiaries list view
  // Fetch beneficiaries for this organization
  const beneficiaries = await getBeneficiaries(orgId);
  const fields = await getCustomFields(orgId);
  
  console.log('Page data:', {
    orgId,
    customFieldsCount: fields.length,
    beneficiariesCount: beneficiaries.length,
    beneficiariesData: beneficiaries 
  });
  
  return (
    <div className="container py-6 space-y-6" data-testid="beneficiaries-page">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Beneficiaries</h1>
          <p className="text-muted-foreground">
            View and manage your organization's beneficiaries
          </p>
        </div>
        <Link href={`/org/${orgId}/beneficiaries?action=new`}>
          <Button data-testid="create-beneficiary-button">
            <Plus className="mr-2 h-4 w-4" /> Add Beneficiary
          </Button>
        </Link>
      </div>
      
      <Separator />
      
      <BeneficiariesTable 
        beneficiaries={beneficiaries}
        customFields={customFields}
        orgId={orgId}
      />
    </div>
  );
} 