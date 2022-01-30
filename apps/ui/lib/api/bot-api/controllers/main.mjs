import { makeRequestHandler } from '../../utils/index.mjs';
import { RegisterAndStart, EditUsersTrackingMenu } from '../../../usecases/index.mjs'

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
            res.sendMessage(chatId, JSON.stringify(result), { parse_mode: 'HTML' });
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
    // trackPhone: makeRequestHandler(
    //     AddSubscriptions,
    //     (req) => ({
    //         id: req.id,
    //     }),
    //     (result, res, req) => {
    //         const chatId = req.chat.id;
    //         res.sendMessage(chatId, JSON.stringify(result));
    //     }
    // ),
    // stopTracking: makeRequestHandler(
    //     DeleteSubscriptions,
    //     (req) => ({
    //         jsonrpc: req.jsonrpc,
    //         id: req.id,
    //     }),
    //     (result, res, req) => {
    //         const chatId = req.chat.id;
    //         res.sendMessage(chatId, JSON.stringify(result));
    //     }
    // ),
}
