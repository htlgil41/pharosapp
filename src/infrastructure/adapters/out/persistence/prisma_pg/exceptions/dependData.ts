export class DependDataExceptionInfra extends Error {

    constructor(){
        super();
        this.message = 'No se puede realizar este cambio debido a dependencias activas.';
        this.cause = 'Primero debes desvincular o eliminar los elementos asociados a este registro.';
        this.name = 'P2014';
    }
}