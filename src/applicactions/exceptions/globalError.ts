export class GlobalErrorExceptionCase extends Error {

    constructor(msg: string){
        super();
        this.message = msg;
    }
}