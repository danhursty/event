/**
 * Retrieves a user's profile by their ID.
 *
 * @example
 * ```typescript
 * const profile = await getProfile({
 *   supabase,
 *   userId: 'user_123'
 * });
 * console.log(profile); // { id: 'user_123', email: 'user@example.com', ... }
 * ```
 */
const getProfile = async ({ supabase, userId, }) => {
    const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', userId)
        .single();
    if (error)
        throw error;
    return data;
};
/**
 * Updates a user's profile information.
 *
 * @example
 * ```typescript
 * // Update basic info
 * const updated = await updateProfile({
 *   supabase,
 *   userId: 'user_123',
 *   profile: {
 *     full_name: 'John Doe',
 *     avatar_url: 'https://example.com/avatar.jpg'
 *   }
 * });
 *
 * // Update contact preferences
 * const withPrefs = await updateProfile({
 *   supabase,
 *   userId: 'user_123',
 *   profile: {
 *     email_notifications: true,
 *     timezone: 'America/New_York'
 *   }
 * });
 * ```
 */
const updateProfile = async ({ supabase, userId, profile, }) => {
    const { data, error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', userId)
        .select()
        .single();
    if (error)
        throw error;
    return data;
};
export { getProfile, updateProfile };
