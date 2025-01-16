// utils/ResponseUtil.ts

// Interface for error details
interface ErrorDetails {
    code?: number;
    details?: any;
    [key: string]: any;
}

// Standard response type
interface ApiResponse<T> {
    data: T | null;
    message: string;
    success: boolean;
    error: ErrorDetails | null;
}

export class ResponseUtil {
    static success<T>(data: T, message: string = "Operation successful"): ApiResponse<T> {
        return {
            data,
            message,
            success: true,
            error: null,
        };
    }

    static error(message: string, errorDetails: ErrorDetails | null = null): ApiResponse<null> {
        return {
            data: null,
            message,
            success: false,
            error: errorDetails,
        };
    }

    // Common HTTP error responses
    static badRequest(message: string = "Bad request", details?: any): ApiResponse<null> {
        return this.error(message, {
            code: 400,
            details,
        });
    }

    static unauthorized(message: string = "Unauthorized", details?: any): ApiResponse<null> {
        return this.error(message, {
            code: 401,
            details,
        });
    }

    static forbidden(message: string = "Forbidden", details?: any): ApiResponse<null> {
        return this.error(message, {
            code: 403,
            details,
        });
    }

    static notFound(message: string = "Resource not found", details?: any): ApiResponse<null> {
        return this.error(message, {
            code: 404,
            details,
        });
    }

    static conflict(message: string = "Resource conflict", details?: any): ApiResponse<null> {
        return this.error(message, {
            code: 409,
            details,
        });
    }

    static validationError(message: string = "Validation failed", details?: any): ApiResponse<null> {
        return this.error(message, {
            code: 422,
            details,
        });
    }

    static internalError(message: string = "Internal server error", details?: any): ApiResponse<null> {
        return this.error(message, {
            code: 500,
            details,
        });
    }

    static serviceUnavailable(message: string = "Service unavailable", details?: any): ApiResponse<null> {
        return this.error(message, {
            code: 503,
            details,
        });
    }
}