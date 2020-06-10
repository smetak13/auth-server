import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_COOKIE } from '../consts';

export const authorize = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.signedCookies[ACCESS_TOKEN_COOKIE];

        if (!token) {
            res.status(401);
            throw new Error('Access Denied');
        }

        try {
            await jwt.verify(token, ACCESS_TOKEN_SECRET);
            next();
        } catch (e) {
            res.status(401);
            throw new Error('Access token expired');
        }
    } catch (e) {
        next(e);
    }
};
