import { makeRequestHandler } from '../../utils/index.mjs';
import { ReadContacts } from '../../../usecases/index.mjs';

export const contacts = {
    readList: makeRequestHandler(
        ReadContacts,
        (req) => ({
            page: req.query.page,
            size: req.query.size,
        }),
        (result, res) => {
            res.send(result);
        }
    ),
};
