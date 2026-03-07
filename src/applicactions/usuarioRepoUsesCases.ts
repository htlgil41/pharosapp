import type { UsuarioRepository } from "../domain/repositories/usuarios.ts";
import { BcryptJHash } from "../infrastructure/shareds/bcrypt.ts";
import { TokenManajerJOSE } from "../infrastructure/shareds/josetoken.ts";
import { ServiceHashData } from "./services/hashData.ts";
import { ServiceTokenJose } from "./services/tokenjose.ts";

export class UsuarioRepoUsesCases {
    
    protected serviceHashData = new ServiceHashData(new BcryptJHash());
    protected serviceJoseToken = new ServiceTokenJose(new TokenManajerJOSE());

    constructor(
        protected repo: UsuarioRepository
    ){}
}