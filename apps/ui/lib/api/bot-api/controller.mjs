import * as Controllers from './controllers/index.mjs';
import { BOT_COMMAND } from '../../system/index.mjs';
import { getCommand } from '../utils/index.mjs';
import { UserMessages } from '../../models/index.mjs';

// Chain of responsibilities pattern. If error occurs in one of the handlers then all chain breaking
function Router(req, res) {
    function next(err) {
        if (err instanceof Error) {
            throw err;
        }
    }

    return async function (...handlers) {
        for await (const handler of handlers) {
            try {
                await handler(req, res, next);
            } catch (err) {
                res.sendMessage(JSON.stringify(err));
                break;
            }
        }
    };
}

export default async function (request, client) {
    const chatId = request.chat ? request.chat.id : request.message.chat.id;

    const router = Router(request, client);
    const command = getCommand(request);

    switch (command) {
        case BOT_COMMAND.HELP: {
            await router(Controllers.main.help);
            break;
        }
        case BOT_COMMAND.ADD_TRACK_PHONE: {
            await router(Controllers.main.trackPhone);
            break;
        }
        case BOT_COMMAND.ADD_EMAIL: {
            await router(Controllers.main.addEmail);
            break;
        }
        case BOT_COMMAND.NOTIFY_WHEN_ONLINE: {
            await router(Controllers.main.notifyOnline);
            break;
        }
        case BOT_COMMAND.EDIT_TRACK_PHONES_MENU: {
            await router(Controllers.main.editTrackingMenu);
            break;
        }
        case BOT_COMMAND.STOP_TRACK_PHONE: {
            await router(Controllers.main.stopTracking);
            break;
        }
        case BOT_COMMAND.LEAVE_CHAT: {
            await router(Controllers.main.leaveChat);
            break;
        }
        case BOT_COMMAND.RESTART_CHAT: {
            await router(Controllers.main.restartChat);
            break;
        }
        default: {
            client.sendMessage(chatId, UserMessages.unknownCommandMessage());
            break;
        }
    }

    return undefined;
}
