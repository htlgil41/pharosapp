import joi from 'joi';
import { PassWordJoi, UsernameJoi } from './validates.ts';


export const AutLobinValidateJoi = joi.object({
    username: UsernameJoi,
    password: PassWordJoi
});