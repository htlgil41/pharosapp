export class FarmaciaNotAsigneUsuarioExceptionDomain extends Error {

    constructor(c: number){
        super();
        this.message = c <= 0 
            ? 'El usuario no tiene ninguna farmacia asignada' 
            : 'El usuario no tiene la farmcaia asignada';
        this.cause = 'Debes pertenecer a alguna para poder operar en ellas';
        this.name = '';
    }
}