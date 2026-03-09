import type { AuthLoginDTO } from "../dtosInterfaces/param/authLogin.ts";
import type { AuthLoginResponse } from "../dtosInterfaces/response/authLogin.ts";
import { ErrorResponseException } from "../exceptions/responseError.ts";
import { UsuarioRepoUsesCases } from "../usuarioRepoUsesCases.ts";

export class UsuarioForAuthUseCase extends UsuarioRepoUsesCases {

    async execute(params: AuthLoginDTO): Promise<[
        AuthLoginResponse | null, 
        ErrorResponseException | null
    ]>{
        const validateExisteUsuario = await this.repo.getUsuarioByUsername(
            params.username
        );
        if (validateExisteUsuario === null) return [
            null,
            new ErrorResponseException(
                'No existe el usuario',
                'Puedes crear un usuario con estos mismos datos, vamos!!',
                ''
            )
        ];

        const {
            id: idUsuario,
            farmacias_asigne,
            usuario: usuarioInfo
        } = validateExisteUsuario.toValue();
        const farmciaauth = farmacias_asigne.find(f => f.id_farmacia === params.farmacia_auth.id_farmacia);
        if (!farmciaauth) return [
            null,
            new ErrorResponseException(
                'Farmacia no asignada',
                'No tienes una farmacia asignada pide a tus superiores que lo hagan pronto',
                ''
            )
        ];
      
        const validatePassHash = this.serviceHashData.validateHash(
            usuarioInfo.password,
            params.password
        );
        if (!validatePassHash) return [
            null,
            new ErrorResponseException(
                'Username o Password incorrectos',
                'Verifica tus datos para poder ingresar',
                ''
            )
        ]
        const [
            token_access,
            token_refresh
        ] = await Promise.all([
            this.serviceJoseToken.firmTokenAccess(
                {
                    id: idUsuario,
                    id_role: usuarioInfo.id_role!,
                    role: usuarioInfo.role!,
                    id_farmacia: farmciaauth.id_farmacia,
                    farmacia: farmciaauth.name_farmacia,
                    username: usuarioInfo.username,
                },
                8
            ),
            this.serviceJoseToken.firmTokenRefresh(
                {   
                    id: idUsuario,
                    username: usuarioInfo.username,
                    farmacia: {
                        id_farmacia: farmciaauth.id_farmacia,
                        farmacia: farmciaauth.name_farmacia,
                    },
                    date: new Date()
                },
                43800
            )
        ]);
        return [
            {
                token_access,
                token_refresh,
            },
            null
        ];
    }
}