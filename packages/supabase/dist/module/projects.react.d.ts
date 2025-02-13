import { SupabaseClient } from '@supabase/supabase-js';
import { type UseQueryOptions } from '@tanstack/react-query';
import type { Database } from '../database.types';
import { Project, ProjectWithOrg, ProjectMember, UserProject } from './projects';
type SupabaseProps = {
    supabase: SupabaseClient<Database>;
};
type QueryEnabledProps = {
    enabled?: boolean;
};
/**
 * Custom error class for handling project-related errors with additional context
 */
export declare class ProjectError extends Error {
    constructor({ message, code, status, }: {
        message: string;
        code?: string;
        status?: number;
    });
    readonly code?: string;
    readonly status?: number;
    static fromError(err: unknown, code?: string, status?: number): ProjectError;
}
type BaseKey = ['projects'];
type ListKey = [...BaseKey, 'list', {
    filters: Record<string, unknown>;
}];
type DetailKey = [...BaseKey, 'detail', string];
type MembersKey = [...DetailKey, 'members'];
type OrgProjectsKey = [...BaseKey, 'list', {
    organizationId: string;
}];
type UserProjectsKey = [...BaseKey, 'user'];
export declare const projectKeys: {
    readonly all: () => BaseKey;
    readonly lists: () => readonly ["projects", "list"];
    readonly list: ({ filters }: {
        filters: Record<string, unknown>;
    }) => ListKey;
    readonly details: () => readonly ["projects", "detail"];
    readonly detail: ({ id }: {
        id: string;
    }) => DetailKey;
    readonly members: ({ projectId }: {
        projectId: string;
    }) => MembersKey;
    readonly organizationProjects: ({ organizationId, }: {
        organizationId: string;
    }) => OrgProjectsKey;
    readonly userProjects: () => UserProjectsKey;
};
type ProjectQueryParams = SupabaseProps & {
    projectId: string;
};
type OrgProjectsQueryParams = SupabaseProps & {
    organizationId: string;
};
export declare const projectQueries: {
    detail: ({ supabase, projectId, }: ProjectQueryParams) => UseQueryOptions<Project, ProjectError>;
    members: ({ supabase, projectId, }: ProjectQueryParams) => UseQueryOptions<ProjectMember[], ProjectError>;
    organizationProjects: ({ supabase, organizationId, }: OrgProjectsQueryParams) => UseQueryOptions<ProjectWithOrg[], ProjectError>;
    userProjects: ({ supabase, }: SupabaseProps) => UseQueryOptions<UserProject[], ProjectError>;
};
type GetProjectParams = ProjectQueryParams & QueryEnabledProps;
export declare const useGetProject: ({ supabase, projectId, enabled, }: GetProjectParams) => any;
export declare const useGetProjectMembers: ({ supabase, projectId, enabled, }: GetProjectParams) => any;
type GetOrgProjectsParams = OrgProjectsQueryParams & QueryEnabledProps;
export declare const useGetOrganizationProjects: ({ supabase, organizationId, enabled, }: GetOrgProjectsParams) => any;
export declare const useUpdateProject: ({ supabase }: SupabaseProps) => any;
export declare const useCreateProject: ({ supabase }: SupabaseProps) => any;
/**
 * React hook to add a member to a project with error handling
 *
 * @example
 * ```ts
 * const mutation = useAddProjectMember({ supabase })
 *
 * // Add a member
 * mutation.mutate({
 *   projectId: '123',
 *   userId: 'user_456',
 *   role: 'member'
 * })
 * ```
 */
export declare const useAddProjectMember: ({ supabase }: SupabaseProps) => any;
/**
 * React hook to fetch all projects a user has access to across organizations
 *
 * @example
 * ```ts
 * const { data, error } = useGetUserProjects({ supabase })
 *
 * // Map through projects
 * data.map(project => (
 *   <div key={project.id}>
 *     {project.name} - {project.organization_name}
 *   </div>
 * ))
 * ```
 */
export declare const useGetUserProjects: ({ supabase, enabled, }: SupabaseProps & QueryEnabledProps) => any;
export {};
//# sourceMappingURL=projects.react.d.ts.map