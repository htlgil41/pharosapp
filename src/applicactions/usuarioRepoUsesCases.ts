import type { UsuarioRepository } from "../domain/repositories/usuarios.ts";
import { BcryptJHash } from "../infrastructure/shareds/bcrypt.ts";
import { ServiceHashData } from "./services/hashData.ts";

export class UsuarioRepoUsesCases {
    
    protected serviceHashData = new ServiceHashData(new BcryptJHash());

    constructor(
        protected repo: UsuarioRepository
    ){}
}