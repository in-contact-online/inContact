import { makeRequestHandler } from '../../utils/index.mjs';
import { ReadSessions } from '../../../usecases/index.mjs';

export const sessions = {
    readList: makeRequestHandler(
        ReadSessions,
        (req) => ({
            page: req.query.page,
            size: req.query.size,
        }),
        (result, res) => {
            res.send(result);
        }
    ),
};
