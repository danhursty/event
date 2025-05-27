-- Create Event Sessions table for tracking individual occurrences of events
CREATE TABLE public.event_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    session_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    location TEXT,
    notes TEXT,
    created_by UUID REFERENCES auth.users ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (now() AT TIME ZONE 'UTC'),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT (now() AT TIME ZONE 'UTC')
);

-- Create trigger for event_sessions updated_at
CREATE TRIGGER update_event_sessions_updated_at
    BEFORE UPDATE ON public.event_sessions
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column(); 