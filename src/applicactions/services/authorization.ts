export type Role = 
    'coordinador' |
    'administrador' | 
    'soportista';

export class Authorization {

    static accessOnly(auth: Role, rol: Role): boolean{ 
        return auth === rol;
    }
}