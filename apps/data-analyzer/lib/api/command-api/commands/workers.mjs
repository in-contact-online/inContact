import { makeCommandHandler } from '../../utils/index.mjs';
import { InitWorkersQueue } from '../../../usecases/index.mjs';

export const workers = {
     init: makeCommandHandler(
          InitWorkersQueue,
     ),
}
