export interface AuthLoginIUnterface {
    username: string;
    password: string;
    farmacia_auth: {
        id_farmacia: number;
        farmacia: string;
    }
}

export interface NewUserInterface {
    id_role: number;
    name_user: string;
    ape: string;
    username: string;
    pass: string;
    contact: string | undefined;
}

export interface SwitchMpLoginInterface {
    id_farmacia: number;
}