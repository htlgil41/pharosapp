import joi from 'joi';

export const NameApeJoi = joi.string()
    .lowercase()
    .min(3)
    .pattern(/^[a-z]+$/gm)
export const NumbrePositive = joi.number()
    .min(1)
    .message("El valor debe ser positivo")
export const UsernameJoi = joi.string()
    .lowercase()
    .min(4)
    .max(25)
    .pattern(/^[a-z0-9._]{4,25}$/gm)
    .message("El username debe ser un nombre valido entre 4 y 25 caracteres");
export const PassWordJoi = joi.string()
    .min(8)
    .message("Debe ser segura");