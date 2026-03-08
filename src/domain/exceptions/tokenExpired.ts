export class TokenExpireExceptionDomain extends Error {

    constructor(){
        super();
        this.message = 'El token ha expirado';
        this.cause = 'Vuelva a iniciar para estar activo'
    }
}