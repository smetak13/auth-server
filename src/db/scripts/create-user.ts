import db from '../../library/db';
import { TABLE_PREFIX, TABLE_NAME, CLOG_COLORS } from '../../consts';
import { hashPassword } from '../../library/utils/auth-utils';

(async function createUser() {
    try {
        const args = process.argv.slice(2);

        if (args.length < 2) {
            throw new Error('Bad request');
        }

        const username = args[0];
        const password = args[1];
        const firstName = args[2] || '';
        const lastName = args[3] || '';

        const hashedPwd = await hashPassword(password);

        const result = await db.one(
            `INSERT INTO ${TABLE_PREFIX}${TABLE_NAME.USERS} (username, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, username, first_name, last_name`,
            [username, hashedPwd, firstName, lastName]
        );

        console.log(result);
        console.log(CLOG_COLORS.fgGreen + 'User was succesfully created' + CLOG_COLORS.reset);
    } catch (e) {
        console.log(CLOG_COLORS.fgRed + e.toString() + CLOG_COLORS.reset);
    } finally {
        process.exit();
    }
})();
