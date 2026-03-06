export interface TokenJWTJOSEPort {
    generateAccessToken(
        data: string,
        expirateMinute: number
    ): Promise<string>;
    generateRefresToken(
        data: string,
        expirateMinute: number
    ): Promise<string>
    criptedToken(
        token: string,
        expirateMinute: number
    ): Promise<string>;
}