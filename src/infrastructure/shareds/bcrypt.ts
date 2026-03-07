import bcrypt from 'bcrypt';
import type { HashDataPort } from '../../applicactions/ports/hashData.ts';

export class BcryptJHash implements HashDataPort{

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