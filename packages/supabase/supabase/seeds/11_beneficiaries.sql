-- Seed data for beneficiaries
INSERT INTO public.beneficiaries (id, organization_id, submitted_by)
VALUES
  -- Beneficiaries for Multi-Team Organization
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
   '11111111-2222-3333-4444-555555555555', -- Multi-Team Organization
   '30303030-3030-3030-3030-303030303030'), -- team.admin@example.com
   
  ('cccccccc-cccc-cccc-cccc-cccccccccccc',
   '11111111-2222-3333-4444-555555555555', -- Multi-Team Organization
   '30303030-3030-3030-3030-303030303030'), -- team.admin@example.com
   
  ('dddddddd-dddd-dddd-dddd-dddddddddddd',
   '11111111-2222-3333-4444-555555555555', -- Multi-Team Organization
   '22222222-2222-2222-2222-222222222222'), -- team.member@example.com
   
  -- Beneficiaries for No Teams Organization
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
   '22222222-3333-4444-5555-666666666666', -- No Teams Organization
   '11111111-1111-1111-1111-111111111111'), -- team.admin-no-members@example.com
   
  -- Beneficiaries for Client Organization
  ('ffffffff-ffff-ffff-ffff-ffffffffffff',
   '33333333-4444-5555-6666-777777777777', -- Client Organization
   '33333333-3333-3333-3333-333333333333'), -- client.admin@example.com
   
  ('55555555-6666-7777-8888-999999999999',
   '33333333-4444-5555-6666-777777777777', -- Client Organization
   '44444444-4444-4444-4444-444444444444'); -- client.member@example.com 