-- Create Beneficiary Field Values table
CREATE TABLE public.beneficiary_field_values (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    beneficiary_id UUID NOT NULL REFERENCES public.beneficiaries(id) ON DELETE CASCADE,
    custom_field_id UUID NOT NULL REFERENCES public.custom_fields(id) ON DELETE CASCADE,
    value TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (now() AT TIME ZONE 'UTC'),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT (now() AT TIME ZONE 'UTC')
);

-- Create trigger for beneficiary_field_values updated_at
CREATE TRIGGER update_beneficiary_field_values_updated_at
    BEFORE UPDATE ON public.beneficiary_field_values
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column(); 