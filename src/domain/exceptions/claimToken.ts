export class ClaimTokenExceptionDomain extends Error {

    constructor(){
        super();
        this.message = 'Validación de claims (payload)';
    }
}