export class cajaFarmaciaNumInvalidExceptionDomain extends Error {
    constructor(){

        super();
        this.message = 'Error en el numeor de caja no puede tener un valor menor a cero (0) asignado';
    }
}