import { BOT_COMMAND, BOT_COMMAND_UI, COUNTRIES } from '../../system/index.mjs';
import { PhoneNumberValidation } from '../../usecases/index.mjs';

export function getCommand(message) {
    const { text, data = '', new_chat_member = {} } = message;

    if (new_chat_member.status === 'kicked') return BOT_COMMAND.LEAVE_CHAT;
    if (new_chat_member.status === 'member') return BOT_COMMAND.RESTART_CHAT;
    if (PhoneNumberValidation.isValid(text, COUNTRIES)) return BOT_COMMAND.ADD_TRACK_PHONE;
    if (text === BOT_COMMAND_UI.ADD_TRACK_PHONE) return BOT_COMMAND.ADD_TRACK_PHONE_MENU;
    if (text === BOT_COMMAND_UI.START) return BOT_COMMAND.START;
    if (text === BOT_COMMAND_UI.EDIT_TRACK_PHONES) return BOT_COMMAND.EDIT_TRACK_PHONES_MENU;
    if (text === BOT_COMMAND_UI.GET_TRACK_STATUS) return BOT_COMMAND.GET_TRACK_STATUS;
    if (data.indexOf(BOT_COMMAND_UI.STOP_TRACK_PHONE) !== -1) return BOT_COMMAND.STOP_TRACK_PHONE;

    return undefined;
}
