import type { HashDataPort } from "../ports/hashData.ts";

export class ServiceHashData{

    constructor(
        private hashFunc: HashDataPort
    ){}

    hashData(data: string): string {
        try {
            return this.hashFunc.hashData(data);
        } catch (error) {
            throw new Error("Ha ocurrido un error al generar el hash del dato");
        }
    }

    validateHash(hash: string, data: string): boolean {
        try {
            return this.hashFunc.validateHash(
                hash,
                data
            );
        } catch (error) {
            
            throw new Error("Ha ocurrido un error al generar el hash del dato");
        }
    }
}