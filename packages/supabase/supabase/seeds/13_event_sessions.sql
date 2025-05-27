-- Seed data for event sessions
INSERT INTO public.event_sessions (id, event_id, session_date, start_time, end_time, location, notes, created_by)
VALUES
  -- Sessions for Summer Camp (one-time event)
  ('a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0',
   '11111111-1111-1111-1111-111111111111', -- Summer Camp 2023
   '2023-07-01',
   '09:00',
   '16:00',
   'Main Camp Ground',
   'First day of camp - orientation and team building',
   '30303030-3030-3030-3030-303030303030'), -- team.admin@example.com
   
  ('b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
   '11111111-1111-1111-1111-111111111111', -- Summer Camp 2023
   '2023-07-02',
   '09:00',
   '16:00',
   'Main Camp Ground',
   'Hiking and outdoor activities',
   '30303030-3030-3030-3030-303030303030'), -- team.admin@example.com
   
  ('c2c2c2c2-c2c2-c2c2-c2c2-c2c2c2c2c2c2',
   '11111111-1111-1111-1111-111111111111', -- Summer Camp 2023
   '2023-07-03',
   '09:00',
   '16:00',
   'Swimming Pool',
   'Swimming and water activities day',
   '30303030-3030-3030-3030-303030303030'), -- team.admin@example.com
   
  -- Sessions for Coding Club (recurring event)
  ('d3d3d3d3-d3d3-d3d3-d3d3-d3d3d3d3d3d3',
   '22222222-2222-2222-2222-222222222222', -- Coding Club
   '2023-09-01',
   '16:00',
   '18:00',
   'Computer Lab',
   'Introduction to programming concepts',
   '11111111-1111-1111-1111-111111111111'), -- team.admin-no-members@example.com
   
  ('e4e4e4e4-e4e4-e4e4-e4e4-e4e4e4e4e4e4',
   '22222222-2222-2222-2222-222222222222', -- Coding Club
   '2023-09-08',
   '16:00',
   '18:00',
   'Computer Lab',
   'Variables and data types',
   '11111111-1111-1111-1111-111111111111'), -- team.admin-no-members@example.com
   
  ('f5f5f5f5-f5f5-f5f5-f5f5-f5f5f5f5f5f5',
   '22222222-2222-2222-2222-222222222222', -- Coding Club
   '2023-09-15',
   '16:00',
   '18:00',
   'Computer Lab',
   'Control structures',
   '11111111-1111-1111-1111-111111111111'), -- team.admin-no-members@example.com
   
  -- Sessions for Mental Health Support Group (recurring)
  ('a6a6a6a6-a6a6-a6a6-a6a6-a6a6a6a6a6a6',
   '33333333-3333-3333-3333-333333333333', -- Mental Health Support Group
   '2023-10-04',
   '18:00',
   '19:30',
   'Community Center Room B',
   'Introduction and establishing group norms',
   '33333333-3333-3333-3333-333333333333'), -- client.admin@example.com
   
  ('b7b7b7b7-b7b7-b7b7-b7b7-b7b7b7b7b7b7',
   '33333333-3333-3333-3333-333333333333', -- Mental Health Support Group
   '2023-10-18',
   '18:00',
   '19:30',
   'Community Center Room B',
   'Stress management techniques',
   '33333333-3333-3333-3333-333333333333'); -- client.admin@example.com 