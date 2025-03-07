import { SupabaseOperationError, SupabaseErrorCode } from "../errors";
import { SupabaseClient } from "../index";
import { Database } from "../database.types";
export type User = Database["public"]["Tables"]["users"]["Row"];
export type UserInsert = Database["public"]["Tables"]["users"]["Insert"];
export type UserUpdate = Database["public"]["Tables"]["users"]["Update"];
export type UserList = User[];
export declare class UserOperationError extends SupabaseOperationError {
    constructor(operation: string, context: string, toastMessage: string, errorCode: SupabaseErrorCode, cause?: unknown);
}
/**
 * Creates a new user in the database
 * @param {Object} params - The parameters for creating a user
 * @param {SupabaseClient} params.supabase - The Supabase client instance
 * @param {UserInsert} params.user - The user data to insert
 * @returns {Promise<User>} The created user
 * @throws {UserOperationError} If the user creation fails
 *
 * @example
 * ```typescript
 * const newUser = await createUser({
 *   supabase,
 *   user: {
 *     email: 'user@example.com',
 *     name: 'John Doe'
 *   }
 * });
 * ```
 */
export declare function createUser({ supabase, user, }: {
    supabase: SupabaseClient;
    user: UserInsert;
}): Promise<User>;
/**
 * Retrieves a single user by ID
 * @param {Object} params - The parameters for retrieving a user
 * @param {SupabaseClient} params.supabase - The Supabase client instance
 * @param {string} params.userId - The ID of the user to retrieve
 * @returns {Promise<User | null>} The user if found, null otherwise
 * @throws {UserOperationError} If the query fails
 *
 * @example
 * ```typescript
 * const user = await getUser({
 *   supabase,
 *   userId: '123e4567-e89b-12d3-a456-426614174000'
 * });
 * if (user) {
 *   console.log('User found:', user.name);
 * }
 * ```
 */
export declare function getUser({ supabase, userId, }: {
    supabase: SupabaseClient;
    userId: string;
}): Promise<User | null>;
/**
 * Retrieves all users from the database
 * @param {Object} params - The parameters for retrieving users
 * @param {SupabaseClient} params.supabase - The Supabase client instance
 * @returns {Promise<UserList>} Array of users
 * @throws {UserOperationError} If the query fails
 *
 * @example
 * ```typescript
 * const users = await getUsers({ supabase });
 * users.forEach(user => {
 *   console.log('User:', user.name);
 * });
 * ```
 */
export declare function getUsers({ supabase, }: {
    supabase: SupabaseClient;
}): Promise<UserList>;
/**
 * Updates a user by ID
 * @param {Object} params - The parameters for updating a user
 * @param {SupabaseClient} params.supabase - The Supabase client instance
 * @param {string} params.userId - The ID of the user to update
 * @param {UserUpdate} params.user - The user data to update
 * @returns {Promise<User>} The updated user
 * @throws {UserOperationError} If the update fails
 *
 * @example
 * ```typescript
 * const updatedUser = await updateUser({
 *   supabase,
 *   userId: '123e4567-e89b-12d3-a456-426614174000',
 *   user: {
 *     name: 'Updated Name'
 *   }
 * });
 * ```
 */
export declare function updateUser({ supabase, userId, user, }: {
    supabase: SupabaseClient;
    userId: string;
    user: UserUpdate;
}): Promise<User>;
/**
 * Deletes a user by ID
 * @param {Object} params - The parameters for deleting a user
 * @param {SupabaseClient} params.supabase - The Supabase client instance
 * @param {string} params.userId - The ID of the user to delete
 * @returns {Promise<void>}
 * @throws {UserOperationError} If the deletion fails
 *
 * @example
 * ```typescript
 * await deleteUser({
 *   supabase,
 *   userId: '123e4567-e89b-12d3-a456-426614174000'
 * });
 * ```
 */
export declare function deleteUser({ supabase, userId, }: {
    supabase: SupabaseClient;
    userId: string;
}): Promise<void>;
//# sourceMappingURL=users.d.ts.map