import type { UsuarioByFarmaciaEntity } from "../../domain/entities/usuarioFarmacia.ts";
import { UsuarioRepoUsesCases } from "../usuarioRepoUsesCases.ts";

export class UsuarioForAuthUseCase extends UsuarioRepoUsesCases {

    async execute(
        username: string,
        password: string
    ): Promise<UsuarioByFarmaciaEntity>{
        
        const validateExisteUsuario = await this.repo.getUsuarioByUsername(
            username
        );

        if (!validateExisteUsuario) throw new Error('No existe el usuario');
        //Validate PasswordReal
        return validateExisteUsuario;
    }
}