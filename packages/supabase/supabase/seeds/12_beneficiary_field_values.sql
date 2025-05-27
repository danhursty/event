-- Seed data for beneficiary field values
INSERT INTO public.beneficiary_field_values (id, beneficiary_id, custom_field_id, value)
VALUES
  -- Values for first beneficiary in Multi-Team Organization
  ('a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1',
   'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', -- Beneficiary
   '44444444-4444-4444-4444-444444444444', -- Full Name
   'John Smith'),
   
  ('b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2',
   'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', -- Beneficiary
   '55555555-5555-5555-5555-555555555555', -- Date of Birth
   '2005-06-15'),
   
  ('c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3',
   'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', -- Beneficiary
   '66666666-6666-6666-6666-666666666666', -- Gender
   'Male'),
   
  ('d4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d4',
   'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', -- Beneficiary
   '77777777-7777-7777-7777-777777777777', -- Swimming Ability
   'Intermediate'),
   
  ('e5e5e5e5-e5e5-e5e5-e5e5-e5e5e5e5e5e5',
   'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', -- Beneficiary
   '88888888-8888-8888-8888-888888888888', -- Allergies
   'Peanuts, shellfish'),
   
  -- Values for second beneficiary in Multi-Team Organization
  ('f6f6f6f6-f6f6-f6f6-f6f6-f6f6f6f6f6f6',
   'cccccccc-cccc-cccc-cccc-cccccccccccc', -- Beneficiary
   '44444444-4444-4444-4444-444444444444', -- Full Name
   'Emma Johnson'),
   
  ('a7a7a7a7-a7a7-a7a7-a7a7-a7a7a7a7a7a7',
   'cccccccc-cccc-cccc-cccc-cccccccccccc', -- Beneficiary
   '55555555-5555-5555-5555-555555555555', -- Date of Birth
   '2007-03-22'),
   
  ('b8b8b8b8-b8b8-b8b8-b8b8-b8b8b8b8b8b8',
   'cccccccc-cccc-cccc-cccc-cccccccccccc', -- Beneficiary
   '66666666-6666-6666-6666-666666666666', -- Gender
   'Female'),
   
  -- Values for beneficiary in No Teams Organization
  ('c9c9c9c9-c9c9-c9c9-c9c9-c9c9c9c9c9c9',
   'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', -- Beneficiary
   '99999999-9999-9999-9999-999999999999', -- Programming Experience
   'Beginner'),
   
  ('d0d0d0d0-d0d0-d0d0-d0d0-d0d0d0d0d0d0',
   'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', -- Beneficiary
   'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', -- Preferred Programming Language
   'Python'); 