import UseCaseBase from './UseCaseBase.mjs';
import { UserMessages, UserTrackPhones } from '../models/index.mjs';

export class AddPhoneOnlineNotify extends UseCaseBase {
    static validationRules = {
        userId: ['required', 'positive_integer'],
    };

    async execute(params) {
        await new UserTrackPhones().markAsNotified(params);

        return UserMessages.notifyYouWhenTrackedOnline();
    }
}
