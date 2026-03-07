export class ErrorResponseException {

    constructor(
        public readonly error: string,
        public readonly fix: string,
        public readonly code: string,
    ){}
}