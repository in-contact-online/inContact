import path from 'path';
import DBMigrate from 'db-migrate';

const __dirname = new URL('.', import.meta.url).pathname;
const DB_FILE_DEFAULT = path.join(__dirname, './database.json');

export function runDBMigrations(environment = process.env.NODE_ENV, dbConfigFile = DB_FILE_DEFAULT) {
    const dbMigrate = DBMigrate.getInstance(true, { cwd: __dirname, config: dbConfigFile, env: environment });
    return dbMigrate.up(undefined, undefined);
}
