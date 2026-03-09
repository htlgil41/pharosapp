export interface DataAccessTokenDTO {
  id: number;
  id_role: number;
  role: string;
  farmacia: string | null;
  id_farmacia: number;
  username: string
}

export interface DataRefreshTokenDTO {
  id: number;
  username: string;
  date: Date;
  farmacia: {
    id_farmacia: number;
    farmacia: string | null;
  }
}

export interface DataSessionDTO {
  ac: DataAccessTokenDTO;
  rt: DataRefreshTokenDTO;
}