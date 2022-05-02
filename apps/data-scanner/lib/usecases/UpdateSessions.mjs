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

            const session = new Session().readBySessionId({ sessionId });

            if (!session) {
                await session.save({ sessionId, dcId, serverAddress, port, authKey });
                newSessions.push(await session.readBySessionId({ sessionId }));
                if (ClientsPool.pool) ClientsPool.addClient(new Client(session, ConfigContainer.config.service));
            }
        }

        return newSessions;
    }
}
