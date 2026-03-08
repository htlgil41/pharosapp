export class AlgInvalidTokenExceptionDomain extends Error {

    constructor(msg: string = 'Error al tratar de obenter la informcion segura'){
        super();
        this.message = msg;
    }
}