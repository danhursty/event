-- Seed data for events
INSERT INTO public.events (id, organization_id, name, description, start_date, end_date, recurring, recurrence_pattern)
VALUES
  -- One-time event
  ('11111111-1111-1111-1111-111111111111', 
   '11111111-2222-3333-4444-555555555555', -- Multi-Team Organization
   'Summer Camp 2023',
   'Annual summer activity camp for youth',
   '2023-07-01',
   '2023-07-14',
   FALSE,
   NULL),
   
  -- Weekly recurring event
  ('22222222-2222-2222-2222-222222222222',
   '22222222-3333-4444-5555-666666666666', -- No Teams Organization
   'Coding Club',
   'Weekly coding sessions for teens',
   '2023-09-01',
   '2023-12-15',
   TRUE,
   '{"frequency": "weekly", "day_of_week": ["friday"], "time": "16:00"}'),
   
  -- Bi-weekly recurring event
  ('33333333-3333-3333-3333-333333333333',
   '33333333-4444-5555-6666-777777777777', -- Client Organization
   'Mental Health Support Group',
   'Bi-weekly support sessions for teens',
   '2023-10-01',
   '2024-03-31',
   TRUE,
   '{"frequency": "biweekly", "day_of_week": ["wednesday"], "time": "18:00"}'); 