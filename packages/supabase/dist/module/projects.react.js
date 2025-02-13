import { useMutation, useQuery, useQueryClient, } from '@tanstack/react-query';
import { getProject, updateProject, getProjectMembers, getOrganizationProjects, createProject, addProjectMember, getUserProjects, } from './projects';
/**
 * Custom error class for handling project-related errors with additional context
 */
export class ProjectError extends Error {
    constructor({ message, code, status, }) {
        super(message);
        this.name = 'ProjectError';
        this.code = code;
        this.status = status;
    }
    static fromError(err, code = 'UNKNOWN_ERROR', status = 500) {
        if (err instanceof Error) {
            return new ProjectError({
                message: err.message,
                code: err instanceof ProjectError ? err.code : code,
                status: err instanceof ProjectError ? err.status : status,
            });
        }
        return new ProjectError({
            message: 'An unknown error occurred',
            code,
            status,
        });
    }
}
export const projectKeys = {
    all: () => ['projects'],
    lists: () => [...projectKeys.all(), 'list'],
    list: ({ filters }) => [
        ...projectKeys.lists(),
        { filters },
    ],
    details: () => [...projectKeys.all(), 'detail'],
    detail: ({ id }) => [...projectKeys.details(), id],
    members: ({ projectId }) => [
        ...projectKeys.detail({ id: projectId }),
        'members',
    ],
    organizationProjects: ({ organizationId, }) => [...projectKeys.lists(), { organizationId }],
    userProjects: () => [...projectKeys.all(), 'user'],
};
export const projectQueries = {
    detail: ({ supabase, projectId, }) => ({
        queryKey: projectKeys.detail({ id: projectId }),
        queryFn: async () => {
            try {
                const data = await getProject({ supabase, projectId });
                if (!data) {
                    throw new ProjectError({
                        message: 'Project not found',
                        code: 'NOT_FOUND',
                        status: 404,
                    });
                }
                return data;
            }
            catch (err) {
                throw ProjectError.fromError(err, 'FETCH_ERROR');
            }
        },
    }),
    members: ({ supabase, projectId, }) => ({
        queryKey: projectKeys.members({ projectId }),
        queryFn: async () => {
            try {
                const data = await getProjectMembers({ supabase, projectId });
                return data;
            }
            catch (err) {
                throw ProjectError.fromError(err, 'FETCH_ERROR');
            }
        },
    }),
    organizationProjects: ({ supabase, organizationId, }) => ({
        queryKey: projectKeys.organizationProjects({ organizationId }),
        queryFn: async () => {
            try {
                const data = await getOrganizationProjects({
                    supabase,
                    organizationId,
                });
                if (!data) {
                    return [];
                }
                return data
                    .filter((project) => project.organization_id !== null)
                    .map((project) => ({
                    ...project,
                    organization: {
                        id: project.organization_id,
                        name: project.name,
                    },
                }));
            }
            catch (err) {
                throw ProjectError.fromError(err, 'FETCH_ERROR');
            }
        },
    }),
    userProjects: ({ supabase, }) => ({
        queryKey: projectKeys.userProjects(),
        queryFn: async () => {
            try {
                const data = await getUserProjects({ supabase });
                return data;
            }
            catch (err) {
                throw ProjectError.fromError(err, 'FETCH_ERROR');
            }
        },
    }),
};
export const useGetProject = ({ supabase, projectId, enabled = true, }) => {
    const response = useQuery({
        ...projectQueries.detail({ supabase, projectId }),
        enabled: Boolean(projectId) && enabled,
    });
    return response;
};
export const useGetProjectMembers = ({ supabase, projectId, enabled = true, }) => {
    return useQuery({
        ...projectQueries.members({ supabase, projectId }),
        enabled: Boolean(projectId) && enabled,
    });
};
export const useGetOrganizationProjects = ({ supabase, organizationId, enabled = true, }) => {
    return useQuery({
        ...projectQueries.organizationProjects({ supabase, organizationId }),
        enabled: Boolean(organizationId) && enabled,
    });
};
export const useUpdateProject = ({ supabase }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ projectId, updates }) => {
            try {
                const data = await updateProject({ supabase, projectId, updates });
                if (!data) {
                    throw new ProjectError({
                        message: 'Failed to update project',
                        code: 'UPDATE_FAILED',
                    });
                }
                return data;
            }
            catch (err) {
                throw ProjectError.fromError(err, 'UPDATE_ERROR');
            }
        },
        onMutate: async ({ projectId, updates }) => {
            await queryClient.cancelQueries({
                queryKey: projectKeys.detail({ id: projectId }),
            });
            const previousData = queryClient.getQueryData(projectKeys.detail({ id: projectId }));
            if (previousData) {
                const updatedData = {
                    ...previousData,
                    ...updates,
                    organization_id: previousData.organization_id,
                    organization: previousData.organization,
                };
                queryClient.setQueryData(projectKeys.detail({ id: projectId }), updatedData);
            }
            return { previousData };
        },
        onError: (err, { projectId }, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(projectKeys.detail({ id: projectId }), context.previousData);
            }
        },
        onSuccess: (data, { projectId }) => {
            void queryClient.invalidateQueries({
                queryKey: projectKeys.detail({ id: projectId }),
            });
            void queryClient.invalidateQueries({
                queryKey: projectKeys.lists(),
            });
        },
    });
};
export const useCreateProject = ({ supabase }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ name, organizationId, settings }) => {
            try {
                const data = await createProject({
                    supabase,
                    name,
                    organizationId,
                    settings: settings,
                });
                if (!data) {
                    throw new ProjectError({
                        message: 'Failed to create project',
                        code: 'CREATE_FAILED',
                    });
                }
                return data;
            }
            catch (err) {
                throw ProjectError.fromError(err, 'CREATE_ERROR');
            }
        },
        onSuccess: (data, { organizationId }) => {
            void queryClient.invalidateQueries({
                queryKey: projectKeys.organizationProjects({ organizationId }),
            });
            void queryClient.invalidateQueries({
                queryKey: projectKeys.lists(),
            });
        },
    });
};
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
export const useAddProjectMember = ({ supabase }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ projectId, userId, role }) => {
            try {
                const data = await addProjectMember({
                    supabase,
                    projectId,
                    userId,
                    role,
                });
                if (!data) {
                    throw new ProjectError({
                        message: 'Failed to add project member',
                        code: 'ADD_MEMBER_FAILED',
                    });
                }
                return data;
            }
            catch (err) {
                throw ProjectError.fromError(err, 'ADD_MEMBER_ERROR');
            }
        },
        onSuccess: (_, { projectId }) => {
            void queryClient.invalidateQueries({
                queryKey: projectKeys.members({ projectId }),
            });
        },
    });
};
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
export const useGetUserProjects = ({ supabase, enabled = true, }) => {
    return useQuery({
        ...projectQueries.userProjects({ supabase }),
        enabled,
    });
};
