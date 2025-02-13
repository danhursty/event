export declare enum SupabaseErrorCode {
    CREATE_FAILED = "CREATE_FAILED",
    READ_FAILED = "READ_FAILED",
    UPDATE_FAILED = "UPDATE_FAILED",
    DELETE_FAILED = "DELETE_FAILED",
    NOT_FOUND = "NOT_FOUND",
    VALIDATION_FAILED = "VALIDATION_FAILED",
    UNAUTHORIZED = "UNAUTHORIZED",
    UNKNOWN_ERROR = "UNKNOWN_ERROR"
}
export declare abstract class SupabaseOperationError extends Error {
    readonly operation: string;
    readonly message: string;
    readonly toastMessage: string;
    readonly errorCode: SupabaseErrorCode;
    readonly cause?: unknown | undefined;
    constructor(operation: string, message: string, toastMessage: string, errorCode: SupabaseErrorCode, cause?: unknown | undefined);
}
