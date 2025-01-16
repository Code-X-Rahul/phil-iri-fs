import type { ContentfulStatusCode } from "hono/utils/http-status";

// Define a custom error class
class CustomError extends Error {
  statusCode: ContentfulStatusCode;

  constructor(message: string, statusCode: ContentfulStatusCode = 500) {
    super(message);
    this.name = "CustomError";
    this.statusCode = statusCode;
  }
}
export default CustomError;
