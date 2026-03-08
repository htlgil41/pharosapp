export class ErrorResponseException extends Error {

    constructor(
        error: string,
        fix: string,
        code: string,
    ){
        super();
        this.message = error;
        this.cause = fix,
        this.name = code;
    }
}