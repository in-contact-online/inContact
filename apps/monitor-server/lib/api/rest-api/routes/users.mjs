import { makeRequestHandler } from '../../utils/index.mjs';
import { ReadUsers } from '../../../usecases/index.mjs';

export const users = {
    readList: makeRequestHandler(
        ReadUsers,
        (req) => ({
            from: req.query.from,
            to: req.query.to,
        }),
        (result, res) => {
            res.send(result);
        }
    ),
};
