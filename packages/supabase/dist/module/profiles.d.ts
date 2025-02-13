import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';
type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];
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
declare const getProfile: ({ supabase, userId, }: {
    supabase: SupabaseClient<Database>;
    userId: string;
}) => Promise<{
    avatar_url: string | null;
    company: string | null;
    created_at: string;
    email: string;
    full_name: string | null;
    id: string;
    updated_at: string;
}>;
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
declare const updateProfile: ({ supabase, userId, profile, }: {
    supabase: SupabaseClient<Database>;
    userId: string;
    profile: ProfileUpdate;
}) => Promise<{
    avatar_url: string | null;
    company: string | null;
    created_at: string;
    email: string;
    full_name: string | null;
    id: string;
    updated_at: string;
}>;
export { getProfile, updateProfile };
export type { Profile, ProfileUpdate };
//# sourceMappingURL=profiles.d.ts.map