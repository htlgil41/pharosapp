import joi from 'joi';
import type { SearchParamLikeOnly, UsuarioByIdParam } from "./interfaces/farmacia.ts";
import { NumbrePositiveParam, ParamNotEmptyString } from "./validates.ts";

export const UsuarioParamByIdValidateJoi = joi.object<UsuarioByIdParam>({
    id: NumbrePositiveParam
        .required(),
})
.required();

export const FarmaciaLikeValidateJoi = joi.object<SearchParamLikeOnly>({
    search: ParamNotEmptyString
        .pattern(new RegExp('^[a-z]+$'))
        .required(),
})
.required();
