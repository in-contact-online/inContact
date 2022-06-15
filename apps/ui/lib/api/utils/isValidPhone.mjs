import { phone } from 'phone';

// todo: move to env
const COUNTRIES = ['RU', 'UA', 'BY', 'KZ', 'LV'];

export function isValidPhone(phoneNumber) {
    for (let country of COUNTRIES) {
        const phoneObject = phone(phoneNumber, { country });
        if (phoneObject.isValid) return phoneObject.phoneNumber;
    }
    return false;
}
