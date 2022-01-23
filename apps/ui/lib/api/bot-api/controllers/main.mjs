import { makeRequestHandler } from '../../utils';
import { AddSubscriptions, GetSubscriptions, DeleteSubscriptions } from '../../../usecases'

export const main = {
    get: makeRequestHandler(
        GetSubscriptions,
        (req) => ({
            jsonrpc: req.jsonrpc,
        }),
        (result, res, req) => {
            const chatId = req.chat.id;
            res.sendMessage(chatId, JSON.stringify(result));
        }
    ),
    add: makeRequestHandler(
        AddSubscriptions,
        (req) => ({
            id: req.id,
        }),
        (result, res, req) => {
            const chatId = req.chat.id;
            res.sendMessage(chatId, JSON.stringify(result));
        }
    ),
    del: makeRequestHandler(
        DeleteSubscriptions,
        (req) => ({
            jsonrpc: req.jsonrpc,
            id: req.id,
        }),
        (result, res, req) => {
            const chatId = req.chat.id;
            res.sendMessage(chatId, JSON.stringify(result));
        }
    ),
}
