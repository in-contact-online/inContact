import * as Controllers from './controllers';
import { BOT_ACTION } from '../../system';
import { getKeyboardPayload } from '../utils';

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

export default async function (message, client) {
    if (!message) {
        client.sendMessage(chatId, 'Invalid message');
        return undefined;
    }
    const chatId = message.chat.id;

    const router = Router(message, client);

    const welcomeMessage = `Привет. Это бот трекинга статусов телеграм аккаунтов.

Доступные команды:
<b>/start</b> - Запустить бота / Помощь и команды
<b>/add_number</b> - Добавить номер и начать отслеживание
<b>/edit_numbers</b> - Список отслеживаемых номеров / Удалить номер
<b>/get_status</b> - Статус отслеживания`;

    const isPhoneNumber = (number) => /^\+(380[0-9]{9}|7[0-9]{10})$/.test(number);

    if (message.text === '/start') {
        client.sendMessage(chatId, welcomeMessage, { parse_mode: 'HTML' });
    } else if (message.text === '/add_number') {
        client.sendMessage(
            chatId,
            'Добавьте номера для отслеживания в формате <i>+380992102030</i> для Украины, или <i>+79024670149</i> для России:',
            { parse_mode: 'HTML' }
        );
    } else if (isPhoneNumber(message.text)) {
        // TODO: add number to database
        client.sendMessage(chatId, `Номер ${message.text} добавлен`);
    } else if (message.text === '/edit_numbers') {
        //TODO: replace mock data with phone numbers from database
        const mockData = ['+380992101314', '+380677738465', '+380504358474', '+380773748398'];
        const keyboardPayload = getKeyboardPayload(mockData);
        client.sendMessage(
            chatId,
            '<b>Ваш список номеров.</b> <i>Выберите номер, если хотите удалить его из базы и прекратить отслеживание:</i>',
            { reply_markup: keyboardPayload, parse_mode: 'HTML' }
        );
    } else client.sendMessage(chatId, 'Invalid command!');

    /* 
    switch (message.text) {
        case '/start': {
            await router(Controllers.main.get);
            break;
        }
        default: {
            client.sendMessage(chatId, 'Invalid message');
        } 
         case(WS_METHODS.ADD): {
             await router(Controllers.session.check, Controllers.main.add);
             break;
         }
         case(WS_METHODS.DELETE): {
             await router(Controllers.session.check, Controllers.main.del);
             break;
         }
    }*/

    return undefined;
}
