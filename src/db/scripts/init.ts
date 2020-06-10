import path from 'path';
import rdlsnc from 'readline-sync';
import dotenv from 'dotenv';
import { QueryFile } from 'pg-promise';
import db from '../../library/db';
import { IS_PRODUCTION, CLOG_COLORS } from '../../consts';

dotenv.config();

class Init {
    public async verify() {
        const args = process.argv.slice(2);
        const isForce = args.includes('force');

        if (IS_PRODUCTION && !isForce) {
            console.log(
                CLOG_COLORS.fgRed +
                    `This script is not intended to be run in production environment!${CLOG_COLORS.reset}\nRun ${CLOG_COLORS.bgWhite}${CLOG_COLORS.fgBlack}npm run init force${CLOG_COLORS.reset} to override`
            );
        } else {
            const shouldProceed =
                rdlsnc.question(
                    CLOG_COLORS.fgRed +
                        'This will erase all data in the db, do you really want to proceed? [y/n] ' +
                        CLOG_COLORS.reset
                ) === 'y';

            if (shouldProceed) {
                const files = [
                    'db-schema.sql',
                    //  `${NODE_ENV}.sql`
                ];
                await files.reduce(async (acc, cur) => {
                    await acc;
                    await Promise.resolve(this._runScript(cur));
                }, Promise.resolve());
                console.log(CLOG_COLORS.fgGreen + 'Query run succesfully' + CLOG_COLORS.reset);
                process.exit();
            } else {
                console.log('Aborted!');
            }
        }
    }

    protected async _runScript(file: string) {
        try {
            const query = await this._getQueryFile(file);
            await db.query(query);
            console.log(CLOG_COLORS.dim + query + CLOG_COLORS.reset);
        } catch (e) {
            console.log(CLOG_COLORS.fgRed + e.toString() + CLOG_COLORS.reset);
        }
    }

    private async _getQueryFile(file: string) {
        const filePath = path.join(__dirname, `../../../src/db/data/${file}`);
        return new QueryFile(filePath);
    }
}

new Init().verify();
