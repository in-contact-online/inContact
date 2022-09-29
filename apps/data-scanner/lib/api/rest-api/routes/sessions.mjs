import {makeRequestHandler} from '../../utils/index.mjs';
import {SyncSessionsPool} from '../../../usecases/index.mjs';

export const sessions = {
    sync: makeRequestHandler(
        SyncSessionsPool,
        () => {
        },
        (result, res) => {
            res.send(result.map(client => client.sessionId));
        }
    ),
};
