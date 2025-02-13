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
export {};
//# sourceMappingURL=project-query-keys.d.ts.map