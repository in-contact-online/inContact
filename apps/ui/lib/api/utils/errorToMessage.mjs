import { UserMessages, ValidationError } from '../../models/index.mjs';

const messages = {
    INVALID_PHONE_NUMBER: UserMessages.invalidPhoneNumber,
};

export function errorToMessage(err) {
    if (err instanceof ValidationError) {
        const errorObj = JSON.parse(err.message);
        const errorArr = [];
        for (let prop in errorObj) errorArr.push(messages[errorObj[prop]]());
        return errorArr.join('\n');
    }

    return 'Internal Error!';
}
