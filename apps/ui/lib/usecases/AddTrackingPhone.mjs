import UseCaseBase from './UseCaseBase.mjs';
import { UserMessages, UserTrackPhones } from '../models/index.mjs';
import { isTrackedPhone } from '../utils';
import { BOT_COMMAND_UI } from '../system/index.mjs';

export class AddTrackingPhone extends UseCaseBase {
    static validationRules = {
        phone: ['string'],
        userId: ['required', 'positive_integer'],
    };

    async execute(params) {
        const userTrackPhones = new UserTrackPhones();

        if (params.phone === BOT_COMMAND_UI.ADD_TRACK_PHONE) return UserMessages.welcomeAddingMessage();

        const trackedPhones = (await userTrackPhones.listTracked(params)).map((item) => item.tracked_phone);
        const allPhones = (await userTrackPhones.listAll(params)).map((item) => item.tracked_phone);
        const isTracked = isTrackedPhone(params.phone, trackedPhones, allPhones);

        switch (isTracked) {
            case 'TRACKED':
                return UserMessages.dublicatePhone(params.phone);
            case 'NOT_TRACKED':
                await userTrackPhones.activate(params);
                return UserMessages.phoneActivateTracking(params.phone);
            case 'NOT_IN_DB':
                await userTrackPhones.save(params);
                return UserMessages.phoneStartTracking(params.phone);
        }
    }
}
