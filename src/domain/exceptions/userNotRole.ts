export class UserNotRoleExceptionDomain extends Error {

    constructor(){
        super();
        this.message = 'No se ha asignado ningun rol';
        this.cause = 'El usuario no cumple con las normas de privacidad';
    }
}