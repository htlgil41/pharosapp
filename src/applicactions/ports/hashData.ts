export interface HashDataPort {
    hashData(data: string): string | undefined;
    validateHash(hash: string, data: string): boolean | undefined;
}