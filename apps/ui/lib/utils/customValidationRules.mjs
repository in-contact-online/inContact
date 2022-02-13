import util from 'livr-extra-rules/src/util';
import { isValidPhone } from './isValidPhone.mjs';

function phone_number() {
    return (value, params, outputArr) => {
        if (util.isNoValue(value)) return;
        if (!util.isPrimitiveValue(value)) return 'FORMAT_ERROR';

        const validationResult = isValidPhone(value);
        if (validationResult) {
            outputArr.push(validationResult);
            return;
        }

        return 'INVALID_PHONE_NUMBER';
    };
}

export default { phone_number };
