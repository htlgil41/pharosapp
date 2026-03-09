import bcrypt from 'bcrypt';

export class BcryptJHash {

    static hashData(data: string): string {
        return bcrypt.hashSync(
            data,
            bcrypt.genSaltSync(12),
        );
    }

    static validateHash(hash: string, data: string): boolean {
        return bcrypt.compareSync(
            data,
            hash
        );
    }
}