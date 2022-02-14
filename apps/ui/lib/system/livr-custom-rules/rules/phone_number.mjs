import { utils } from '../util.mjs';
import { isValidPhone } from '../../../api/utils/isValidPhone.mjs';

export function phone_number() {
    return (value, params, outputArr) => {
        if (utils.isNoValue(value)) return;
        if (!utils.isPrimitiveValue(value)) return 'FORMAT_ERROR';

        const validationResult = isValidPhone(value);
        if (validationResult) {
            outputArr.push(validationResult);
            return;
        }

        return 'INVALID_PHONE_NUMBER';
    };
}
