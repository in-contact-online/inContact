import UseCaseBase from './UseCaseBase.mjs';
import { UserMessages, UserTrackPhones, User } from '../models/index.mjs';

export class AddPhoneOnlineNotify extends UseCaseBase {
    static validationRules = {
        userId: ['required', 'positive_integer'],
        chatId: ['required', 'positive_integer'],
    };

    async execute(params) {
        await new User().update(params);
        const trackedContacts = await new UserTrackPhones().listTracked(params);

        if (trackedContacts.length > 0) {
            await new UserTrackPhones().markAsNotified(params);
            const phoneNumbers = trackedContacts.map(contact => contact.tracked_phone);
            return UserMessages.notifyYouWhenTrackedOnline(phoneNumbers);
        }
        return UserMessages.noTrackingMessage();
    }
}
