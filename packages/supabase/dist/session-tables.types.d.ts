import { Json } from './database.types';
export interface EventTable {
    Row: {
        id: string;
        organization_id: string;
        name: string;
        description: string | null;
        start_date: string | null;
        end_date: string | null;
        recurring: boolean;
        recurrence_pattern: Json | null;
        created_at: string;
        updated_at: string;
    };
    Insert: {
        id?: string;
        organization_id: string;
        name: string;
        description?: string | null;
        start_date?: string | null;
        end_date?: string | null;
        recurring?: boolean;
        recurrence_pattern?: Json | null;
        created_at?: string;
        updated_at?: string;
    };
    Update: {
        id?: string;
        organization_id?: string;
        name?: string;
        description?: string | null;
        start_date?: string | null;
        end_date?: string | null;
        recurring?: boolean;
        recurrence_pattern?: Json | null;
        created_at?: string;
        updated_at?: string;
    };
    Relationships: [
        {
            foreignKeyName: "events_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
        }
    ];
}
export interface CustomFieldTable {
    Row: {
        id: string;
        organization_id: string;
        event_id: string | null;
        label: string;
        field_type: string;
        is_required: boolean;
        options: Json | null;
        sort_order: number;
        created_at: string;
        updated_at: string;
    };
    Insert: {
        id?: string;
        organization_id: string;
        event_id?: string | null;
        label: string;
        field_type: string;
        is_required?: boolean;
        options?: Json | null;
        sort_order?: number;
        created_at?: string;
        updated_at?: string;
    };
    Update: {
        id?: string;
        organization_id?: string;
        event_id?: string | null;
        label?: string;
        field_type?: string;
        is_required?: boolean;
        options?: Json | null;
        sort_order?: number;
        created_at?: string;
        updated_at?: string;
    };
    Relationships: [
        {
            foreignKeyName: "custom_fields_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
        },
        {
            foreignKeyName: "custom_fields_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
        }
    ];
}
export interface BeneficiaryTable {
    Row: {
        id: string;
        organization_id: string;
        submitted_by: string | null;
        created_at: string;
        updated_at: string;
    };
    Insert: {
        id?: string;
        organization_id: string;
        submitted_by?: string | null;
        created_at?: string;
        updated_at?: string;
    };
    Update: {
        id?: string;
        organization_id?: string;
        submitted_by?: string | null;
        created_at?: string;
        updated_at?: string;
    };
    Relationships: [
        {
            foreignKeyName: "beneficiaries_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
        },
        {
            foreignKeyName: "beneficiaries_submitted_by_fkey";
            columns: ["submitted_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
        }
    ];
}
export interface BeneficiaryFieldValueTable {
    Row: {
        id: string;
        beneficiary_id: string;
        custom_field_id: string;
        value: string | null;
        created_at: string;
        updated_at: string;
    };
    Insert: {
        id?: string;
        beneficiary_id: string;
        custom_field_id: string;
        value?: string | null;
        created_at?: string;
        updated_at?: string;
    };
    Update: {
        id?: string;
        beneficiary_id?: string;
        custom_field_id?: string;
        value?: string | null;
        created_at?: string;
        updated_at?: string;
    };
    Relationships: [
        {
            foreignKeyName: "beneficiary_field_values_beneficiary_id_fkey";
            columns: ["beneficiary_id"];
            isOneToOne: false;
            referencedRelation: "beneficiaries";
            referencedColumns: ["id"];
        },
        {
            foreignKeyName: "beneficiary_field_values_custom_field_id_fkey";
            columns: ["custom_field_id"];
            isOneToOne: false;
            referencedRelation: "custom_fields";
            referencedColumns: ["id"];
        }
    ];
}
export interface EventSessionTable {
    Row: {
        id: string;
        event_id: string;
        session_date: string;
        start_time: string | null;
        end_time: string | null;
        location: string | null;
        notes: string | null;
        created_by: string | null;
        created_at: string;
        updated_at: string;
    };
    Insert: {
        id?: string;
        event_id: string;
        session_date: string;
        start_time?: string | null;
        end_time?: string | null;
        location?: string | null;
        notes?: string | null;
        created_by?: string | null;
        created_at?: string;
        updated_at?: string;
    };
    Update: {
        id?: string;
        event_id?: string;
        session_date?: string;
        start_time?: string | null;
        end_time?: string | null;
        location?: string | null;
        notes?: string | null;
        created_by?: string | null;
        created_at?: string;
        updated_at?: string;
    };
    Relationships: [
        {
            foreignKeyName: "event_sessions_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
        },
        {
            foreignKeyName: "event_sessions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
        }
    ];
}
export interface AttendanceTable {
    Row: {
        id: string;
        event_session_id: string;
        beneficiary_id: string;
        present: boolean;
        notes: string | null;
        recorded_by: string | null;
        created_at: string;
        updated_at: string;
    };
    Insert: {
        id?: string;
        event_session_id: string;
        beneficiary_id: string;
        present?: boolean;
        notes?: string | null;
        recorded_by?: string | null;
        created_at?: string;
        updated_at?: string;
    };
    Update: {
        id?: string;
        event_session_id?: string;
        beneficiary_id?: string;
        present?: boolean;
        notes?: string | null;
        recorded_by?: string | null;
        created_at?: string;
        updated_at?: string;
    };
    Relationships: [
        {
            foreignKeyName: "attendance_event_session_id_fkey";
            columns: ["event_session_id"];
            isOneToOne: false;
            referencedRelation: "event_sessions";
            referencedColumns: ["id"];
        },
        {
            foreignKeyName: "attendance_beneficiary_id_fkey";
            columns: ["beneficiary_id"];
            isOneToOne: false;
            referencedRelation: "beneficiaries";
            referencedColumns: ["id"];
        },
        {
            foreignKeyName: "attendance_recorded_by_fkey";
            columns: ["recorded_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
        }
    ];
}
//# sourceMappingURL=session-tables.types.d.ts.map