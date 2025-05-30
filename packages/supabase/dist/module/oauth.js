/**
 * Stores OAuth tokens for a user and provider.
 * Used after initial auth to enable server-side operations.
 */
const storeOauthToken = async ({ supabase, userId, email, provider, tokens, }) => {
    const { data, error } = await supabase
        .from('user_oauth_tokens')
        .upsert({
        user_id: userId,
        email,
        provider,
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
        token_expires_at: tokens.expiresAt.toISOString(),
        scopes: tokens.scopes,
    }, {
        onConflict: 'user_id,provider,email',
    })
        .select()
        .single();
    if (error)
        throw error;
    return { data, error };
};
/**
 * Retrieves OAuth tokens for server-side operations.
 */
const getOauthToken = async ({ supabase, userId, provider, email, }) => {
    const { data, error } = await supabase
        .from('user_oauth_tokens')
        .select()
        .eq('user_id', userId)
        .eq('provider', provider)
        .eq('email', email)
        .select();
    if (error)
        throw error;
    console.log('🚨 data', data);
    console.log('🚨 error', error);
    return { data: data[0] || null, error };
};
/**
 * Updates tokens after a refresh operation.
 */
const updateOauthToken = async ({ supabase, tokenId, tokens, }) => {
    const updates = {};
    if (tokens.accessToken) {
        updates.access_token = tokens.accessToken;
    }
    if (tokens.refreshToken) {
        updates.refresh_token = tokens.refreshToken;
    }
    if (tokens.expiresAt) {
        updates.token_expires_at = tokens.expiresAt.toISOString();
    }
    if (tokens.scopes) {
        updates.scopes = tokens.scopes;
    }
    const { data, error } = await supabase
        .from('user_oauth_tokens')
        .update(updates)
        .eq('id', tokenId)
        .select()
        .single();
    if (error)
        throw error;
    return data;
};
/**
 * Deletes OAuth tokens and cascades the deletion to related records.
 * Note: Requires ON DELETE CASCADE to be set up in the database schema
 * for proper cascading deletion of related records.
 */
const deleteOauthToken = async ({ supabase, userId, provider, email, }) => {
    try {
        const { error } = await supabase
            .from('user_oauth_tokens')
            .delete()
            .eq('user_id', userId)
            .eq('provider', provider)
            .eq('email', email);
        if (error) {
            throw new Error(`Failed to delete OAuth token: ${error.message}`);
        }
    }
    catch (err) {
        const errorMessage = err instanceof Error
            ? err.message
            : 'Unknown error occurred while deleting OAuth token';
        console.error('Error deleting OAuth token:', errorMessage);
        throw new Error(errorMessage);
    }
};
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
const createOAuthState = async ({ supabase, userId, redirectTo, expiresIn = 3600, // 1 hour
 }) => {
    const state = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();
    const { data, error } = await supabase
        .from('oauth_states')
        .insert({
        user_id: userId,
        state,
        redirect_to: redirectTo,
        expires_at: expiresAt,
    })
        .select()
        .single();
    if (error)
        throw error;
    return data;
};
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
const verifyOAuthState = async ({ supabase, state, }) => {
    const { data, error } = await supabase
        .from('oauth_states')
        .select()
        .eq('state', state)
        .gt('expires_at', new Date().toISOString())
        .single();
    if (error)
        throw error;
    return data;
};
/**
 * Removes expired OAuth states from the database.
 *
 * @example
 * ```typescript
 * // Run periodically to clean up expired states
 * await cleanupExpiredStates({ supabase });
 * ```
 */
const cleanupExpiredStates = async ({ supabase, }) => {
    const { error } = await supabase
        .from('oauth_states')
        .delete()
        .lt('expires_at', new Date().toISOString());
    if (error)
        throw error;
};
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
const deleteOAuthState = async ({ supabase, state, }) => {
    const { error } = await supabase
        .from('oauth_states')
        .delete()
        .eq('state', state);
    if (error)
        throw error;
};
export { createOAuthState, verifyOAuthState, cleanupExpiredStates, deleteOAuthState, storeOauthToken, getOauthToken, updateOauthToken, deleteOauthToken, };
