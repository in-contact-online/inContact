import { makeRequestHandler } from '../../utils/index.mjs';
import { RegisterAndStart } from '../../../usecases/index.mjs'

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
    // editTracking: makeRequestHandler(
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
