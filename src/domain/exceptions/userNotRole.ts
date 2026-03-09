export class UserNotRoleExceptionDomain extends Error {

    constructor(){
        super();
        this.message = 'No tienes un rol asinado comunicalo a tu coordinador si consideras que es un error';
        this.cause = 'El usuario no cumple con las normas de seguridad';
    }
}