import { Session } from '../../../models/index.mjs';
import { readDir, readSqlite } from '../../../utils/index.mjs';
import * as ConfigContainer from '../../../config.cjs';

export class UpdateSessions {
    async execute(params) {
        const sessionFiles = await readDir(ConfigContainer.config.service.sessionsFolder, '.session');
        const newSessions = [];

        for (const sessionFile of sessionFiles) {
            const phone = sessionFile.match(/([^/]*)\.session/)[1];

            const { dc_id: dcId, server_address: serverAddress, port, auth_key: authKey } = await readSqlite(
                sessionFile,
                'sessions'
            );

            const session = new Session();

            const sessionByPhone = await session.readByPhone({ phone });

            if (!sessionByPhone) {
                await session.save({ phone, dcId, serverAddress, port, authKey });
                newSessions.push(await session.readByPhone({ phone }));
            }
        }

        return newSessions;
    }
}
