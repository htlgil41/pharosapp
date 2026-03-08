export type Role = 
    'coordinador' |
    'administrador' | 
    'soportista';

export class ServiceAuthorization {

    static accessOnly(auth: Role, rol: string): boolean{ 
        return auth === rol;
    }
}