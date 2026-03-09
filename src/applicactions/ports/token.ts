export interface DataAccessToken {
  id: number;
  id_role: number;
  role: string;
  farmacia: string | null;
  id_farmacia: number;
  username: string
}

export interface DataRefreshToken {
  id: number;
  username: string;
  date: Date;
  farmacia: {
    id_farmacia: number;
    farmacia: string | null;
  }
}

export interface TokenJWTJOSEPort<DAT, DRT>{
    generateAccessToken(
        data: DAT,
        expirateMinute: number
    ): Promise<string>;
    generateRefresToken(
        data: DRT,
        expirateMinute: number
    ): Promise<string>
    criptedToken(
        token: string,
        expirateMinute: number
    ): Promise<string>;

    validateAccessToken(
        jwt: string
    ): Promise<DAT>;
    validateRefreshToken(
        jwt: string
    ): Promise<DRT>;
}