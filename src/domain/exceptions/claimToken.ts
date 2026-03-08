export class ClaimTokenExceptionDomain extends Error {

    constructor(msg: string = 'Token invalido'){
        super();
        this.message = msg;
    }
}