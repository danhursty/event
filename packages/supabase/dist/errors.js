export var SupabaseErrorCode;
(function (SupabaseErrorCode) {
    // CRUD Operation Codes
    SupabaseErrorCode["CREATE_FAILED"] = "CREATE_FAILED";
    SupabaseErrorCode["READ_FAILED"] = "READ_FAILED";
    SupabaseErrorCode["UPDATE_FAILED"] = "UPDATE_FAILED";
    SupabaseErrorCode["DELETE_FAILED"] = "DELETE_FAILED";
    // Additional Common Error Codes
    SupabaseErrorCode["NOT_FOUND"] = "NOT_FOUND";
    SupabaseErrorCode["VALIDATION_FAILED"] = "VALIDATION_FAILED";
    SupabaseErrorCode["UNAUTHORIZED"] = "UNAUTHORIZED";
    SupabaseErrorCode["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
})(SupabaseErrorCode || (SupabaseErrorCode = {}));
export class SupabaseOperationError extends Error {
    constructor(operation, message, toastMessage, errorCode, cause) {
        super(`${operation} failed: ${message}`);
        this.operation = operation;
        this.message = message;
        this.toastMessage = toastMessage;
        this.errorCode = errorCode;
        this.cause = cause;
        this.name = "SupabaseOperationError";
    }
}
