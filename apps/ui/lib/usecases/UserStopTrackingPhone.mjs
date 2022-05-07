import UseCaseBase from './UseCaseBase.mjs';
import { UserMessages, UserTrackPhones } from '../models/index.mjs';
import { BOT_COMMAND_UI } from '../system/index.mjs';

export class UserStopTrackingPhone extends UseCaseBase {
    static validationRules = {
        data: ['required', 'string'],
        userId: ['required', 'positive_integer'],
    };

    async execute(params) {
        const index = params.data.indexOf(':');
        const trackedPhone = params.data.substring(index + 1);

        await new UserTrackPhones().deactivate({ ...params, trackedPhone });
        const trackedPhones = await new UserTrackPhones().listTracked(params);
        const paylaodKeyboard = trackedPhones.map((item) => [
            { text: item.tracked_phone, callback_data: `${BOT_COMMAND_UI.STOP_TRACK_PHONE}:${item.tracked_phone}` },
        ]);

        return {
            text: UserMessages.phoneStopTrackingMessage(trackedPhone),
            payload: { inline_keyboard: paylaodKeyboard },
        };
    }
}
