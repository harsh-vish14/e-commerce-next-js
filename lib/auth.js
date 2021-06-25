import { hash, compare } from "bcryptjs";
export const hashing = async (password) => {
  return await hash(password, 12);
};

export const compareHandler = async (newPassword, hashedPassword) => {
  return await compare(newPassword, hashedPassword);
};
