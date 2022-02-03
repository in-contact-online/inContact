import { createRepository } from '@rtls-platform/repository/index.mjs';
import { createLogger, LoggerTypes } from '@rtls-platform/logger/index.mjs';
import * as App from './lib/api/index.mjs';
import * as DataScanner from './lib/api/scanner/app.mjs';
import * as ConfigContainer from './lib/config.cjs';
import { createPgDbConnection } from './lib/db/index.mjs';
import ModelBase from './lib/models/ModelBase.mjs';


// Init Logger
const logger = createLogger({
    type: LoggerTypes.Winston,
    context: {
        logLevel: ConfigContainer.config.logLevel,
        serviceName: ConfigContainer.config.serviceName,
    },
});
App.setLogger(logger);

// Init Repository Layer
const repository = createRepository({
    db: createPgDbConnection({
        port: ConfigContainer.config.db.port,
        host: ConfigContainer.config.db.host,
        user: ConfigContainer.config.db.user,
        database: ConfigContainer.config.db.database,
        password: ConfigContainer.config.db.password,
        connectionsLimit: ConfigContainer.config.db.connectionsLimit
    })
});

// Init Domain Model Layer
ModelBase.setRepository(repository);

// Init Controllers Layer (API)
DataScanner.start(ConfigContainer.config.service);

// Add Global Unhandled Errors Handlers
async function exit() {
    await DataScanner.stop();
    logger.info('Exit');

    process.exit(0);
}

process.on('SIGTERM', async () => {
    logger.error('SIGTERM signal caught');
    await exit();
});

process.on('SIGINT', async () => {
    logger.error('SIGINT signal caught');
    await exit();
});

process.on('unhandledRejection', (error) => {
    logger.error('unhandledRejection', error.stack);
});

process.on('uncaughtException', (error) => {
    logger.error('uncaughtException', error.stack);
});