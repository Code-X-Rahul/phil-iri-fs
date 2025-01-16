export class CustomError extends Error {
    message: string;
    data: any;
    statusCode: number;
    success: boolean;
    stack?: string;

    constructor(message: string, statusCode: number = 500, data: any = null, stack?: string) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
        this.success = false;
        this.stack = stack || new Error().stack;

        // Ensure the error name is correct
        this.name = this.constructor.name;
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

    static internal(message: string, data: any = null, stack?: string): CustomError {
        return new CustomError(message, 500, data, stack);
    }

    static fromPrismaError(error: any): CustomError {
        const message = error.message || 'A database error occurred';
        return new CustomError(message, 500, { prismaError: error });
    }

    toJSON(): Record<string, any> {
        return {
            message: this.message,
            data: this.data,
            success: this.success,
            statusCode: this.statusCode,
            stack: process.env.NODE_ENV === 'development' ? this.stack : undefined, // Exclude stack in production
        };
    }
}
