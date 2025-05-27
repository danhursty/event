-- Add RLS policies for custom_fields table

-- Allow select for members of the organization
CREATE POLICY "Members can view custom fields for their organization"
ON public.custom_fields
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.organization_members om
    WHERE om.organization_id = custom_fields.organization_id
    AND om.user_id = auth.uid()
  )
);

-- Allow all operations for service role
CREATE POLICY "Service role can do all operations on custom fields"
ON public.custom_fields
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Add RLS policies for beneficiaries table

-- Allow select for members of the organization
CREATE POLICY "Members can view beneficiaries for their organization"
ON public.beneficiaries
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.organization_members om
    WHERE om.organization_id = beneficiaries.organization_id
    AND om.user_id = auth.uid()
  )
);

-- Allow insert for members of the organization
CREATE POLICY "Members can create beneficiaries for their organization"
ON public.beneficiaries
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.organization_members om
    WHERE om.organization_id = beneficiaries.organization_id
    AND om.user_id = auth.uid()
  )
);

-- Allow update for members of the organization
CREATE POLICY "Members can update beneficiaries for their organization"
ON public.beneficiaries
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.organization_members om
    WHERE om.organization_id = beneficiaries.organization_id
    AND om.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.organization_members om
    WHERE om.organization_id = beneficiaries.organization_id
    AND om.user_id = auth.uid()
  )
);

-- Allow delete for members of the organization
CREATE POLICY "Members can delete beneficiaries for their organization"
ON public.beneficiaries
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.organization_members om
    WHERE om.organization_id = beneficiaries.organization_id
    AND om.user_id = auth.uid()
  )
);

-- Allow all operations for service role
CREATE POLICY "Service role can do all operations on beneficiaries"
ON public.beneficiaries
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Add RLS policies for beneficiary_field_values table

-- Allow select for members of the organization
CREATE POLICY "Members can view beneficiary field values for their organization"
ON public.beneficiary_field_values
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.beneficiaries b
    JOIN public.organization_members om ON b.organization_id = om.organization_id
    WHERE beneficiary_field_values.beneficiary_id = b.id
    AND om.user_id = auth.uid()
  )
);

-- Allow insert for members of the organization
CREATE POLICY "Members can create beneficiary field values for their organization"
ON public.beneficiary_field_values
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.beneficiaries b
    JOIN public.organization_members om ON b.organization_id = om.organization_id
    WHERE beneficiary_field_values.beneficiary_id = b.id
    AND om.user_id = auth.uid()
  )
);

-- Allow update for members of the organization
CREATE POLICY "Members can update beneficiary field values for their organization"
ON public.beneficiary_field_values
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.beneficiaries b
    JOIN public.organization_members om ON b.organization_id = om.organization_id
    WHERE beneficiary_field_values.beneficiary_id = b.id
    AND om.user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.beneficiaries b
    JOIN public.organization_members om ON b.organization_id = om.organization_id
    WHERE beneficiary_field_values.beneficiary_id = b.id
    AND om.user_id = auth.uid()
  )
);

-- Allow delete for members of the organization
CREATE POLICY "Members can delete beneficiary field values for their organization"
ON public.beneficiary_field_values
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.beneficiaries b
    JOIN public.organization_members om ON b.organization_id = om.organization_id
    WHERE beneficiary_field_values.beneficiary_id = b.id
    AND om.user_id = auth.uid()
  )
);

-- Allow all operations for service role
CREATE POLICY "Service role can do all operations on beneficiary field values"
ON public.beneficiary_field_values
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role'); 