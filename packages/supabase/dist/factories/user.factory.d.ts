/**
 * Creates a single user with authentication.
 *
 * @param {object} params - The parameters for creating a user
 * @param {string} [params.email] - Optional email (will be generated if not provided)
 * @param {string} [params.password] - Optional password (defaults to 'password123')
 * @returns {Promise<{ user: { id: string; email: string }, token: string }>} The created user and auth token
 */
export declare function createTestUser({ email, password, }: {
    email?: string;
    password?: string;
}): Promise<{
    user: import("@supabase/supabase-js").AuthUser;
    token: string;
}>;
/**
 * Creates multiple users with authentication.
 *
 * @param {object} params - The parameters for creating users
 * @param {number} params.count - Number of users to create
 * @returns {Promise<Array<{ user: { id: string; email: string }, token: string }>>} Array of created users and their auth tokens
 */
export declare function createTestUsers({ count }: {
    count: number;
}): Promise<{
    user: import("@supabase/supabase-js").AuthUser;
    token: string;
}[]>;
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
