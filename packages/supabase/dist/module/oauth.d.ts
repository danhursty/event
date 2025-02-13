import { PostgrestError, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';
type OAuthState = Database['public']['Tables']['oauth_states']['Row'];
type OAuthToken = Database['public']['Tables']['user_oauth_tokens']['Row'];
interface TokenData {
    accessToken: string;
    refreshToken: string;
    expiresAt: Date;
    scopes: string[];
}
/**
 * Stores OAuth tokens for a user and provider.
 * Used after initial auth to enable server-side operations.
 */
declare const storeOauthToken: ({ supabase, userId, email, provider, tokens, }: {
    supabase: SupabaseClient<Database>;
    userId: string;
    email: string;
    provider: string;
    tokens: TokenData;
}) => Promise<{
    data: OAuthToken | null;
    error: PostgrestError | null;
}>;
/**
 * Retrieves OAuth tokens for server-side operations.
 */
declare const getOauthToken: ({ supabase, userId, provider, email, }: {
    supabase: SupabaseClient<Database>;
    userId: string;
    provider: string;
    email: string;
}) => Promise<{
    data: OAuthToken | null;
    error: PostgrestError | null;
}>;
/**
 * Updates tokens after a refresh operation.
 */
declare const updateOauthToken: ({ supabase, tokenId, tokens, }: {
    supabase: SupabaseClient<Database>;
    tokenId: string;
    tokens: Partial<TokenData>;
}) => Promise<OAuthToken>;
/**
 * Deletes OAuth tokens and cascades the deletion to related records.
 * Note: Requires ON DELETE CASCADE to be set up in the database schema
 * for proper cascading deletion of related records.
 */
declare const deleteOauthToken: ({ supabase, userId, provider, email, }: {
    supabase: SupabaseClient<Database>;
    userId: string;
    provider: string;
    email: string;
}) => Promise<void>;
/**
 * Creates a new OAuth state for secure authentication flow.
 *
 * @example
 * ```typescript
 * const oauthState = await createOAuthState({
 *   supabase,
 *   userId: 'user_123',
 *   redirectTo: '/dashboard',
 *   expiresIn: 3600 // 1 hour
 * });
 * console.log(oauthState.state); // Random UUID for verification
 * ```
 */
declare const createOAuthState: ({ supabase, userId, redirectTo, expiresIn, }: {
    supabase: SupabaseClient<Database>;
    userId: string;
    redirectTo?: string;
    expiresIn?: number;
}) => Promise<OAuthState>;
/**
 * Verifies an OAuth state token and ensures it hasn't expired.
 *
 * @example
 * ```typescript
 * try {
 *   const verifiedState = await verifyOAuthState({
 *     supabase,
 *     state: 'state_token_from_oauth_callback'
 *   });
 *   console.log(verifiedState.redirect_to); // Original redirect URL
 * } catch (error) {
 *   console.error('Invalid or expired state');
 * }
 * ```
 *
 * @throws {Error} If state is invalid or expired
 */
declare const verifyOAuthState: ({ supabase, state, }: {
    supabase: SupabaseClient<Database>;
    state: string;
}) => Promise<OAuthState>;
/**
 * Removes expired OAuth states from the database.
 *
 * @example
 * ```typescript
 * // Run periodically to clean up expired states
 * await cleanupExpiredStates({ supabase });
 * ```
 */
declare const cleanupExpiredStates: ({ supabase, }: {
    supabase: SupabaseClient<Database>;
}) => Promise<void>;
/**
 * Deletes a specific OAuth state after successful verification.
 *
 * @example
 * ```typescript
 * // After successful OAuth callback and verification
 * await deleteOAuthState({
 *   supabase,
 *   state: 'verified_state_token'
 * });
 * ```
 */
declare const deleteOAuthState: ({ supabase, state, }: {
    supabase: SupabaseClient<Database>;
    state: string;
}) => Promise<void>;
export { createOAuthState, verifyOAuthState, cleanupExpiredStates, deleteOAuthState, storeOauthToken, getOauthToken, updateOauthToken, deleteOauthToken, };
export type { OAuthState, OAuthToken, TokenData };
//# sourceMappingURL=oauth.d.ts.map