export interface CreateUsuarioParams {
    ape: string;
    contact: string;
    role: string | null;
    id_role: bigint | null;
    name: string;
    password: string;
    username: string;
}