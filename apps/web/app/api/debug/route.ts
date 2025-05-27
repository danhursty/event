import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createTestBeneficiary } from "../beneficiaries/actions";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams;
    const orgId = searchParams.get("org_id");
    
    if (!orgId) {
      return NextResponse.json({ error: "Missing org_id parameter" }, { status: 400 });
    }
    
    // Create a test beneficiary for the given organization
    const beneficiary = await createTestBeneficiary(orgId);
    
    return NextResponse.json({ 
      success: true, 
      message: "Created test beneficiary", 
      beneficiary_id: beneficiary.id 
    });
  } catch (error) {
    console.error("Debug route error:", error);
    return NextResponse.json({ 
      error: "Failed to create test beneficiary", 
      message: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
} 