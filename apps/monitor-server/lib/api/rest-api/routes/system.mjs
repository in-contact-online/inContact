import { makeRequestHandler } from '../../utils/index.mjs';
import { ReadSystemHealth } from '../../../usecases/index.mjs';

export const systemHealth = {
    read: makeRequestHandler(
        ReadSystemHealth,
        () => ({}),
        (result, res) => {
            res.send(result);
        }
    ),
};
