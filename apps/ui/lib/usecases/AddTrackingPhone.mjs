import UseCaseBase from './UseCaseBase.mjs';
import { UserMessages, UserTrackPhones } from '../models/index.mjs';
import { BOT_COMMAND_UI } from '../system/index.mjs';

export class AddTrackingPhone extends UseCaseBase {
    static validationRules = {
        phone: ['string'],
        userId: ['required', 'positive_integer'],
    };

    async execute(params) {
        const userTrackPhones = new UserTrackPhones();

        if (params.phone === BOT_COMMAND_UI.ADD_TRACK_PHONE) return UserMessages.welcomeAddingMessage();

        const trackedPhone = await userTrackPhones.readByPhone(params);
        let result;

        if (!trackedPhone) {
            await userTrackPhones.save(params);
            result = UserMessages.phoneStartTrackingMessage(params.phone);
        } else if (trackedPhone.tracked) {
            result = UserMessages.dublicatePhoneMessage(params.phone);
        } else {
            await userTrackPhones.activate(params);
            result = UserMessages.phoneActivateTrackingMessage(params.phone);
        }
        
        return result;
    }
}
