import joi from 'joi';
import type { CreateCajaFarmacia, CreateFarmacia, SearchParamLikeOnly, UsuarioByIdParam } from "./interfaces/farmacia.ts";
import { NumberPositive, NumberPositiveParam, ParamaRif, ParamNotEmptyString } from "./validates.ts";

export const CreateFarmaciaValidateJoi = joi.object<CreateFarmacia>({
    name_farmacia: ParamNotEmptyString
        .pattern(new RegExp('^[a-z\\s]+$'))
        .required(),
    direccion: ParamNotEmptyString
        .pattern(new RegExp('^[a-z0-9.\\-_\\s]+$'))
        .required(),
    rif: ParamaRif
        .required(),
    some_code: ParamNotEmptyString
        .pattern(new RegExp('^[0-9]{4}$'))
        .required(),
}).required();

export const UsuarioParamByIdValidateJoi = joi.object<UsuarioByIdParam>({
    id: NumberPositiveParam
        .required(),
})
.required();

export const FarmaciaLikeValidateJoi = joi.object<SearchParamLikeOnly>({
    search: ParamNotEmptyString
        .pattern(new RegExp('^[a-z]+$')),
})
.required();

export const CreateCajaFarmaciaValidateJoi = joi.object<CreateCajaFarmacia>({
    area: ParamNotEmptyString
        .pattern(new RegExp('^[a-z]+$')),
    nmCaja: NumberPositive
        .required()
}).required();

export const AsigneUsuarioFarmaciaValidateJoi = joi.object<UsuarioByIdParam>({
    id: NumberPositive
        .required(),
})
.required();

