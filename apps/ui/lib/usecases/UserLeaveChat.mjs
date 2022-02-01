import UseCaseBase from './UseCaseBase.mjs';
import { User, UserTrackPhones } from '../models/index.mjs';

export class UserLeaveChat extends UseCaseBase {
    static validationRules = {
        userId: ['required', 'positive_integer'],
    };

    async execute(params) {
        await new UserTrackPhones().deactivateAll(params);
        await new User().update({ ...params, active: false });
    }
}
