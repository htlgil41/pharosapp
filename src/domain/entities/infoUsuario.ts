import { InvalidIdExceptionDomain } from "../exceptions/invalidId.ts";
import { PasswordNoHashExceptionDomain } from "../exceptions/passwordNoHash.ts";
import type { InfoUser } from "../interfaces/usuarios.ts";
import { EntityPrimitive } from "../primitiveEntity.ts";

export class InfoUsuarioEntity implements EntityPrimitive<InfoUser>{

    constructor(
        private infoUsuario: InfoUser
    ){

        if (
            this.infoUsuario.id <= 0 ||
            (
                this.infoUsuario.id_role &&
                this.infoUsuario.id_role <= 0
            )
        ) throw new InvalidIdExceptionDomain();
        if (
            !/^\$2[ayb]\$[0-9]{2}\$[./A-Za-z0-9]{53}$/.test(
                this.infoUsuario.password
            )
        ) throw new PasswordNoHashExceptionDomain();
    }

    static build(infoUsuario: InfoUser): InfoUsuarioEntity{

        return new InfoUsuarioEntity(infoUsuario);
    }

    setId(id: number): void{

        if (id <= 0) return;
        this.infoUsuario.id = id;
    }

    toValue(): InfoUser {
        
        return this.infoUsuario;
    }
}