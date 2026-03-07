export interface HashDataPort {
    hashData(data: string): string;
    validateHash(hash: string, data: string): boolean;
}