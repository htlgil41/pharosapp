export class InvalidPasswordExceptionUseCase extends Error {
    constructor(){
        super();
        this.message = 'Datos invalidos';
        this.cause = 'Verifica que la informacion este correcta';
        this.name = '';
    }
}