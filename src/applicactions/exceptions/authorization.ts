export class AuthorizationExceptionUseCase extends Error {

    constructor(){
        super();
        this.message = 'No puedes realizar esta accion';
        this.cause = 'No tienes los niveles suficiente para realizar dicha accion';
    }
}