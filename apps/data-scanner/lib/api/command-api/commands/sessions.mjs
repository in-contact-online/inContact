import { makeCommandHandler } from '../../utils/index.mjs';
import { InitSessionsPool, UpdateSessionsPool } from '../../../usecases/index.mjs';

export const sessions = {
    init: makeCommandHandler(InitSessionsPool),
    update: makeCommandHandler(UpdateSessionsPool),
};
