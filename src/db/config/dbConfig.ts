import dotenv from 'dotenv';

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

export interface DbConfig {
    user: any;
    password: any;
    host: any;
    port: any;
    database: any;
}

export const dbConfig: DbConfig = {
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
};
