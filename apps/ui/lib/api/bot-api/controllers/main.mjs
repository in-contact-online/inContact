import { makeRequestHandler } from '../../utils/index.mjs';
import {
    RegisterAndStart,
    EditUsersTrackingMenu,
    UserStopTrackingPhone,
    AddTrackingPhone,
    UserLeaveChat,
    UserRestartChat,
    AddPhoneOnlineNotify,
    AddEmail,
    UnknownMessage,
} from '../../../usecases/index.mjs';

export const main = {
    help: makeRequestHandler(
        RegisterAndStart,
        (req) => ({
            firstName: req.from.first_name,
            lastName: req.from.last_name,
            userId: req.from.id,
            idBot: req.from.is_bot,
            chatId: req.chat.id,
        }),
        (result, res, req) => {
            const chatId = req.chat.id;
            res.sendMessage(chatId, result, { parse_mode: 'HTML' });
        }
    ),
    editTrackingMenu: makeRequestHandler(
        EditUsersTrackingMenu,
        (req) => ({
            firstName: req.from.first_name,
            lastName: req.from.last_name,
            userId: req.from.id,
        }),
        (result, res, req) => {
            const chatId = req.chat.id;
            if (result.payload.length) {
                res.sendMessage(chatId, result.text, { reply_markup: result.payload, parse_mode: 'HTML' });
            } else {
                res.sendMessage(chatId, result.text, { parse_mode: 'HTML' });
            }
        }
    ),
    stopTracking: makeRequestHandler(
        UserStopTrackingPhone,
        (req) => ({
            userId: req.from.id,
            data: req.data,
        }),
        (result, res, req) => {
            res.editMessageReplyMarkup(result.payload, {
                chat_id: req.message.chat.id,
                message_id: req.message.message_id,
            });
            res.answerCallbackQuery(req.id, { text: result.text, show_alert: true });
        }
    ),
    leaveChat: makeRequestHandler(
        UserLeaveChat,
        (req) => ({
            userId: req.from.id,
        }),
        () => {}
    ),
    restartChat: makeRequestHandler(
        UserRestartChat,
        (req) => ({
            userId: req.from.id,
        }),
        () => {}
    ),
    trackPhone: makeRequestHandler(
        AddTrackingPhone,
        (req) => ({
            trackedPhone: req.text,
            userId: req.from.id,
            chatId: req.chat.id,
        }),
        (result, res, req) => {
            const chatId = req.chat.id;
            res.sendMessage(chatId, result, { parse_mode: 'HTML' });
        }
    ),
    addEmail: makeRequestHandler(
        AddEmail,
        (req) => ({
            chatId: req.chat.id,
            userId: req.from.id,
            email: req.text,
        }),
        (result, res, req) => {
            const chatId = req.chat.id;
            res.sendMessage(chatId, result, { parse_mode: 'HTML' });
        }
    ),
    notifyOnline: makeRequestHandler(
        AddPhoneOnlineNotify,
        (req) => ({
            userId: req.from.id,
            chatId: req.chat.id,
        }),
        (result, res, req) => {
            const chatId = req.chat.id;
            res.sendMessage(chatId, result, { parse_mode: 'HTML' });
        }
    ),
    unknown: makeRequestHandler(
        UnknownMessage,
        () => ({}),
        (result, res, req) => {
            const chatId = req.chat.id;
            res.sendMessage(chatId, result, { parse_mode: 'HTML' });
        }
    ),
};
