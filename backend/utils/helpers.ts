
import bcrypt from "bcryptjs";

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
