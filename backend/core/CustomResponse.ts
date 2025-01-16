export class CustomResponse<T> {
    message: string;
    data: T | null;
    success: boolean;

    constructor(message: string, data: T | null = null, success: boolean = true) {
        this.message = message;
        this.data = data;
        this.success = success;
    }

    static success<T>(message: string, data: T): CustomResponse<T> {
        return new CustomResponse(message, data, true);
    }

    static failure(message: string): CustomResponse<null> {
        return new CustomResponse(message, null, false);
    }

    toJSON(): Record<string, any> {
        return {
            message: this.message,
            data: this.data,
            success: this.success,
        };
    }
}
