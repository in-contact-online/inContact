import { ErrorHandler } from '../../models';
import logger from '../logger';

export async function runUseCase(UseCase, { params }) {
    return new UseCase().run(params);
}

export function makeRequestHandler(UseCase, mapToParams, mapToResponse) {
    function logRequest(params, result, startTime) {
        logger.debug({
            useCase: UseCase.name,
            runtime: Date.now() - startTime,
            params,
            result,
        });
    }

    return async function routerHandler(req, res, next = () => {}) {
        try {
            const startTime = Date.now();
            const params = mapToParams(req, res);
            const chatId = req.chat.id;

            const result = await runUseCase(UseCase, { params });

            logRequest(params, result, startTime);

            if (mapToResponse) {
                mapToResponse(result, res, req);
            } else if (res) {
                // todo: implement res class with the send method for different clients (not only WS)
                res.sendMessage(chatId, JSON.stringify(result));
            }
            next();
        } catch (err) {
            ErrorHandler.handleRequestError(res, err, next);
        }
    };
}
