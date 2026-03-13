import joi from 'joi';

export const ParamaRif = joi.string()
    .trim()
    .pattern(new RegExp('^(j|J)-?\\d{8,9}(?:[-]?\d)?$'))

export const NameApeJoi = joi.string()
    .lowercase()
    .trim()
    .min(3)
    .pattern(new RegExp('^[a-z]+$'))

export const NumberPositive = joi.number()
    .min(1)
    .message("El valor debe ser positivo");

export const NumberPositiveParam = joi.string()
    .pattern(new RegExp('^[0-9]+$'))
    .message("El valor debe ser positivo");

export const ParamEmptyString = joi.string()
    .trim()
    .optional();

export const ParamNotEmptyString = joi.string()
    .trim()
    .lowercase()
    .required();

export const UsernameJoi = joi.string()
    .trim()
    .lowercase()
    .pattern(new RegExp('^[a-z0-9._]{4,25}$'))
    .message("El username debe ser un nombre valido entre 4 y 25 caracteres");

export const PassWordJoi = joi.string()
    .trim()
    .message("Debe ser segura");