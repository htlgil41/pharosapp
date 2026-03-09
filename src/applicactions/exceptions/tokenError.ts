export class TokenErrorExceptionUseCase extends Error {
    constructor(
        msg: string,
        cause: string,
        name: string
    ){
        super();
        this.message = msg;
        this.cause = cause;
        this.name = name;
    }
}