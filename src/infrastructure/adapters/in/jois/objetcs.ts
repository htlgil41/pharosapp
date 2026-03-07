import joi from 'joi';
import { NameApeJoi, NumbrePositive, ParamEmptyString, PassWordJoi, UsernameJoi } from './validates.ts';
import type { NewUserInterface } from './interfaces/newuser.ts';


export const AutLobinValidateJoi = joi.object({
    username: UsernameJoi
        .required(),
    password: PassWordJoi
        .required()
})
.required();

export const NewUserValidateJoi = joi.object<NewUserInterface>({
    id_role: NumbrePositive
        .optional(),
    name_user: NameApeJoi
        .required(),
    ape: NameApeJoi
        .required(),
    username: UsernameJoi
        .required(),
    pass: PassWordJoi
        .required(),
    contact: ParamEmptyString,
}).required();