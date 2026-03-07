import joi from 'joi';

export const NameApeJoi = joi.string()
    .lowercase()
    .trim()
    .min(3)
    .pattern(new RegExp('^[a-z]+$'))
export const NumbrePositive = joi.number()
    .min(1)
    .message("El valor debe ser positivo")
export const UsernameJoi = joi.string()
    .trim()
    .lowercase()
    .pattern(new RegExp('^[a-z0-9._]{4,25}$'))
    .message("El username debe ser un nombre valido entre 4 y 25 caracteres");
export const PassWordJoi = joi.string()
    .trim()
    .message("Debe ser segura");