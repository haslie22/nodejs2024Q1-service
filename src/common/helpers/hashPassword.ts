import * as bcrypt from 'bcrypt';

const DEFAULT_SALT = 10;

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(
    parseInt(process.env.CRYPT_SALT) || DEFAULT_SALT,
  );
  return await bcrypt.hash(password, salt);
}
