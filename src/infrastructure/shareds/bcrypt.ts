import bcrypt from 'bcrypt';

export class BcryptJHash {

    hashData(data: string): string {
        return bcrypt.hashSync(
            data,
            bcrypt.genSaltSync(12),
        );
    }

    validateHash(hash: string, data: string): boolean {
        return bcrypt.compareSync(
            data,
            hash
        );
    }
}