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
            
            throw new Error("Mal token generate en crypted");
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
            
            throw new Error("Mal token generate en crypted");
        }
    }

    async validateAccessToken(
        jwt: string
    ): Promise<boolean> {
        try {
           
            const descripted = await this.jose.validateAccessToken(jwt);
            return true;
        } catch (error) {
            
            throw new Error("Error al validar");
        }
    }
}