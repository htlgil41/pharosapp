import joi from 'joi';
import type { CreateCajaFarmacia, SearchParamLikeOnly, UsuarioByIdParam } from "./interfaces/farmacia.ts";
import { NumberPositive, NumberPositiveParam, ParamNotEmptyString } from "./validates.ts";

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