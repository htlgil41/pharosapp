export class UserAlredyExistsExceptionUseCase extends Error {

    constructor(){
        super();
        this.message = 'El usuario ya se encuentra registrado';
        this.cause = 'Tu estas dentro ve e inicia!';
        this.name = '';
    }
}