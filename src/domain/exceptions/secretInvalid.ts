export class ProTokenExceptionDomain extends Error {

    constructor(msg: string = 'Proceso corrupto del token'){
        super();
        this.message = msg;
    }
}