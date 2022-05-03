import { Client, ClientsPool, Session } from '../models/index.mjs';
import { readDir, readSqlite } from '../utils/index.mjs';
import * as ConfigContainer from '../config.cjs';

export class UpdateSessions {
    async execute() {
        const sessionFiles = await readDir(ConfigContainer.config.service.sessionsFolder, '.session');
        const newSessions = [];

        for (const sessionFile of sessionFiles) {
            const sessionId = sessionFile.match(/([^/]*)\.session/)[1];

            const { dc_id: dcId, server_address: serverAddress, port, auth_key: authKey } = await readSqlite(
                sessionFile,
                'sessions'
            );

            let session = await new Session().readBySessionId({ sessionId });

            if (!session) {
                const newSession = await new Session().save({ sessionId, dcId, serverAddress, port, authKey });
                const client = new Client(newSession, ConfigContainer.config.service);
                if (ClientsPool.pool) ClientsPool.addClient(client);
                newSessions.push(newSession);
            }
        }

        return newSessions;
    }
}
