import getPgp from 'pg-promise';
import { dbConfig } from '../db/config/dbConfig';

const pgp = getPgp();

const db = pgp(dbConfig);

export default db;
