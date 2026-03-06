import type { UsuarioRepository } from "../domain/repositories/usuarios.ts";

export class UsuarioRepoUsesCases {
    
    constructor(
        protected repo: UsuarioRepository
    ){}
}