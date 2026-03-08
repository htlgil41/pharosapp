export class FormatedTokenInvalidTokenExceptionDomain extends Error {

    constructor(msg: string = 'El formato del token es invalido'){
        super();
        this.message = msg;
    }
}