import {runUseCase} from "../../utils/index.mjs";
import {AccessCheck} from "../../../usecases/index.mjs";
import logger from '../../logger.mjs';


export const access = {
    async check(req, res, next) {
        const promise = runUseCase(AccessCheck, {
            params: {
                securityToken: req.get('X-User-Security-Token'),
            },
        });
        try {
            await promise;
            return next();
        } catch (e) {
            logger.error(e);
            res.status(401).send({message: 'Access denied'});
        }
    },
};
