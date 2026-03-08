export interface RoleUser {
    id: number;
    role: string;
}

export interface InfoUser {
    id: number;
    role: string | null;
    id_role: number | null;
    name: string;
    ape: string;
    username: string;
    password: string;
    contact: string | null;
}

export interface UsuarioByFarmacia {
    id: number;
    farmacias_asigne: {
        name_farmacia: string | null;
        id_farmacia: number;
    }[],
    usuario: {
        role: string | null;
        id_role: number | null;
        name: string;
        ape: string | null;
        username: string;
        password: string;
    }
}