import { makeCommandHandler } from '../../utils/index.mjs';
import { ScanContacts } from '../../../usecases/index.mjs';

export const scanner = {
     read: makeCommandHandler(
          ScanContacts,
     )
}
