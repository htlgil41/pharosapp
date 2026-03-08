export class UnknowErrorExceptionInfra extends Error {

    constructor(){
        super();
        this.message = 'Se ha generado u error totalmente desconocido';
        this.cause = 'Si el error persiste intente nuevamente mas tarde';
        this.name = '';
    }
}