export class DataAlredyExistsExceptionInfra extends Error {

    constructor(){
        super();
        this.message = 'Esta información ya se encuentra registrada.';
        this.cause = 'Intenta iniciar sesión o utiliza datos diferentes.';
        this.name =  'P2002';
    }
}