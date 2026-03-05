export interface InfoUser {
    id: bigint;
    role: string | null;
    id_role: bigint | null;
    name: string;
    ape: string;
    username: string;
    password: string;
    contact: string | null;
}

export interface UsuarioByFarmacia {
    id: bigint;
    name_farmacia: string;
    id_farmacia: bigint;
    usuario: {
        role: string | null;
        id_role: bigint | null;
        name: string;
        ape: string;
        username: string;
        password: string;
    }
}