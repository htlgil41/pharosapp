export interface AuthLoginDTO {
    username: string;
    password: string;
    farmacia_auth: {
        id_farmacia: number;
        farmacia: string;
    }
}