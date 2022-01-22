import TelegramBot from 'node-telegram-bot-api';
import Router from './router';
import logger from '../logger';

let service = null;
const CONNECT_ATTEMPTS = 10;
let connectionAttempt = 0;

export function startServer({ botToken }) {
    service = startService({ botToken });
}

export async function stopServer() {
    if (!service) return;

    service.close();
    logger.info('WS Service stopped');
}

function startService({ botToken }) {
    try {
        const bot = new TelegramBot(botToken, {polling: true});
        logger.info('Telegra Bot started');

        bot.on('message', (msg) => {
            const chatId = msg.chat.id;
          
            // send a message to the chat acknowledging receipt of their message
            bot.sendMessage(chatId, 'Received your message');
            Router(msg.toString(), bot);
          });

        return bot;
    } catch (err) {
        logger.error('Bot Service try init');
        logger.error('Bot Service connection', err);
        if (connectionAttempt <= CONNECT_ATTEMPTS) {
            connectionAttempt += 1;
            setTimeout(function () {
                startService({ botToken });
            }, 5000 * connectionAttempt);
        } else {
            logger.info(`Stop trying connect to Bot Service after ${connectionAttempt} attempts`);
        }
    }
}
