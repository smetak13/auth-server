import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../db';
import {
    TABLE_PREFIX,
    BCRYPT_SALT_ROUNDS,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXP,
    REFRESH_TOKEN_EXP,
    TABLE_NAME,
} from '../../consts';

interface User {
    username: string;
    password: string;
}

export const isRequestValid = (user: User): boolean => {
    const validUsername = typeof user.username === 'string' && user.username.trim() !== '';
    const validPassword = typeof user.password === 'string' && user.password.trim() !== '';

    return validUsername && validPassword;
};

export const doesUsernameExist = async (user: User): Promise<boolean> => {
    const result = await db.oneOrNone(
        `SELECT * FROM ${TABLE_PREFIX}${TABLE_NAME.USERS} WHERE username = $1`,
        user.username
    );

    return !!result;
};

export const hashPassword = async (password: string): Promise<string> => {
    const hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    return hash;
};

export const isPasswordValid = async (pwd: string, hashedPwd: string): Promise<boolean> => {
    const result = await bcrypt.compare(pwd, hashedPwd);

    return result;
};

export const generateAccessToken = async (user: any) => {
    const token = await jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXP });

    return token;
};

export const generateRefreshToken = async (user: any) => {
    const token = await jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXP });

    return token;
};
