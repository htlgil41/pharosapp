export class ServiceInactiveExceptionInfra extends Error {

    constructor(){
        super();
        this.message = 'El servicio solicitado no se encuentra activo.';
        this.cause = 'Nuestro equipo técnico ya está trabajando en ello. Inténtalo más tarde.';
        this.name = '30';
    }
}