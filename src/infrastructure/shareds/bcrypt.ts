import bcrypt from 'bcrypt';

export const HashData = (data: string): string | undefined => {
    try {
        
        return bcrypt.hashSync(
            data,
            bcrypt.genSaltSync(12),
        );
    } catch (error) {
        return undefined;
    }
}

export const ValidateHash = (hash: string, data: string): boolean | undefined => {
    try {
        
        return bcrypt.compareSync(
            data,
            hash
        );
    } catch (error) {
        return undefined;
    }
}