import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';
import type { Json, ResourceType, Role } from '../types';
type Project = Database['public']['Tables']['projects']['Row'];
type ProjectUpdate = Database['public']['Tables']['projects']['Update'];
type Organization = Database['public']['Tables']['organizations']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];
type ProjectWithOrg = Omit<Project, 'organization_id'> & {
    organization_id: string;
    organization: Pick<Organization, 'id' | 'name'>;
};
type UserProject = {
    id: string;
    organization_id: string;
    organization_name: string;
    name: string;
    role: string;
    settings: Json;
    client_name: string | null;
    client_email: string | null;
    is_client_portal: boolean;
    created_at: string;
};
type ProjectMember = {
    id: string;
    user_id: string;
    resource_type: ResourceType;
    resource_id: string;
    role: Role;
    created_at: string;
    updated_at: string;
    profiles: Pick<Profile, 'id' | 'email' | 'full_name' | 'avatar_url'>;
};
/**
 * Creates a new project within an organization.
 *
 * @example
 * ```typescript
 * // Create a regular project
 * const project = await createProject({
 *   supabase,
 *   organizationId: 'org_123',
 *   name: 'Website Redesign',
 *   settings: {
 *     defaultBranch: 'main',
 *     deploymentTarget: 'production'
 *   }
 * });
 *
 * // Create a client portal project
 * const clientProject = await createProject({
 *   supabase,
 *   organizationId: 'org_123',
 *   name: 'Client Website',
 *   clientName: 'Acme Corp',
 *   clientEmail: 'client@acme.com',
 *   isClientPortal: true
 * });
 * ```
 */
declare const createProject: ({ supabase, organizationId, name, settings, clientName, clientEmail, isClientPortal, }: {
    supabase: SupabaseClient<Database>;
    organizationId: string;
    name: string;
    settings?: Json;
    clientName?: string;
    clientEmail?: string;
    isClientPortal?: boolean;
}) => Promise<{
    client_email: string | null;
    client_name: string | null;
    created_at: string;
    id: string;
    is_client_portal: boolean | null;
    name: string;
    organization_id: string | null;
    settings: import("../database.types").Json | null;
    updated_at: string;
}>;
/**
 * Retrieves a project by ID, including its organization details.
 *
 * @example
 * ```typescript
 * const project = await getProject({
 *   supabase,
 *   projectId: 'project_123'
 * });
 * console.log(project.name); // 'Website Redesign'
 * console.log(project.organization.name); // 'Acme Corp'
 * ```
 */
declare const getProject: ({ supabase, projectId, }: {
    supabase: SupabaseClient<Database>;
    projectId: string;
}) => Promise<ProjectWithOrg>;
/**
 * Updates a project's properties.
 *
 * @example
 * ```typescript
 * const updated = await updateProject({
 *   supabase,
 *   projectId: 'project_123',
 *   updates: {
 *     name: 'Website Redesign 2.0',
 *     settings: {
 *       deploymentTarget: 'staging',
 *       notifyOnDeploy: true
 *     }
 *   }
 * });
 * ```
 */
declare const updateProject: ({ supabase, projectId, updates, }: {
    supabase: SupabaseClient<Database>;
    projectId: string;
    updates: ProjectUpdate;
}) => Promise<{
    client_email: string | null;
    client_name: string | null;
    created_at: string;
    id: string;
    is_client_portal: boolean | null;
    name: string;
    organization_id: string | null;
    settings: import("../database.types").Json | null;
    updated_at: string;
}>;
/**
 * Retrieves all members of a project with their profiles.
 *
 * @example
 * ```typescript
 * const members = await getProjectMembers({
 *   supabase,
 *   projectId: 'project_123'
 * });
 * console.log(members); // [{ user_id: 'user_1', role: 'admin', profiles: {...} }, ...]
 * ```
 */
declare const getProjectMembers: ({ supabase, projectId, }: {
    supabase: SupabaseClient<Database>;
    projectId: string;
}) => Promise<ProjectMember[]>;
/**
 * Adds a new member to a project.
 *
 * @example
 * ```typescript
 * // Add a regular member
 * const membership = await addProjectMember({
 *   supabase,
 *   projectId: 'project_123',
 *   userId: 'user_456'
 * });
 *
 * // Add a project admin
 * const adminMembership = await addProjectMember({
 *   supabase,
 *   projectId: 'project_123',
 *   userId: 'user_789',
 *   role: 'admin'
 * });
 * ```
 */
declare const addProjectMember: ({ supabase, projectId, userId, role, }: {
    supabase: SupabaseClient<Database>;
    projectId: string;
    userId: string;
    role?: Role;
}) => Promise<{
    created_at: string;
    id: string;
    resource_id: string;
    resource_type: string;
    role: string;
    updated_at: string;
    user_id: string | null;
}>;
/**
 * Retrieves all projects belonging to an organization.
 *
 * @example
 * ```typescript
 * const projects = await getOrganizationProjects({
 *   supabase,
 *   organizationId: 'org_123'
 * });
 * console.log(projects); // [{ id: 'project_1', name: 'Website', ... }, ...]
 * ```
 */
declare const getOrganizationProjects: ({ supabase, organizationId, }: {
    supabase: SupabaseClient<Database>;
    organizationId: string;
}) => Promise<{
    client_email: string | null;
    client_name: string | null;
    created_at: string;
    id: string;
    is_client_portal: boolean | null;
    name: string;
    organization_id: string | null;
    settings: import("../database.types").Json | null;
    updated_at: string;
}[]>;
/**
 * Gets all projects a user has access to across all organizations.
 *
 * @example
 * ```typescript
 * const projects = await getUserProjects({
 *   supabase
 * });
 * console.log(projects); // [{ id: 'proj_1', name: 'Website', organization_name: 'Acme Corp', ... }]
 * ```
 */
declare const getUserProjects: ({ supabase, }: {
    supabase: SupabaseClient<Database>;
}) => Promise<{
    id: string;
    organization_id: string;
    organization_name: string;
    name: string;
    role: string;
    settings: import("../database.types").Json;
    client_name: string;
    client_email: string;
    is_client_portal: boolean;
    created_at: string;
}[]>;
export { createProject, getProject, updateProject, getProjectMembers, addProjectMember, getOrganizationProjects, getUserProjects, };
export type { Project, ProjectUpdate, ProjectWithOrg, ProjectMember, UserProject, };
//# sourceMappingURL=projects.d.ts.map