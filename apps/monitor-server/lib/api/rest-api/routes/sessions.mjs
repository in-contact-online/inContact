import { makeRequestHandler } from '../../utils/index.mjs';
import { ReadSessions } from '../../../usecases/index.mjs';

export const sessions = {
    readList: makeRequestHandler(
        ReadSessions,
        (req) => ({
            from: req.query.from,
            to: req.query.to,
        }),
        (result, res) => {
            res.send(result);
        }
    ),
};
