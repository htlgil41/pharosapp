export class DesencriptedTokenExceptionDomain extends Error {

    constructor(){
        super();
        this.message = 'Error al desencriptar el token (JWEDecryptionFailed)'
        this.cause = 'Error al tratar de obtener la informacion del token';
    }
}