import { compareSync, hashSync } from 'bcrypt';
import { Cryptography } from 'src/shared/interfaces/cryptography';

export class CryptographyBcrypt implements Cryptography {
    hash(plaintext: string, saltRounds: number = 10): string {
        return hashSync(plaintext, saltRounds);
    }

    compare(plaintext: string, hash: string): boolean {
        return compareSync(plaintext, hash);
    }
}
