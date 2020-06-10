import ms from 'ms';
import { ACCESS_TOKEN_EXP, REFRESH_TOKEN_EXP, IS_PRODUCTION } from '../../consts';

interface CookieOptions {
    httpOnly: boolean;
    secure: boolean;
    signed: boolean;
    sameSite: boolean;
    maxAge?: number;
}

const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: IS_PRODUCTION,
    signed: true,
    sameSite: true,
};

export const accessCookieOptions = { ...cookieOptions, maxAge: ms(ACCESS_TOKEN_EXP) };
export const refreshCookieOptions = { ...cookieOptions, maxAge: ms(REFRESH_TOKEN_EXP) };
