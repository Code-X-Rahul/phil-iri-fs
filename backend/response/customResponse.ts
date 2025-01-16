import type { Context } from "hono";

export const customResponse = (
  c: Context,
  {
    status = false,
    message,
    data,
    error,
  }: {
    status: boolean;
    message: string;
    data: any;
    error?: any;
  }
) => {
  return c.json({
    status,
    message,
    data,
    error,
  });
};
