-- Seed data for custom fields
INSERT INTO public.custom_fields (id, organization_id, event_id, label, field_type, is_required, options, sort_order)
VALUES
  -- Organization-wide custom fields (not specific to an event)
  ('44444444-4444-4444-4444-444444444444',
   '11111111-2222-3333-4444-555555555555', -- Multi-Team Organization
   NULL,
   'Full Name',
   'text',
   TRUE,
   NULL,
   1),
   
  ('55555555-5555-5555-5555-555555555555',
   '11111111-2222-3333-4444-555555555555', -- Multi-Team Organization
   NULL,
   'Date of Birth',
   'date',
   TRUE,
   NULL,
   2),
   
  ('66666666-6666-6666-6666-666666666666',
   '11111111-2222-3333-4444-555555555555', -- Multi-Team Organization
   NULL,
   'Gender',
   'select',
   TRUE,
   '{"options": ["Male", "Female", "Non-binary", "Prefer not to say"]}',
   3),
   
  -- Event-specific custom fields
  ('77777777-7777-7777-7777-777777777777',
   '11111111-2222-3333-4444-555555555555', -- Multi-Team Organization
   '11111111-1111-1111-1111-111111111111', -- Summer Camp 2023
   'Swimming Ability',
   'select',
   TRUE,
   '{"options": ["Non-swimmer", "Beginner", "Intermediate", "Advanced"]}',
   1),
   
  ('88888888-8888-8888-8888-888888888888',
   '11111111-2222-3333-4444-555555555555', -- Multi-Team Organization
   '11111111-1111-1111-1111-111111111111', -- Summer Camp 2023
   'Allergies',
   'text',
   FALSE,
   NULL,
   2),
   
  -- Custom fields for other organization
  ('99999999-9999-9999-9999-999999999999',
   '22222222-3333-4444-5555-666666666666', -- No Teams Organization
   '22222222-2222-2222-2222-222222222222', -- Coding Club
   'Programming Experience',
   'select',
   TRUE,
   '{"options": ["None", "Beginner", "Intermediate", "Advanced"]}',
   1),
   
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
   '22222222-3333-4444-5555-666666666666', -- No Teams Organization
   '22222222-2222-2222-2222-222222222222', -- Coding Club
   'Preferred Programming Language',
   'select',
   FALSE,
   '{"options": ["Python", "JavaScript", "Java", "C++", "Other"]}',
   2); 