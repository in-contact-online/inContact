import UseCaseBase from './UseCaseBase.mjs';
import { UserMessages, UserTrackPhones } from '../models/index.mjs';
import { BOT_COMMAND_UI } from '../system/index.mjs'

export class EditUsersTrackingMenu extends UseCaseBase {
    static validationRules = {
        firstName: ['string'],
        lastName: ['string'],
        userId: ['required', 'positive_integer'],
        idBot: ['boolean'],
    };

    async execute(params) {
        const trackedPhones = await (new UserTrackPhones()).listTracked(params);
        const paylaodKeyboard = trackedPhones.map(item => [{text: item.tracked_phone, callback_data: `${BOT_COMMAND_UI.STOP_TRACK_PHONE}:${item.tracked_phone}`}])

        return { 
            text: trackedPhones.length ? UserMessages.editTrackingMessage() : UserMessages.noTrackingMessage(),
            payload: JSON.stringify({ inline_keyboard: paylaodKeyboard })
        };
    }
}
