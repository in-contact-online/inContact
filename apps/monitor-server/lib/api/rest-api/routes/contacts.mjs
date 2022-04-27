import { makeRequestHandler } from '../../utils/index.mjs';
import { ReadContacts } from '../../../usecases/index.mjs';

export const contacts = {
    readList: makeRequestHandler(
        ReadContacts,
        (req) => ({
            from: req.query.from,
            to: req.query.to,
        }),
        (result, res) => {
            res.send(result);
        }
    ),
};
