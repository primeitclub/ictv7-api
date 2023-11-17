import * as bcrypt from 'bcryptjs';

const { compare, genSalt, hash } = bcrypt;

export const hashInformation = async (input: string): Promise<string> => {
  const salt = await genSalt(10);
  return hash(input, salt);
};

export const compareHashedInformation = async (
  input: string,
  hashString: string
): Promise<boolean> => {
  return compare(input, hashString);
};
