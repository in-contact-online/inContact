import { BOT_COMMAND, BOT_COMMAND_UI } from '../../system/index.mjs';

function isPhoneNumber(text) {
    return /^\+(380[0-9]{9}|7[0-9]{10})$/.test(text);
}

export function getCommand(message) {
    const { text, data } = message;
    if (isPhoneNumber(text) || text === BOT_COMMAND_UI.ADD_TRACK_PHONE) return BOT_COMMAND.ADD_TRACK_PHONE;
    if (text === BOT_COMMAND_UI.START) return BOT_COMMAND.START;
    if (text === BOT_COMMAND_UI.EDIT_TRACK_PHONES) return BOT_COMMAND.EDIT_TRACK_PHONES_MENU;
    if (text === BOT_COMMAND_UI.GET_TRACK_STATUS) return BOT_COMMAND.GET_TRACK_STATUS;
    if (data && data.indexOf(BOT_COMMAND_UI.STOP_TRACK_PHONE) !== -1) return BOT_COMMAND.STOP_TRACK_PHONE;

    return undefined;
}
