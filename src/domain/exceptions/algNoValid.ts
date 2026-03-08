export class AlgInvalidTokenExceptionDomain extends Error {

    constructor(){
        super();
        this.message = 'Algoritmo no permitido (JOSEAlNotAllowed)';
        this.cause = 'El token no se puede generar por falta de parametros';
    }
}