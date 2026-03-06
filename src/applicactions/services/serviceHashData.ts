import type { HashDataPort } from "../ports/hashData.ts";

export class ServiceHashData{

    constructor(
        private hashFunc: HashDataPort
    ){}

    hashData(data: string): string {
        
        const hash =  this.hashFunc.hashData(data);
        if (!hash) throw new Error("Ha ocurrido un error al generar el hash del dato");
        return hash
    }

    validateHash(hash: string, data: string): boolean {
        
        const validate = this.hashFunc.validateHash(
            hash,
            data
        );
        if (!validate) throw new Error("Ha ocurrido un error al generar el hash del dato");
        return validate;
    }
}