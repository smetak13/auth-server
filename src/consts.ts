import dotenv from 'dotenv';
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';

export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

export const IS_PRODUCTION = /production/i.test(NODE_ENV);

export const APP_CLIENT_ORIGIN = process.env.APP_CLIENT_ORIGIN || 'http://localhost:3000';

export const API_ROUTE_PREFIX = '/api';

export const ROUTE_PREFIX = {
    AUTH: '/auth',
    USER: '/user',
};

export const API_ROUTE = {
    AUTH: {
        SIGNUP: '/signup',
        LOGIN: '/login',
        TOKEN: '/token',
        PING: '/ping',
    },
};

export const TABLE_PREFIX = 'auth_server_';

export const TABLE_NAME = {
    USERS: 'users',
};

export const BCRYPT_SALT_ROUNDS = 10;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '';
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '';
export const COOKIE_SECRET = process.env.COOKIE_SECRET || '';

export const ACCESS_TOKEN_EXP = process.env.ACCESS_TOKEN_EXP || '1h';
export const REFRESH_TOKEN_EXP = process.env.REFRESH_TOKEN_EXP || '2h';

export const ACCESS_TOKEN_COOKIE = 'access_token';
export const REFRESH_TOKEN_COOKIE = 'refresh_token';

export const CLOG_COLORS = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',

    fgBlack: '\x1b[30m',
    fgRed: '\x1b[31m',
    fgGreen: '\x1b[32m',
    fgYellow: '\x1b[33m',
    fgBlue: '\x1b[34m',
    fgWhite: '\x1b[37m',

    bgBlack: '\x1b[40m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    bgWhite: '\x1b[47m',
};
