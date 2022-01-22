import * as Controllers from './controllers';
// import { parseSafeNull } from '../../utils';
// import logger from '../api'
// import { WS_METHODS } from '../../system';

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
    }
}

export default async function (message, client) {
    console.log('Receive message: ', message);
    const chatId = message.chat.id;
    // const message = parseSafeNull(messageRaw);
    // if (!message) return undefined;

    const router = Router(message, client);

    switch (message.text) {
        case('GET'): {
            await router(Controllers.main.get);
            client.sendMessage(chatId, 'Receive your message');
            break;
        }
        default: {
            client.sendMessage(chatId, 'Invalid message');
        }
        // case(WS_METHODS.ADD): {
        //     await router(Controllers.session.check, Controllers.main.add);
        //     break;
        // }
        // case(WS_METHODS.DELETE): {
        //     await router(Controllers.session.check, Controllers.main.del);
        //     break;
        // }
    }
    
    return undefined;
}
