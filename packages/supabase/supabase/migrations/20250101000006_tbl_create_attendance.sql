-- Create Attendance table for tracking beneficiary attendance at event sessions
CREATE TABLE public.attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_session_id UUID NOT NULL REFERENCES public.event_sessions(id) ON DELETE CASCADE,
    beneficiary_id UUID NOT NULL REFERENCES public.beneficiaries(id) ON DELETE CASCADE,
    present BOOLEAN DEFAULT TRUE,
    notes TEXT,
    recorded_by UUID REFERENCES auth.users ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (now() AT TIME ZONE 'UTC'),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT (now() AT TIME ZONE 'UTC')
);

-- Create trigger for attendance updated_at
CREATE TRIGGER update_attendance_updated_at
    BEFORE UPDATE ON public.attendance
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Create unique constraint to prevent duplicate attendance records
ALTER TABLE public.attendance
ADD CONSTRAINT unique_attendance_record UNIQUE (event_session_id, beneficiary_id); 