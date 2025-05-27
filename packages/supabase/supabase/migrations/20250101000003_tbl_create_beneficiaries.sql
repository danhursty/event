-- Create Beneficiaries table
CREATE TABLE public.beneficiaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    submitted_by UUID REFERENCES auth.users ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (now() AT TIME ZONE 'UTC'),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT (now() AT TIME ZONE 'UTC')
);

-- Create trigger for beneficiaries updated_at
CREATE TRIGGER update_beneficiaries_updated_at
    BEFORE UPDATE ON public.beneficiaries
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column(); 