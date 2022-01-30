import UseCaseBase from './UseCaseBase.mjs';
import { UserMessages, UserTrackPhones } from '../models/index.mjs';
import { BOT_COMMAND_UI } from '../system/index.mjs';

export class AddTrackingPhone extends UseCaseBase {
    static validationRules = {
        phone: ['string'],
        userId: ['required', 'positive_integer'],
    };

    async execute(params) {
        if (params.phone === BOT_COMMAND_UI.ADD_TRACK_PHONE) return UserMessages.welcomeAddingPhone();
        await new UserTrackPhones().save(params);
        return UserMessages.addTrackingPhone(params.phone);
    }
}
