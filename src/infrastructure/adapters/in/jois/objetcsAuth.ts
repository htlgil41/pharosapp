import joi from 'joi';
import { NameApeJoi, NumberPositive, ParamEmptyString, ParamNotEmptyString, PassWordJoi, UsernameJoi } from './validates.ts';
import type { AuthLoginIUnterface, NewUserInterface, SwitchMpLoginInterface, UpdateRoleUsuarioInterface } from './interfaces/user.ts';


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
        id_farmacia: NumberPositive
        .required()
    }).required()
})
.required();

export const SwitchMpLoginJoi = joi.object<SwitchMpLoginInterface>({
    id_farmacia: NumberPositive
    .required()
}).required();

export const NewUserValidateJoi = joi.object<NewUserInterface>({
    id_role: NumberPositive
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

export const UpdateRoleUsuarioValidateJoi = joi.object<UpdateRoleUsuarioInterface>({
    id_role: NumberPositive
        .required(),
    id_usuario: NumberPositive
        .required()
}).required();