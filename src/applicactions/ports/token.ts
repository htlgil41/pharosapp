export interface AccessToken {
  id: number;
  id_role: number | null;
  role: string | null;
  farmacia: string | null;
  id_farmacia: number | null;
  username: string
}

export interface TokenJWTJOSEPort<T>{
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

    validateAccessToken(
        jwt: string
    ): Promise<T>;
    validateRefreshToken(
        jwt: string
    ): Promise<T>;
}