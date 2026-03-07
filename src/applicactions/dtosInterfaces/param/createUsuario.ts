export interface CreateUsuarioDTO {
    ape: string;
    contact: string | null;
    id_role: number | null;
    name: string;
    password: string;
    username: string;
}