export class FirmInvalidTokenExceptionDomain extends Error {

    constructor(msg: string = 'El token parece manipulado, no es seguro'){
        super();
        this.message = msg;
    }
}