import type { Database } from "../database.types";
type MembershipType = Database["public"]["Enums"]["membership_type"];
/**
 * Creates a member in both organization and team with the same role.
 *
 * @param {object} params - The parameters for creating a member
 * @param {string} params.organizationId - The organization ID
 * @param {string} params.teamId - The team ID
 * @param {string} params.userId - The user ID to add as a member
 * @param {boolean} [params.isAdmin] - Whether the user should be an admin (defaults to false)
 * @param {{ admin: { id: string }, member: { id: string } }} params.roles - Role IDs to use
 * @returns {Promise<{ organizationMember: { id: string }, teamMember: { id: string } }>} The created member IDs
 */
export declare function createTestMember({ organizationId, teamId, userId, isAdmin, membershipType, roles, }: {
    organizationId: string;
    teamId: string;
    userId: string;
    isAdmin?: boolean;
    membershipType?: MembershipType;
    roles: {
        admin: {
            id: string;
        };
        member: {
            id: string;
        };
    };
}): Promise<{
    organizationMember: {
        id: string;
    };
    teamMember: {
        id: string;
    };
}>;
/**
 * Creates multiple members in both organization and team with the same roles.
 *
 * @param {object} params - The parameters for creating members
 * @param {string} params.organizationId - The organization ID
 * @param {string} params.teamId - The team ID
 * @param {Array<{ userId: string; isAdmin?: boolean }>} params.members - Array of member details
 * @param {{ admin: { id: string }, member: { id: string } }} params.roles - Role IDs to use
 * @returns {Promise<Array<{ organizationMember: { id: string }, teamMember: { id: string } }>>} Array of created member IDs
 */
export declare function createTestMembers({ organizationId, teamId, members, roles, }: {
    organizationId: string;
    teamId: string;
    members: Array<{
        userId: string;
        isAdmin?: boolean;
    }>;
    roles: {
        admin: {
            id: string;
        };
        member: {
            id: string;
        };
    };
}): Promise<Array<{
    organizationMember: {
        id: string;
    };
    teamMember: {
        id: string;
    };
}>>;
export {};
