import DBMigrate from 'db-migrate';

const __dirname = new URL('.', import.meta.url).pathname;

export function dbUpgrade(environment = process.env.NODE_ENV, dbConfigFile = './lib/db/database.json') {
    const dbMigrate = DBMigrate.getInstance(true, { cwd: __dirname, config: dbConfigFile, env: environment });
    return dbMigrate.up(undefined, undefined);
}
