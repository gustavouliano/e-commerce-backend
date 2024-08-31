export interface Cryptography {
    hash(plaintext: string, saltRounds: number): string;
    compare(plaintext: string, hash: string): boolean;
}
