import * as bcrypt from 'bcryptjs';

const { compare, genSalt, hash } = bcrypt;

export const generateHashedPassword = async (
  passwordString: string
): Promise<string> => {
  const salt = await genSalt(10);
  return hash(passwordString, salt);
};

export const comparePassword = async (
  password: string,
  hashString: string
): Promise<boolean> => {
  return compare(password, hashString);
};
