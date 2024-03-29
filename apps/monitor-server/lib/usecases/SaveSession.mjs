import { readSqlite, createTempFile } from '../utils/index.mjs';
import { Session, ValidationError } from '../models/index.mjs';
import UseCaseBase from './UseCaseBase.mjs';

export class SaveSession extends UseCaseBase {
    static validationRules = {
        file: [
            'required',
            {
                nested_object: {
                    originalname: ['required', 'string'],
                    buffer: ['required'],
                },
            },
        ],
    };

    async execute(params) {
        const tmpFile = await createTempFile(params.file.buffer);
        const result = await readSqlite(tmpFile);
        const sessionId = params.file.originalname.match(/([^/]*)\.session/)[1];

        const existedSession = await new Session().readById({ sessionId: params.sessionId });
        if (existedSession) {
            throw new ValidationError('Session already exist');
        }

        await new Session().save({
            sessionId,
            dcId: result.dcId,
            serverAddress: result.serverAddress,
            port: result.port,
            authKey: result.authKey,
        });

        return new Session().readById({ sessionId: params.sessionId });
    }
}
