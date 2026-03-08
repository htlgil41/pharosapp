import { AlgInvalidTokenExceptionDomain } from "../../domain/exceptions/algNoValid.ts";
import { ClaimTokenExceptionDomain } from "../../domain/exceptions/claimToken.ts";
import { DesencriptedTokenExceptionDomain } from "../../domain/exceptions/desencripteToken.ts";
import { FirmInvalidTokenExceptionDomain } from "../../domain/exceptions/firmInvalidToken.ts";
import { FormatedTokenInvalidTokenExceptionDomain } from "../../domain/exceptions/formatedToken.ts";
import { ProTokenExceptionDomain } from "../../domain/exceptions/secretInvalid.ts";
import { TokenExpireExceptionDomain } from "../../domain/exceptions/tokenExpired.ts";
import { ErrorResponseException } from "../exceptions/responseError.ts";
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
    ): Promise<boolean> {
        try {
           
            const descripted = await this.jose.validateAccessToken(jwt);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async validateRefreshToken(
        jwt: string
    ): Promise<boolean> {
        try {
           
            const descripted = await this.jose.validateRefreshToken(jwt);
            return true;
        } catch (error) {
            throw error;
        }
    }
}