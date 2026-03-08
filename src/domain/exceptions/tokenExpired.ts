export class TokenExpireExceptionDomain extends Error {

    constructor(msg: string = 'Token expirado'){
        super();
        this.message = msg;
    }
}