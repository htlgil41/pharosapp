import cookie from 'cookie';

const CookiSetHeaders = (
    timeSecondCookie: number,
    nameCookie: string,
    valueCookie: string
): string => {

    return cookie.serialize(
        nameCookie,
        valueCookie,
        {
            domain: '',
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