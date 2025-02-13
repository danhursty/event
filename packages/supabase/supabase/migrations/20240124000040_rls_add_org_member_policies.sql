-- Drop existing policies
DROP POLICY IF EXISTS "organization_members_view" ON public.organization_members;
DROP POLICY IF EXISTS "organization_members_insert" ON public.organization_members;
DROP POLICY IF EXISTS "organization_members_update" ON public.organization_members;
DROP POLICY IF EXISTS "organization_members_delete" ON public.organization_members;

-- Create new organization member policies using helper functions
CREATE POLICY "organization_members_view" ON public.organization_members
    FOR SELECT TO authenticated
    USING (
      is_org_member(organization_id)  -- user must be in the org to see its members
    );

CREATE POLICY "organization_members_insert" ON public.organization_members
    FOR INSERT TO authenticated
    WITH CHECK (
      -- Allow insert if:
      -- 1. User has manage_organization_members permission, OR
      -- 2. This is the first member of the organization (initial setup)
      has_org_permission(organization_id, 'manage_organization_members'::permission_action)
      OR NOT EXISTS (
        SELECT 1 FROM organization_members om
        WHERE om.organization_id = organization_id
      )
    );

CREATE POLICY "organization_members_update" ON public.organization_members
    FOR UPDATE TO authenticated
    USING (
      has_org_permission(organization_id, 'manage_organization_members'::permission_action)
    )
    WITH CHECK (
      has_org_permission(organization_id, 'manage_organization_members'::permission_action)
    );

CREATE POLICY "organization_members_delete" ON public.organization_members
    FOR DELETE TO authenticated
    USING (
      has_org_permission(organization_id, 'manage_organization_members'::permission_action)
    ); 