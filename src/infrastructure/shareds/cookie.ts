import cookie from 'cookie';
import { LoadEnvWithExceptions, LoadEnvWithVoid } from './loadEnvWith.ts';

const CookiSetHeaders = (
    timeSecondCookie: number,
    nameCookie: string,
    valueCookie: string
): string => {

    return cookie.serialize(
        nameCookie,
        valueCookie,
        {
            domain: LoadEnvWithVoid('MODE_DEV') ? undefined : LoadEnvWithExceptions('DOMAIN_COOKIE'),
            httpOnly: true,
            path: '/',
            sameSite: 'lax',
            secure: false,
            maxAge: 60000 * timeSecondCookie
        }
    )
}

const CookieParse = (
    cookieReq: string,
    nameCookie: string
) => {

    return cookie.parse(cookieReq ?? '')[nameCookie];
}