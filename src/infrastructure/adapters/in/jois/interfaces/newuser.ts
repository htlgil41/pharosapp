export interface AuthLoginIUnterface {
    username: string;
    password: string;
    farmacia_auth: {
        id_farmacia: number;
        farmacia: string;
    }
}

export interface NewUserInterface {
    id_role: number | undefined;
    name_user: string;
    ape: string;
    username: string;
    pass: string;
    contact: string | undefined;
}