import type { DataAccessToken } from "../ports/token.ts";
import type { FarmaciaRepository } from "../../domain/repositories/farmacia.ts";
import type { UsuarioRepository } from "../../domain/repositories/usuarios.ts";
import { AuthorizationExceptionUseCase } from "../exceptions/authorization.ts";
import { DataAlredyExistsExceptionUseCase } from "../exceptions/dataAlredyExists.ts";
import { DataNotFoundExceptionUseCase } from "../exceptions/dataNotFound.ts";
import { ServiceAuthorization } from "../services/authorization.ts";

interface UserFarmaciaAsigneDTO {
    fullname: string;
    farmacia: string;
}

export class NewAsigneFarmciaToUserUseCase {
    constructor(
        private repoUser: UsuarioRepository,
        private repoFarmacia: FarmaciaRepository
    ){}

    async execute(
        dataUsuario: DataAccessToken,
        id_farmcia: number,
        id_usuario: number
    ): Promise<UserFarmaciaAsigneDTO> {

        if (!ServiceAuthorization.accessOnly('coordinador', dataUsuario.role))
            throw new AuthorizationExceptionUseCase();
        const validateAsigneFarmacia = await this.repoUser.getAsigneFarmciaUsuario(
            id_farmcia,
            id_usuario
        );
        if (validateAsigneFarmacia) throw new DataAlredyExistsExceptionUseCase(
            'Se encontro una asignacion similar a la que intenta crear',
            'Ya existe la asignacion para el usuario',
            ''
        );
        const [
            farmacia,
            user
        ] = await Promise.all([
            this.repoFarmacia.getFarmaciaById(id_farmcia),
            this.repoUser.getUsuarioInfoById(id_usuario),
        ]);

        if (!farmacia) throw new DataNotFoundExceptionUseCase(
            'La farmacia que desea asignar no se encontro',
            'Verifique la existencia de la sucursal para proceder',
            '',
        );
        if (!user) throw new DataNotFoundExceptionUseCase(
            'El usuario no existe',
            'No se pudo encontrar la informacion del usuario para asignarle la sucursal',
            '',
        );

        await this.repoUser.asigneFarmacia(
            user,
            farmacia
        );
        const farmaciaPrimitive = farmacia.toValue();
        const userPrimitive = user.toValue();
        return {
            fullname: `${userPrimitive.name} ${userPrimitive.ape}`,
            farmacia: farmaciaPrimitive.name_farmcia
        };
    }
}