import type { UsuarioRepository } from "../domain/repositories/usuarios.ts";
import { TokenManajerJOSE } from "../infrastructure/shareds/josetoken.ts";
import { ServiceTokenJose } from "./services/tokenjose.ts";

export class UsuarioRepoUsesCases {
    protected serviceJoseToken = new ServiceTokenJose(new TokenManajerJOSE());

    constructor(
        protected repo: UsuarioRepository
    ){}
}