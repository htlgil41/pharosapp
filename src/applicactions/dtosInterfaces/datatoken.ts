export interface UsuarioInfoDTO {
  id: number;
  id_role: number;
  role: string;
  username: string;
  password: string;
  farmacia: {
    id_farmacia: number;
    farmacia: string | null;
  }
}