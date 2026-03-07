import * as jose from 'jose';
import type { DataAccessToken, DataRefreshToken, TokenJWTJOSEPort } from '../../applicactions/ports/token.ts';
import { KEYACCESSTOKEN, PEMACCESSTOKEN, KEYREFRESHTOKEN, PEMREFRESHTOKEN, SECRETCRYPTETOKEN } from './const.ts';

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
        .setExpirationTime(expirateMinute * 6000)
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
        .setExpirationTime(expirateMinute * 6000)
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
        .setExpirationTime(expirateMinute * 6000)
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

    console.log(validateToken.payload['pay']);
    return {
      id: 1,
      id_role: 1,
      role: '',
      id_farmacia: 1,
      farmacia: '',
      username: ''
    };
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

    console.log(validateToken.payload['pay']);
    return {
      id: 1,
      username: '',
      date: new Date(),
    };
  }
}