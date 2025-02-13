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
