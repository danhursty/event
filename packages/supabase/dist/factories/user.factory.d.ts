import { User } from "@supabase/supabase-js";
/**
 * Creates a single user with authentication.
 *
 * @param {object} [params] - The parameters for creating a user (optional)
 * @param {string} [params.email] - Optional email (will be generated if not provided)
 * @param {string} [params.password] - Optional password (defaults to 'password123')
 * @returns {Promise<{ user: User, token: string }>} The created user and auth token
 */
export declare function createTestUser(params?: {
    email?: string;
    password?: string;
}): Promise<{
    user: User;
    token: string;
}>;
/**
 * Creates multiple users with authentication.
 *
 * @param {object} [params] - The parameters for creating users (optional)
 * @param {number} [params.count=1] - Number of users to create (defaults to 1)
 * @returns {Promise<Array<{ user: User, token: string }>>} Array of created users and their auth tokens
 */
export declare function createTestUsers(params?: {
    count?: number;
}): Promise<Array<{
    user: User;
    token: string;
}>>;
/**
 * Logs in a user.
 *
 * @param {object} params - The parameters for logging in
 * @param {string} params.email - User's email
 * @param {string} [params.password] - User's password (defaults to 'password123')
 * @returns {Promise<string>} The auth token
 */
export declare function loginTestUser({ email, password, }: {
    email: string;
    password?: string;
}): Promise<string>;
/**
 * Logs in multiple users.
 *
 * @param {object} params - The parameters for logging in users
 * @param {Array<{ email: string; password?: string }>} params.users - Array of user credentials
 * @returns {Promise<string[]>} Array of auth tokens
 */
export declare function loginTestUsers({ users, }: {
    users: Array<{
        email: string;
        password?: string;
    }>;
}): Promise<string[]>;
//# sourceMappingURL=user.factory.d.ts.map