export class RoleNotFoundExceptionUseCase extends Error {

    constructor(){
        super();
        this.message = 'No existe el role';
        this.cause = 'El usuario no puede pertenecer al rolo deseado ya que no especifica ninguna regla';
        this.name = '';
    }
}