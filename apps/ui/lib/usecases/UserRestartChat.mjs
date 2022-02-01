import UseCaseBase from './UseCaseBase.mjs';
import { User } from '../models/index.mjs';

export class UserRestartChat extends UseCaseBase {
    static validationRules = {
        userId: ['required', 'positive_integer'],
    };

    async execute(params) {
        await new User().update({ ...params, active: true });
    }
}
