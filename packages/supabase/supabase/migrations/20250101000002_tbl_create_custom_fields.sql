-- Create Custom Fields table for beneficiary data collection
CREATE TABLE public.custom_fields (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    field_type TEXT NOT NULL, -- e.g., 'text', 'number', 'date', 'select', 'checkbox'
    is_required BOOLEAN DEFAULT FALSE,
    options JSONB, -- For select fields or other field types with options
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (now() AT TIME ZONE 'UTC'),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT (now() AT TIME ZONE 'UTC')
);

-- Create trigger for custom_fields updated_at
CREATE TRIGGER update_custom_fields_updated_at
    BEFORE UPDATE ON public.custom_fields
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column(); 