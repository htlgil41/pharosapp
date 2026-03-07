export class UserAlredyExistsExceptionCase extends Error {

    constructor(){
        super();
        this.message = 'El usuario ya se encuentra registrado';
    }
}