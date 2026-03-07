import { GlobalErrorExceptionCase } from "../exceptions/globalError.ts";
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
            
            console.log(error)
            throw new GlobalErrorExceptionCase("Mal accesstoken generate en crypted");
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
            
            console.log(error)
            throw new GlobalErrorExceptionCase("Mal refreshtoken generate en crypted");
        }
    }

    async validateAccessToken(
        jwt: string
    ): Promise<boolean> {
        try {
           
            const descripted = await this.jose.validateAccessToken(jwt);
            return true;
        } catch (error) {
            
            throw new GlobalErrorExceptionCase("Error al validar la informacion de la session");
        }
    }
}