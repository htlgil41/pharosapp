export class PasswordNoHashExceptionDomain extends Error {

    constructor(){
        super();
        this.message = 'Error en la password ya que no se tecto segura en su codificacion';
    }
}