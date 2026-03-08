export class HashErrorDataExceptionUseCase extends Error {

    constructor(msg: string){
        super();
        this.message = msg;
    }
}