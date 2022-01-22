import { runUseCase } from '../../utils';
import { SessionCheck } from '../../../usecases'

export const session = {
    check: async (req, res, next) => {
        const params = { token: req.params.authToken, email: req.params.userEmail };
        const promise = runUseCase(SessionCheck, { params } );

        try {
            await promise;
            return next();
        } catch (e) {
            return next(e);
        }
    }
};
