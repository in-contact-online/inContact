import TelegramBot from 'node-telegram-bot-api';
import Router from './router';
import logger from '../logger';
import { getKeyboardPayload } from '../utils';

let service = null;
const CONNECT_ATTEMPTS = 10;
let connectionAttempt = 0;

export function startServer({ auth }) {
    service = startService({ auth });
}

export async function stopServer() {
    if (!service) return;

    service.close();
    logger.info('WS Service stopped');
}

function startService({ auth }) {
    try {
        const bot = new TelegramBot(auth.botToken, { polling: true });
        logger.info('Telegra Bot started');

        bot.setMyCommands([
            { command: '/add_number', description: 'Добавить номер и начать отслеживание' },
            {
                command: '/edit_numbers',
                description: 'Список отслеживаемых номеров / Удалить номер',
            },
            { command: '/get_status', description: 'Статус отслеживания' },
        ]);

        bot.on('message', (msg) => {
            // send a message to the chat acknowledging receipt of their message
            // bot.sendMessage(chatId, 'Received your message');
            Router(msg, bot);
        });

        bot.on('callback_query', (msg) => {
            //TODO: remove number from database, get updated list of numbers and load new markup
            const mockData = ['updated...', 'updated...'];
            const keyboardPayload = getKeyboardPayload(mockData);
            bot.editMessageReplyMarkup(keyboardPayload, {
                chat_id: msg.message.chat.id,
                message_id: msg.message.message_id,
            });
            bot.answerCallbackQuery(msg.id, { text: `Номер ${msg.data} больше не отслеживается`, show_alert: true });
        });

        return bot;
    } catch (err) {
        logger.error('Bot Service try init');
        logger.error('Bot Service connection', err);
        if (connectionAttempt <= CONNECT_ATTEMPTS) {
            connectionAttempt += 1;
            setTimeout(function () {
                startService({ auth });
            }, 5000 * connectionAttempt);
        } else {
            logger.info(`Stop trying connect to Bot Service after ${connectionAttempt} attempts`);
        }
    }
}
