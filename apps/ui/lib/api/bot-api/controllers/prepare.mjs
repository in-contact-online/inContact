import { makeRequestHandler } from '../../utils/index.mjs';
import { PhoneNumberValidation } from '../../../usecases/index.mjs';

export const prepare = {
    phoneNumberValidation: makeRequestHandler(
        PhoneNumberValidation,
        (req) => ({
            phone: req.text,
        }),
        () => {}
    ),
};
