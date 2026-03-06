import bcrypt from 'bcrypt';
import type { HashDataPort } from '../../applicactions/ports/hashData.ts';


export class BcryptJHash implements HashDataPort{

    hashData(data: string): string | undefined {
        try {
        
            return bcrypt.hashSync(
                data,
                bcrypt.genSaltSync(12),
            );
        } catch (error) {
            return undefined;
        }
    }
    
    validateHash(hash: string, data: string): boolean | undefined {
        try {
            
            return bcrypt.compareSync(
                data,
                hash
            );
        } catch (error) {
            return undefined;
        }
    }
}