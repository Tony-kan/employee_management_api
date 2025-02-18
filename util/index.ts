import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

import { hash } from 'bcrypt';

export async function hashingPassword(password: string) {
  const iv = randomBytes(16);
  //   const password = 'Password used to generate key';

  // The key length is dependent on the algorithm.
  // In this case for aes256, it is 32 bytes.
  const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
  const cipher = createCipheriv('aes-256-ctr', key, iv);

  const textToEncrypt = 'Nest';
  const encryptedText = Buffer.concat([
    cipher.update(textToEncrypt),
    cipher.final(),
  ]);

  return encryptedText.toString();
}

export async function hashingPassword2(password: string): Promise<string> {
  const saltRounds = 10;
  return await hash(password, saltRounds);
}
