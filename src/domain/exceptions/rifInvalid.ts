export class RifInvalidException extends Error {

    constructor(){

        super();
        this.message = 'Error al validar el rif ya que esta en un formato desconocido';
    }
}