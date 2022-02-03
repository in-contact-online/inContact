import UseCaseBase from './UseCaseBase.mjs';
import { UserMessages, UserTrackPhones } from '../models/index.mjs';
import { Phone } from '../models/index.mjs';
import { COUNTRIES } from '../system/constants.mjs';

export class AddTrackingPhone extends UseCaseBase {
    static validationRules = {
        phone: ['string'],
        userId: ['required', 'positive_integer'],
    };

    async execute(params) {
        params.phone = new Phone(params.phone, COUNTRIES).validated.phoneNumber;

        const userTrackPhones = new UserTrackPhones();
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
