import * as jose from 'jose';
import type { DataAccessToken, DataRefreshToken, TokenJWTJOSEPort } from '../../applicactions/ports/token.ts';
import { KEYACCESSTOKEN, PEMACCESSTOKEN, KEYREFRESHTOKEN, PEMREFRESHTOKEN, SECRETCRYPTETOKEN } from './const.ts';
import { TokenExpireExceptionDomain } from '../../domain/exceptions/tokenExpired.ts';
import { FirmInvalidTokenExceptionDomain } from '../../domain/exceptions/firmInvalidToken.ts';
import { DesencriptedTokenExceptionDomain } from '../../domain/exceptions/desencripteToken.ts';
import { ClaimTokenExceptionDomain } from '../../domain/exceptions/claimToken.ts';
import { AlgInvalidTokenExceptionDomain } from '../../domain/exceptions/algNoValid.ts';
import { FormatedTokenInvalidTokenExceptionDomain } from '../../domain/exceptions/formatedToken.ts';
import { ProTokenExceptionDomain } from '../../domain/exceptions/secretInvalid.ts';

export class TokenManajerJOSE implements TokenJWTJOSEPort<
  DataAccessToken,
  DataRefreshToken
>{

  private secreToN: jose.JWK = SECRETCRYPTETOKEN;

  private keyAccess: jose.CryptoKey = KEYACCESSTOKEN;
  private pemAccess: jose.CryptoKey = PEMACCESSTOKEN;

  private keyRefresh: jose.CryptoKey = KEYREFRESHTOKEN;
  private pemRefresh: jose.CryptoKey = PEMREFRESHTOKEN;

  async generateAccessToken(
    data: DataAccessToken,
    expirateMinute: number
  ): Promise<string> {
    const token = await new jose.SignJWT({ pay: data })
        .setProtectedHeader({ alg: 'RS256' })
        .setIssuedAt()
        .setExpirationTime(`${expirateMinute}${expirateMinute <= 1 ? 'minute' : 'minutes'}`)
        .sign(this.keyAccess!);
    return token;
  }
  
  async generateRefresToken(
    data: DataRefreshToken,
    expirateMinute: number
  ): Promise<string> {
    const token = await new jose.SignJWT({ pay: data })
        .setProtectedHeader({ alg: 'RS256' })
        .setIssuedAt()
        .setExpirationTime(`${expirateMinute}${expirateMinute <= 1 ? 'minute' : 'minutes'}`)
        .sign(this.keyRefresh!);
    return token;
  }

  async criptedToken(
    token: string,
    expirateMinute: number
  ): Promise<string> {
    const cripte = new jose.EncryptJWT({ pay: token })
        .setProtectedHeader({ enc: 'A256GCM', alg: 'dir' })
        .setIssuedAt()
        .setExpirationTime(`${expirateMinute}${expirateMinute <= 1 ? 'minute' : 'minutes'}`)
        .encrypt(this.secreToN!);
    return cripte;
  }

  async validateAccessToken(
    jwt: string
  ): Promise<DataAccessToken> {
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
  }

  async validateRefreshToken(
    jwt: string
  ): Promise<DataRefreshToken> {
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
    const payload = validateToken.payload['pay'] as DataRefreshToken;
    return payload;
  }

  private ErrorHandlerToken(error: unknown){
    switch (true) {
      case error instanceof jose.errors.JWTExpired:
        throw new TokenExpireExceptionDomain('El token ha expirado');

      case error instanceof jose.errors.JWSSignatureVerificationFailed:
        throw new FirmInvalidTokenExceptionDomain('La firma del token no es válida (JWSSignatureVerificationFailed)');

      case error instanceof jose.errors.JWEDecryptionFailed:
        throw new DesencriptedTokenExceptionDomain('Error al desencriptar el token (JWEDecryptionFailed)');

      case error instanceof jose.errors.JWTClaimValidationFailed:
        throw new ClaimTokenExceptionDomain('Validación de claims (payload) fallida (JWTClaimValidationFailed)');

      case error instanceof jose.errors.JOSEAlgNotAllowed:
        throw new AlgInvalidTokenExceptionDomain('Algoritmo no permitido (JOSEAlgNotAllowed)');

      case error instanceof jose.errors.JWSInvalid:
      case error instanceof jose.errors.JWEInvalid:
      case error instanceof jose.errors.JWTInvalid:
        throw new FormatedTokenInvalidTokenExceptionDomain('El formato del token es inválido');

      case error instanceof jose.errors.JWKInvalid:
        throw new Error('La llave proporcionada es inválida (JWKInvalid)');

      case error instanceof jose.errors.JWKSNoMatchingKey:
        throw new ProTokenExceptionDomain('No se encontró una llave que coincida (JWKSNoMatchingKey)');

      case error instanceof jose.errors.JOSEError:
        throw new ProTokenExceptionDomain(`Error interno de la librería jose: ${error.message}`);

      default:
        throw new ProTokenExceptionDomain('Error inesperado token');
    }
  }
}