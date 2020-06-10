import { Request, Response, NextFunction } from 'express';
import db from '../../library/db';
import { TABLE_PREFIX, TABLE_NAME } from '../../consts';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await db.any(`SELECT * FROM ${TABLE_PREFIX}${TABLE_NAME.USERS}`);
        res.json(result);
    } catch (e) {
        next(e);
    }
};
