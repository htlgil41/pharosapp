import { Prisma } from "../models/client/client.ts";

export class ErrorExpetionPrisma {
    constructor(
        public error: string,
        public code: string,
        public isFix: string | undefined,
    ){}
}

export const ErrorPrismaExceptions = (error: unknown): ErrorExpetionPrisma => {
    if (error instanceof Prisma.PrismaClientKnownRequestError){
        const code = error.code;
        let message = '';
        let action = '';
        switch (error.code) {
            case 'P2002':
                message = 'Esta información ya se encuentra registrada.';
                action = 'Intenta iniciar sesión o utiliza datos diferentes.';
                break;
            
            case 'P2003':
                message = 'No se pudo completar la acción por una inconsistencia de datos.';
                action = 'Asegúrate de que los elementos relacionados existan todavía.';
                break;

            case 'P2025':
                message = 'El recurso solicitado no está disponible.';
                action = 'Refresca la página o verifica si el elemento fue eliminado por otro usuario.';
                break;

            case 'P2000':
            case 'P2005':
            case 'P2011':
                message = 'Los datos enviados no tienen el formato permitido.';
                action = 'Revisa que los campos no excedan el límite de caracteres y no estén vacíos.';
                break;

            case 'P1001':
            case 'P1002':
            case 'P1008':
            case 'P1017':
                message = 'Tenemos dificultades para conectar con el servidor.';
                action = 'Por favor, espera unos segundos e intenta realizar la acción nuevamente.';
                break;

            case 'P1003':
            case 'P1010':
                message = 'El servicio solicitado no se encuentra activo.';
                action = 'Nuestro equipo técnico ya está trabajando en ello. Inténtalo más tarde.';
                break;

            case 'P2014':
                message = 'No se puede realizar este cambio debido a dependencias activas.';
                action = 'Primero debes desvincular o eliminar los elementos asociados a este registro.';
                break;

            default:
                message = 'Ha ocurrido un error inesperado en el sistema.';
                action = 'Si el problema persiste, contacta con soporte técnico.';
                break;
        }
        
        return new ErrorExpetionPrisma(message, code, action);
    }

    return new ErrorExpetionPrisma(
        "Ha ocurrido un error inesperado en el sistema.", 
        "A000", 
        "Intente nuevamente la operacion!"
    );
}