import type { Database } from "../database.types";
type OnboardingRoleType = Database["public"]["Enums"]["onboarding_role_type"];
/**
 * Creates a test organization with initial setup.
 *
 * @param {object} params - The parameters for creating an organization
 * @param {string} params.userId - The ID of the user who will be the admin
 * @param {OnboardingRoleType} [params.onboardingRole] - Optional onboarding role (defaults to 'small_business_owner')
 * @param {boolean} [params.asAdmin] - Optional flag to determine if the user is an admin (defaults to true)
 * @returns {Promise<{ organization: { id: string }, team: { id: string }, roles: { admin: { id: string }, member: { id: string } }}>} The created organization, team, and role IDs
 */
export declare function createTestOrganization({ userId, name, onboardingRole, asAdmin, }: {
    userId: string;
    name?: string;
    onboardingRole?: OnboardingRoleType;
    asAdmin?: boolean;
}): Promise<{
    organization: {
        id: string;
    };
    team: {
        id: string;
    };
    roles: {
        admin: {
            id: string;
        };
        member: {
            id: string;
        };
    };
}>;
export {};
//# sourceMappingURL=organization.factory.d.ts.map