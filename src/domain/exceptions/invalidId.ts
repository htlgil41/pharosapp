export class InvalidIdExceptionDomain extends Error {

    constructor(){

        super();
        this.message = 'Hay un problema con el id ya que no es valido';
    }
}