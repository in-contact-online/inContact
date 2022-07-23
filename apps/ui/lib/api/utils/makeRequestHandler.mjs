import logger from '../logger';
import { errorToMessage } from './errorToMessage.mjs';

export async function runUseCase(UseCase, { params }) {
    return new UseCase().run(params);
}

export function makeRequestHandler(UseCase, mapToParams, mapToResponse) {
    function logRequest(chatId, params, result, startTime) {
        logger.info({
            chatId,
            useCase: UseCase.name,
            runtime: Date.now() - startTime,
            params,
            result,
        });
    }

    return async function routerHandler(req, res, next = () => {}) {
        const chatId = req.chat ? req.chat.id : req.message.chat.id;
        try {
            const startTime = Date.now();
            const params = mapToParams(req, res);

            const result = await runUseCase(UseCase, { params });

            logRequest(chatId, params, result, startTime);

            if (mapToResponse) {
                mapToResponse(result, res, req);
            } else if (res) {
                // todo: implement res class with the send method for different clients (not only WS)
                res.sendMessage(chatId, JSON.stringify(result));
            }
            next();
        } catch (err) {
            logger.error({
                chatId,
                useCase: UseCase.name,
                error: JSON.stringify(err),
                params: req,
            });
            res.sendMessage(chatId, errorToMessage(err));
        }
    };
}
