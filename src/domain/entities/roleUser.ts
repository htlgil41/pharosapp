import { InvalidIdExceptionDomain } from "../exceptions/invalidId.ts";
import type { RoleUser } from "../interfaces/usuarios.ts";
import type { EntityPrimitive } from "../primitiveEntity.ts";

export class RoleUserEntity implements EntityPrimitive<RoleUser> {
    
    constructor(
        private role: RoleUser
    ){

        if (this.role.id <= 0) throw new InvalidIdExceptionDomain();
    }

    static build(role: RoleUser): RoleUserEntity{
        return new RoleUserEntity(role);
    }

    setId(id: number): void {
        if(id <= 0) throw new InvalidIdExceptionDomain();
        this.role.id = id;
    }

    toValue(): RoleUser {
        return this.role;
    }
}