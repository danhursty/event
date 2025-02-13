import { faker } from "@faker-js/faker";
import { createAdminClient } from "./utils";

/**
 * Creates a single user with authentication.
 *
 * @param {object} params - The parameters for creating a user
 * @param {string} [params.email] - Optional email (will be generated if not provided)
 * @param {string} [params.password] - Optional password (defaults to 'password123')
 * @returns {Promise<{ user: { id: string; email: string }, token: string }>} The created user and auth token
 */
export async function createTestUser({
  email = faker.internet.email(),
  password = "password123",
}: {
  email?: string;
  password?: string;
}) {
  const adminClient = createAdminClient();
  const { data: authData, error: authError } = await adminClient.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;
  if (!authData.user) throw new Error("No user data returned after signup");

  return {
    user: authData.user,
    token: authData.session!.access_token,
  };
}

/**
 * Creates multiple users with authentication.
 *
 * @param {object} params - The parameters for creating users
 * @param {number} params.count - Number of users to create
 * @returns {Promise<Array<{ user: { id: string; email: string }, token: string }>>} Array of created users and their auth tokens
 */
export async function createTestUsers({ count }: { count: number }) {
  return Promise.all(Array.from({ length: count }, () => createTestUser({})));
}

/**
 * Logs in a user.
 *
 * @param {object} params - The parameters for logging in
 * @param {string} params.email - User's email
 * @param {string} [params.password] - User's password (defaults to 'password123')
 * @returns {Promise<string>} The auth token
 */
export async function loginTestUser({
  email,
  password = "password123",
}: {
  email: string;
  password?: string;
}) {
  const adminClient = createAdminClient();
  const { data, error } = await adminClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  if (!data.session) throw new Error("No session returned after login");

  return data.session.access_token;
}

/**
 * Logs in multiple users.
 *
 * @param {object} params - The parameters for logging in users
 * @param {Array<{ email: string; password?: string }>} params.users - Array of user credentials
 * @returns {Promise<string[]>} Array of auth tokens
 */
export async function loginTestUsers({
  users,
}: {
  users: Array<{ email: string; password?: string }>;
}) {
  return Promise.all(
    users.map((user) =>
      loginTestUser({
        email: user.email,
        password: user.password,
      })
    )
  );
}
