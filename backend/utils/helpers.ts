
import bcrypt from "bcryptjs";
import { sign } from "hono/jwt";

// export const encryptPassword = async (password: string): Promise<string> => {
//   const hashedPassword = await argon2.hash("password");
//   return hashedPassword;
// };


export const encryptPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

// export const comparePassword = async (
//   password: string,
//   hashedPassword: string
// ) => {
//   const isMatch = await argon2.verify(hashedPassword, password);
//   return isMatch;
// };
export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

interface AuthTokenPayload {
  id: number;
  name: string;
  sub: number;
  role: "student" | "teacher" | "admin";
}


// Helper function to generate tokens
export const generateTokens = async (payload: AuthTokenPayload, jwtSecret: string) => {
  const token = await sign(
    {
      ...payload,
      exp: Math.floor(Date.now() / 1000) + 60 * 5, // 5 minutes
    },
    jwtSecret
  );

  const refreshToken = await sign(
    {
      ...payload,
      exp: Math.floor(Date.now() / 1000) + 2592000, // 30 days
    },
    jwtSecret
  );

  return { token, refreshToken };
};
