import * as jose from 'jose';
import type { TokenJWTJOSEPort } from '../../applicactions/ports/token.ts';

export class TokenManajerJOSE implements TokenJWTJOSEPort {

    private secreToN: jose.JWK | undefined;

    private keyAccess: jose.CryptoKey | undefined;
    private pemAccess: jose.CryptoKey | undefined;

    private keyRefresh: jose.CryptoKey | undefined;
    private pemRefresh: jose.CryptoKey | undefined;

  async generateAccessToken(
    data: string,
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
    data: string,
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
}