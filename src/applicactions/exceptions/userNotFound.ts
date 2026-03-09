export class UserNotFoundExceptionUseCase extends Error {

    constructor(){
        super();
        this.message = 'No existe el usuario';
        this.cause = 'Puedes crear un usuario con estos mismos datos, vamos!!';
        this.name = '';
    }
}