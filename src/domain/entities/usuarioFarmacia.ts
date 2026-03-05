import { InvalidIdExceptionDomain } from "../exceptions/invalidId.ts";
import { PasswordNoHashExceptionDomain } from "../exceptions/passwordNoHash.ts";
import type { UsuarioByFarmacia } from "../interfaces/usuarios.ts";
import { EntityPrimitive } from "../primitiveEntity.ts";

export class UsuarioByFarmaciaEntity implements EntityPrimitive<UsuarioByFarmacia>{

    constructor(
        private usuairoFarmacia: UsuarioByFarmacia
    ){

        if (
            this.usuairoFarmacia.id <= 0 ||
            this.usuairoFarmacia.id_farmacia <= 0 ||
            (
                this.usuairoFarmacia.usuario.id_role &&
                this.usuairoFarmacia.usuario.id_role <= 0
            )
        ) throw new InvalidIdExceptionDomain();
        if (
            !/^\$2[ayb]\$[0-9]{2}\$[./A-Za-z0-9]{53}$/.test(
                this.usuairoFarmacia.usuario.password
            )
        ) throw new PasswordNoHashExceptionDomain();
    }

    static build(usuairoFarmacia: UsuarioByFarmacia): UsuarioByFarmaciaEntity {
        return new UsuarioByFarmaciaEntity(usuairoFarmacia);
    }

    toValue(): UsuarioByFarmacia {
        
        return this.usuairoFarmacia;
    }
}