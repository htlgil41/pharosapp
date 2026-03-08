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
            throw this.handeErrorService(error);
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
            throw this.handeErrorService(error);
        }
    }

    async validateAccessToken(
        jwt: string
    ): Promise<boolean> {
        try {
           
            const descripted = await this.jose.validateAccessToken(jwt);
            return true;
        } catch (error) {
            throw this.handeErrorService(error);
        }
    }

    async validateRefreshToken(
        jwt: string
    ): Promise<boolean> {
        try {
           
            const descripted = await this.jose.validateRefreshToken(jwt);
            return true;
        } catch (error) {
            throw this.handeErrorService(error);
        }
    }

    private handeErrorService(error: unknown){
        switch(true){

            case error instanceof TokenExpireExceptionDomain:
                return new ErrorResponseException(
                    error.message,
                    'Vuelva a iniciar para estar activo',
                    ''
                );
            case error instanceof FirmInvalidTokenExceptionDomain: 
                return new ErrorResponseException(
                    error.message,
                    'Alguna norma de seguridad de disparo por causa de un intento de vulnerabilidad',
                    ''
                );
            case error instanceof DesencriptedTokenExceptionDomain: 
                return new ErrorResponseException(
                    error.message,
                    'Error al tratar de obtener la informacion del token',
                    ''
                );
            case error instanceof ClaimTokenExceptionDomain: 
                return new ErrorResponseException(
                    error.message,
                    '',
                    ''
                );
            case error instanceof AlgInvalidTokenExceptionDomain: 
                return new ErrorResponseException(
                    error.message,
                    'Error interno al blindar la informacion',
                    ''
                );
            case error instanceof FormatedTokenInvalidTokenExceptionDomain: 
                return new ErrorResponseException(
                    error.message,
                    'La informacion de autenticacion se ha deformado',
                    ''
                );
            case error instanceof ProTokenExceptionDomain: 
                return new ErrorResponseException(
                    error.message,
                    'Error inesperado',
                    ''
                );
            default: 
                return new ErrorResponseException(
                    'Error totalmente desconocido en los token',
                    'Vuelva a intentar la operacion o inicie nuevamente',
                    ''
                );
        }
    }
}