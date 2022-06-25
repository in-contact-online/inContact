import { BOT_COMMAND, BOT_COMMAND_UI } from '../../system/index.mjs';
import { isValidPhone } from './isValidPhone.mjs';
import { isValidEmail } from './isValidEmail.mjs';

export function getCommand(message) {
    const { text, data = '', new_chat_member = {} } = message;
    if (new_chat_member.status === 'kicked') return BOT_COMMAND.LEAVE_CHAT;
    if (new_chat_member.status === 'member') return BOT_COMMAND.RESTART_CHAT;
    if (isValidPhone(text)) return BOT_COMMAND.ADD_TRACK_PHONE;
    if (isValidEmail(text)) return BOT_COMMAND.ADD_EMAIL;
    if (text === BOT_COMMAND_UI.HELP || text === BOT_COMMAND_UI.START) return BOT_COMMAND.HELP;
    if (text === BOT_COMMAND_UI.EDIT_TRACK_PHONES) return BOT_COMMAND.EDIT_TRACK_PHONES_MENU;
    if (text === BOT_COMMAND_UI.NOTIFY_WHEN_ONLINE) return BOT_COMMAND.NOTIFY_WHEN_ONLINE;
    if (data.indexOf(BOT_COMMAND_UI.STOP_TRACK_PHONE) !== -1) return BOT_COMMAND.STOP_TRACK_PHONE;

    return undefined;
}
