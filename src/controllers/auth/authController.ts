import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import db from '../../library/db';
import {
    TABLE_PREFIX,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_COOKIE,
    REFRESH_TOKEN_COOKIE,
    TABLE_NAME,
} from '../../consts';
import {
    isRequestValid,
    doesUsernameExist,
    hashPassword,
    isPasswordValid,
    generateAccessToken,
    generateRefreshToken,
} from '../../library/utils/auth-utils';
import { accessCookieOptions, refreshCookieOptions } from '../../library/utils/cookie-utils';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!isRequestValid(req.body)) {
            res.status(400);
            throw new Error('Please fill all the missing fields.');
        }

        if (await doesUsernameExist(req.body)) {
            res.status(400);
            throw new Error('Username already exists.');
        }

        const hashedPwd = await hashPassword(req.body.password);

        const user = { ...req.body, password: hashedPwd };

        const result = await db.one(
            `INSERT INTO ${TABLE_PREFIX}${TABLE_NAME.USERS} (username, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, username, first_name, last_name`,
            [user.username, user.password, user.firstName, user.lastName]
        );

        res.json({
            message: '👍 🔐',
            result,
        });
    } catch (e) {
        next(e);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!isRequestValid(req.body)) {
            res.status(400);
            throw new Error('Please fill all the missing fields.');
        }

        const user = await db.oneOrNone(
            `SELECT * FROM ${TABLE_PREFIX}${TABLE_NAME.USERS} WHERE username = $1`,
            req.body.username
        );

        if (!user) {
            res.status(404);
            throw new Error('User not found.');
        }

        if (!(await isPasswordValid(req.body.password, user.password))) {
            res.status(401);
            throw new Error('Invalid password.');
        }

        const accessToken = await generateAccessToken({ username: user.username });
        const refreshToken = await generateRefreshToken({ username: user.username });

        res.cookie(ACCESS_TOKEN_COOKIE, accessToken, accessCookieOptions);
        res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, refreshCookieOptions);

        const { id, username, first_name, last_name } = user;

        res.json({
            message: '👍 🔓',
            user: {
                id,
                username,
                first_name,
                last_name,
            },
        });
    } catch (e) {
        next(e);
    }
};

export const getAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.signedCookies[REFRESH_TOKEN_COOKIE];

        if (!refreshToken) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        try {
            const user: any = await jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
            const { username } = user;

            const accessToken = await generateAccessToken({ username });

            res.cookie(ACCESS_TOKEN_COOKIE, accessToken, accessCookieOptions);

            res.json({
                message: '👍',
            });
        } catch (e) {
            res.status(401);
            throw new Error('Refresh token expired');
        }
    } catch (e) {
        next(e);
    }
};

export const ping = (req: Request, res: Response, next: NextFunction) => {
    res.status(200);
    res.json({
        message: '👍',
    });
};
