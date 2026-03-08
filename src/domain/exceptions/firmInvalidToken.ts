export class FirmInvalidTokenExceptionDomain extends Error {

    constructor(){
        super();
        this.message = 'El token parece manipulado, no es seguro';
        this.cause = 'Alguna norma de seguridad de disparo por causa de un intento de vulnerabilidad';
    }
}