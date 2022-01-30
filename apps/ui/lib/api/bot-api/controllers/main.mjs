import { makeRequestHandler } from '../../utils/index.mjs';
import {
    RegisterAndStart,
    EditUsersTrackingMenu,
    UserStopTrackingPhone,
    AddTrackingPhone,
} from '../../../usecases/index.mjs';

export const main = {
    start: makeRequestHandler(
        RegisterAndStart,
        (req) => ({
            firstName: req.from.first_name,
            lastName: req.from.last_name,
            userId: req.from.id,
            idBot: req.from.is_bot,
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
            idBot: req.from.is_bot,
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

    trackPhone: makeRequestHandler(
        AddTrackingPhone,
        (req) => ({
            userId: req.from.id,
            phone: req.text,
        }),
        (result, res, req) => {
            const chatId = req.chat.id;
            res.sendMessage(chatId, result, { parse_mode: 'HTML' });
        }
    ),
    // quit: makeRequestHandler(
    //     GetSubscriptions,
    //     (req) => ({
    //         jsonrpc: req.jsonrpc,
    //     }),
    //     (result, res, req) => {
    //         const chatId = req.chat.id;
    //         res.sendMessage(chatId, JSON.stringify(result));
    //     }
    // ),
    // getStatus: makeRequestHandler(
    //     GetSubscriptions,
    //     (req) => ({
    //         jsonrpc: req.jsonrpc,
    //     }),
    //     (result, res, req) => {
    //         const chatId = req.chat.id;
    //         res.sendMessage(chatId, JSON.stringify(result));
    //     }
    // ),
    //
};
