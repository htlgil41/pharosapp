export class DataDoNotExistsExceptionInfra extends Error {

    constructor(){
        super();
        this.message = 'El recurso solicitado no está disponible.';
        this.cause = 'Refresca la página o verifica si el elemento fue eliminado por otro usuario.';
        this.name = 'P2025';
    }
}