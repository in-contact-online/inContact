import { Session } from '../models/index.mjs';
import UseCaseBase from './UseCaseBase.mjs';

export class SaveSession extends UseCaseBase {
    static validationRules = {
        sessionId: ['required', 'integer'],
        authKey: [{
            nested_object: {
                type: ['string', 'required'],
                data: ['required'],
            }
        }, 'required'],
        dcId: ['required', 'string'],
        serverAddress: ['required', 'string'],
        port: ['required', 'integer'],
    };

    async execute(params) {
        const authKey = Buffer.from(params.authKey.data);
        await new Session().save({ ...params, authKey });
        return new Session().readById({ sessionId: params.sessionId });
    }
}

