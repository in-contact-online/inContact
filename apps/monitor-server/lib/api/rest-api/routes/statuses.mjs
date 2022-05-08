import { makeRequestHandler } from '../../utils/index.mjs';
import { ReadStatuses } from '../../../usecases/index.mjs';

export const statuses = {
    readList: makeRequestHandler(
        ReadStatuses,
        (req) => ({
            page: req.query.page,
            size: req.query.size,
            phoneNumber: req.query.phoneNumber,
            checkFrom: req.query.checkFrom,
            checkTo: req.query.checkTo,
        }),
        (result, res) => {
            res.send(result);
        }
    ),
};
