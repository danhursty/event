import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';
export type SupabaseProps = {
    supabase: SupabaseClient<Database>;
};
export type QueryEnabledProps = {
    enabled?: boolean;
};
//# sourceMappingURL=react-query.d.ts.map