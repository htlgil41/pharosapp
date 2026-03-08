export class RelationDoNoExistsException extends Error {

    constructor(){
        super();
        this.message = 'No se pudo completar la acción por una inconsistencia de datos.';
        this.cause = 'Asegúrate de que los elementos relacionados existan todavía.';
        this.name = 'P2003';
    }
}