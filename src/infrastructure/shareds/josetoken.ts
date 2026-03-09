import * as jose from 'jose';
import { KEYACCESSTOKEN, PEMACCESSTOKEN, KEYREFRESHTOKEN, PEMREFRESHTOKEN, SECRETCRYPTETOKEN } from './const.ts';
import { TokenExpireExceptionDomain } from '../../domain/exceptions/tokenExpired.ts';
import { FirmInvalidTokenExceptionDomain } from '../../domain/exceptions/firmInvalidToken.ts';
import { DesencriptedTokenExceptionDomain } from '../../domain/exceptions/desencripteToken.ts';
import { ClaimTokenExceptionDomain } from '../../domain/exceptions/claimToken.ts';
import { AlgInvalidTokenExceptionDomain } from '../../domain/exceptions/algNoValid.ts';
import { FormatedTokenInvalidTokenExceptionDomain } from '../../domain/exceptions/formatedToken.ts';
import { ProTokenExceptionDomain } from '../../domain/exceptions/secretInvalid.ts';
import type { DataAccessToken, DataRefreshToken } from '../../applicactions/ports/token.ts';

export class TokenManajerJOSE{

  private secreToN: jose.JWK = SECRETCRYPTETOKEN;

  private keyAccess: jose.CryptoKey = KEYACCESSTOKEN;
  private pemAccess: jose.CryptoKey = PEMACCESSTOKEN;

  private keyRefresh: jose.CryptoKey = KEYREFRESHTOKEN;
  private pemRefresh: jose.CryptoKey = PEMREFRESHTOKEN;

  async generateAccessToken(
    data: DataAccessToken,
    expirateMinute: number
  ): Promise<string> {
    try {
      const token = await new jose.SignJWT({ pay: data })
        .setProtectedHeader({ alg: 'RS256' })
        .setIssuedAt()
        .setExpirationTime(`${expirateMinute}${expirateMinute <= 1 ? 'minute' : 'minutes'}`)
        .sign(this.keyAccess!);
      return token;
    } catch (error) {
      throw this.ErrorHandlerToken(error); 
    }
  }
  
  async generateRefresToken(
    data: DataRefreshToken,
    expirateMinute: number
  ): Promise<string> {
    try {
      const token = await new jose.SignJWT({ pay: data })
        .setProtectedHeader({ alg: 'RS256' })
        .setIssuedAt()
        .setExpirationTime(`${expirateMinute}${expirateMinute <= 1 ? 'minute' : 'minutes'}`)
        .sign(this.keyRefresh!);
      return token;
    } catch (error) {
      throw this.ErrorHandlerToken(error);
    }
  }

  async criptedToken(
    token: string,
    expirateMinute: number
  ): Promise<string> {
    try {
      const cripte = new jose.EncryptJWT({ pay: token })
        .setProtectedHeader({ enc: 'A256GCM', alg: 'dir' })
        .setIssuedAt()
        .setExpirationTime(`${expirateMinute}${expirateMinute <= 1 ? 'minute' : 'minutes'}`)
        .encrypt(this.secreToN!);
      return cripte;
    } catch (error) {
      throw this.ErrorHandlerToken(error);
    }
  }

  async validateAccessToken(
    jwt: string
  ): Promise<DataAccessToken> {
    try {
      const decryptToken = await jose.jwtDecrypt(
        jwt,
        this.secreToN!,
        { contentEncryptionAlgorithms: ['A256GCM'], keyManagementAlgorithms: ['dir'] }
      );
      const tokenRealAfterCrypte = decryptToken.payload['pay'] as string;
      if (!tokenRealAfterCrypte) throw new Error('Error al codificar el token');

      const validateToken = await jose.jwtVerify(
        tokenRealAfterCrypte,
        this.pemAccess,
        { algorithms: ['RS256'] }
      );

      if (!validateToken.payload['pay']) throw new Error('Mal formateo del token');
      const payload = validateToken.payload['pay'] as DataAccessToken;
      return payload;
    } catch (error) {
      throw this.ErrorHandlerToken(error);
    }
  }

  async validateRefreshToken(
    jwt: string
  ): Promise<DataRefreshToken> {
    try {
      const decryptToken = await jose.jwtDecrypt(
        jwt,
        this.secreToN!,
        { contentEncryptionAlgorithms: ['A256GCM'], keyManagementAlgorithms: ['dir'] }
      );
      const tokenRealAfterCrypte = decryptToken.payload['pay'] as string;
      if (!tokenRealAfterCrypte) throw new Error('Error al codificar el token');
      const validateToken = await jose.jwtVerify(
        tokenRealAfterCrypte,
        this.pemRefresh,
        { algorithms: ['RS256'] }
      );

      if (!validateToken.payload['pay']) throw new Error('Mal formateo del token');
      const payload = validateToken.payload['pay'] as DataRefreshToken;
      return payload;
    } catch (error) {
      throw this.ErrorHandlerToken(error);
    }
  }

  private ErrorHandlerToken(error: unknown){
    switch (true) {
      case error instanceof jose.errors.JWTExpired:
        return new TokenExpireExceptionDomain();

      case error instanceof jose.errors.JWSSignatureVerificationFailed:
        return new FirmInvalidTokenExceptionDomain();

      case error instanceof jose.errors.JWEDecryptionFailed:
        return new DesencriptedTokenExceptionDomain();

      case error instanceof jose.errors.JWTClaimValidationFailed:
        return new ClaimTokenExceptionDomain();

      case error instanceof jose.errors.JOSEAlgNotAllowed:
        return new AlgInvalidTokenExceptionDomain();

      case error instanceof jose.errors.JWSInvalid:
      case error instanceof jose.errors.JWEInvalid:
      case error instanceof jose.errors.JWTInvalid:
        return new FormatedTokenInvalidTokenExceptionDomain('El formato del token es inválido');

      case error instanceof jose.errors.JWKInvalid:
        return new ProTokenExceptionDomain('La llave proporcionada es inválida (JWKInvalid)');

      case error instanceof jose.errors.JWKSNoMatchingKey:
        return new ProTokenExceptionDomain('No se encontró una llave que coincida (JWKSNoMatchingKey)');

      case error instanceof jose.errors.JOSEError:
        return new ProTokenExceptionDomain(`Error interno de la librería jose: ${error.message}`);

      default:
        return new ProTokenExceptionDomain('Error inesperado token');
    }
  }
}