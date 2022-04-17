import { makeRequestHandler } from '../../utils/index.mjs';
import { UpdateSessions } from '../usecases/UpdateSessions.mjs';

export const sessions = {
    update: makeRequestHandler(
        UpdateSessions,
        () => {},
        (result, res, req) => {
            let sessionMessage = 'No message to ADD!';
            if (result.length !== 0) sessionMessage = result.map((session) => session.id).join(', ');
            res.send('New sessions: ' + sessionMessage);
        }
    ),
};
