import joi from 'joi';
import { NameApeJoi, NumbrePositive, ParamEmptyString, ParamNotEmptyString, PassWordJoi, UsernameJoi } from './validates.ts';
import type { AuthLoginIUnterface, NewUserInterface, SwitchMpLoginInterface } from './interfaces/newuser.ts';


export const AutLobinValidateJoi = joi.object<AuthLoginIUnterface>({
    username: UsernameJoi
        .required(),
    password: PassWordJoi
        .required(),
    farmacia_auth: joi.object<{
        id_farmacia: number;
        farmacia: string;
    }>({
        farmacia: ParamNotEmptyString
            .max(100),
        id_farmacia: NumbrePositive
        .required()
    }).required()
})
.required();

export const SwitchMpLoginJoi = joi.object<SwitchMpLoginInterface>({
    id_farmacia: NumbrePositive
    .required()
}).required();

export const NewUserValidateJoi = joi.object<NewUserInterface>({
    id_role: NumbrePositive
        .required(),
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