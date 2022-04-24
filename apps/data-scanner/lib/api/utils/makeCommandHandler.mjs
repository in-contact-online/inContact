import logger from '../logger';

export async function runUseCase(UseCase, { params }) {
    return new UseCase().execute(params);
}

export function makeCommandHandler(UseCase) {
    function logRequest(params, result, startTime) {
        logger.debug({
            useCase: UseCase.name,
            runtime: Date.now() - startTime,
            params,
            result,
        });
    }

    return async function commandHandler(params) {
        try {
            const startTime = Date.now();

            const result = await runUseCase(UseCase, { params });

            logRequest(params, result, startTime);
        } catch (err) {
            logger.error(`[ErrorHandler] ${err}`);
        }
    };
}
