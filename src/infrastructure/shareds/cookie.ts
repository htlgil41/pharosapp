import cookie from 'cookie';
import { LoadEnvWithExceptions, LoadEnvWithVoid } from './loadEnvWith.ts';

export const CookiSetHeaders = (
    timeMinuteCookie: number,
    nameCookie: string,
    valueCookie: string
): string => {

    return cookie.serialize(
        nameCookie,
        valueCookie,
        {
            domain: LoadEnvWithVoid<string>('MODE_DEV').length === 0
                ? undefined 
                : LoadEnvWithExceptions<string>('DOMAIN_COOKIE'),
            httpOnly: true,
            path: '/',
            sameSite: 'lax',
            secure: false,
            maxAge:  60000 * timeMinuteCookie
        }
    )
}

export const CookieParse = (
    cookieReq: string
) => {

    return cookie.parse(cookieReq ?? '');
}