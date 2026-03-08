export class FormateDataInvalidExceptionInfra extends Error {

    constructor(){
        super();
        this.message = 'Los datos enviados no tienen el formato permitido.';
        this.cause = 'Revisa que los campos no excedan el límite de caracteres y no estén vacíos.';
        this.name = '2511';
    }
}