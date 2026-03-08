import type { DataAccessToken, DataRefreshToken, TokenJWTJOSEPort } from "../ports/token.ts";

export class ServiceTokenJose {

    constructor(
        private jose: TokenJWTJOSEPort<DataAccessToken, DataRefreshToken>
    ){}

    async firmTokenAccess(data: DataAccessToken, expirateMinute: number): Promise<string> {
        try {
            
            const tokenAccess = await this.jose.generateAccessToken(
                data,
                expirateMinute
            );
            const crypteToken = await this.jose.criptedToken(
                tokenAccess,
                expirateMinute
            );
            return crypteToken;
        } catch (error) {
            throw error;
        }
    }

    async firmTokenRefresh(data: DataRefreshToken, expirateMinute: number): Promise<string> {
        try {
            
            const tokenAccess = await this.jose.generateRefresToken(
                data,
                expirateMinute
            );
            const crypteToken = await this.jose.criptedToken(
                tokenAccess,
                expirateMinute
            );
            return crypteToken;
        } catch (error) {
            throw error;
        }
    }

    async validateAccessToken(
        jwt: string
    ): Promise<DataAccessToken> {
        try {
           
            return await this.jose.validateAccessToken(jwt);
        } catch (error) {
            throw error;
        }
    }

    async validateRefreshToken(
        jwt: string
    ): Promise<DataRefreshToken> {
        try {
           
            return await this.jose.validateRefreshToken(jwt);
        } catch (error) {
            throw error;
        }
    }
}