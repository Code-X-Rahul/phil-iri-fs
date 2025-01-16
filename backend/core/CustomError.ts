export class CustomError extends Error {
    message: string;
    data: any;
    statusCode: number;
    success: boolean;
    stack?: string;

    constructor(message: string, statusCode: number = 500, data: any = null, error?: Error) {
        super(message);
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
        this.success = false;


        // Ensure the error name is correct
        this.name = this.constructor.name;

        // Preserve the stack trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    static badRequest(message: string, data: any = null): CustomError {
        return new CustomError(message, 400, data);
    }

    static unauthorized(message: string, data: any = null): CustomError {
        return new CustomError(message, 401, data);
    }

    static forbidden(message: string, data: any = null): CustomError {
        return new CustomError(message, 403, data);
    }

    static notFound(message: string, data: any = null): CustomError {
        return new CustomError(message, 404, data);
    }

    static conflict(message: string, data: any = null): CustomError {
        return new CustomError(message, 409, data);
    }

    static internal(message: string, data: any = null, error?: Error): CustomError {
        return new CustomError(message, 500, data, error);
    }

    static fromPrismaError(error: any): CustomError {
        const message = error.message || "A database error occurred";
        return new CustomError(message, 500, { prismaError: error }, error);
    }

    toJSON(): Record<string, any> {
        return {
            message: this.message,
            data: this.data,
            success: this.success,
            statusCode: this.statusCode,

        };
    }
}
