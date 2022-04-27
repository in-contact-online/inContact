import { makeRequestHandler } from '../../utils/index.mjs';
import { ReadUsers } from '../../../usecases/index.mjs';

export const users = {
    readList: makeRequestHandler(
        ReadUsers,
        (req) => ({
            page: req.query.page,
            size: req.query.size,
        }),
        (result, res) => {
            res.send(result);
        }
    ),
};
