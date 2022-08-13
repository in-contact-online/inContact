import { Session } from '../models/index.mjs';
import UseCaseBase from './UseCaseBase.mjs';

export class RemoveSession extends UseCaseBase {
    static validationRules = {
        sessionId: ['required', 'integer'],
    };

    async execute(params) {
        await new Session().remove(params);
        return params;
    }
}
