export class RedInvalidExceptionInfra extends Error {
    constructor(){
        super();
        this.message = 'Tenemos dificultades para conectar con el servidor.';
        this.cause = 'Por favor, espera unos segundos e intenta realizar la acción nuevamente.';
        this.name = '1287';
    }
}