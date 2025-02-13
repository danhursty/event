import { SupabaseClient } from "@supabase/supabase-js";
import { SupabaseOperationError, SupabaseErrorCode } from "../errors";
import { Role } from "../types/roles";
export interface RoleData {
    id: string;
    name: Role;
    description: string | null;
}
/**
 * Custom error class for role operations.
 */
export declare class RoleOperationError extends SupabaseOperationError {
    constructor(operation: string, context: string, toastMessage: string, errorCode: SupabaseErrorCode, cause?: unknown);
}
/**
 * Fetches all roles from the database.
 *
 * @param {object} params - Function parameters
 * @param {SupabaseClient} params.supabase - Supabase client instance
 * @returns {Promise<RoleData[]>} Array of roles
 * @throws {RoleOperationError} If the query fails
 *
 * @example
 * ```typescript
 * const roles = await getRoles({ supabase });
 * console.log('Roles:', roles);
 * ```
 */
export declare function getRoles({ supabase, }: {
    supabase: SupabaseClient;
}): Promise<RoleData[]>;
/**
 * Static query keys for server-side usage
 */
export declare const roleQueryKeys: {
    readonly all: readonly ["roles"];
    readonly lists: readonly ["roles", "list"];
};
