-- Seed data for attendance records
INSERT INTO public.attendance (id, event_session_id, beneficiary_id, present, notes, recorded_by)
VALUES
  -- Attendance for Summer Camp sessions
  -- John Smith attendance
  ('c0c0c0c0-c0c0-c0c0-c0c0-c0c0c0c0c0c0',
   'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0', -- First day of camp
   'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', -- John Smith
   TRUE,
   'Arrived on time',
   '30303030-3030-3030-3030-303030303030'), -- team.admin@example.com
   
  ('d1d1d1d1-d1d1-d1d1-d1d1-d1d1d1d1d1d1',
   'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1', -- Second day of camp
   'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', -- John Smith
   TRUE,
   'Participated in all activities',
   '30303030-3030-3030-3030-303030303030'), -- team.admin@example.com
   
  ('e2e2e2e2-e2e2-e2e2-e2e2-e2e2e2e2e2e2',
   'c2c2c2c2-c2c2-c2c2-c2c2-c2c2c2c2c2c2', -- Swimming day
   'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', -- John Smith
   TRUE,
   'Performed well in swimming activities',
   '30303030-3030-3030-3030-303030303030'), -- team.admin@example.com
   
  -- Emma Johnson attendance
  ('f3f3f3f3-f3f3-f3f3-f3f3-f3f3f3f3f3f3',
   'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0', -- First day of camp
   'cccccccc-cccc-cccc-cccc-cccccccccccc', -- Emma Johnson
   TRUE,
   'Arrived late but participated well',
   '30303030-3030-3030-3030-303030303030'), -- team.admin@example.com
   
  ('a4a4a4a4-a4a4-a4a4-a4a4-a4a4a4a4a4a4',
   'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1', -- Second day of camp
   'cccccccc-cccc-cccc-cccc-cccccccccccc', -- Emma Johnson
   FALSE,
   'Absent due to illness',
   '22222222-2222-2222-2222-222222222222'), -- team.member@example.com
   
  ('b5b5b5b5-b5b5-b5b5-b5b5-b5b5b5b5b5b5',
   'c2c2c2c2-c2c2-c2c2-c2c2-c2c2c2c2c2c2', -- Swimming day
   'cccccccc-cccc-cccc-cccc-cccccccccccc', -- Emma Johnson
   TRUE,
   'Returned from illness, limited participation',
   '22222222-2222-2222-2222-222222222222'), -- team.member@example.com
   
  -- Attendance for Coding Club sessions
  ('c6c6c6c6-c6c6-c6c6-c6c6-c6c6c6c6c6c6',
   'd3d3d3d3-d3d3-d3d3-d3d3-d3d3d3d3d3d3', -- Introduction session
   'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', -- Beneficiary from No Teams Org
   TRUE,
   'Very engaged, asked many questions',
   '11111111-1111-1111-1111-111111111111'), -- team.admin-no-members@example.com
   
  ('d7d7d7d7-d7d7-d7d7-d7d7-d7d7d7d7d7d7',
   'e4e4e4e4-e4e4-e4e4-e4e4-e4e4e4e4e4e4', -- Variables session
   'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', -- Beneficiary from No Teams Org
   TRUE,
   'Completed all exercises quickly',
   '11111111-1111-1111-1111-111111111111'); -- team.admin-no-members@example.com 