import { makeRequestHandler } from '../../utils/index.mjs';
import { UpdateSessions } from '../../../usecases/index.mjs';

export const sessions = {
    update: makeRequestHandler(
        UpdateSessions,
        () => {},
        (result, res) => {
            let sessionMessage = 'No sessions to ADD!';
            if (result.length !== 0) sessionMessage = result.map((session) => session.id).join(', ');
            res.send('New sessions: ' + sessionMessage);
        }
    ),
};
