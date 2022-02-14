import { phone } from 'phone';

const COUNTRIES = ['RU', 'UA', 'BY', 'KZ'];

export function isValidPhone(phoneNumber) {
    for (let country of COUNTRIES) {
        const phoneObject = phone(phoneNumber, { country });
        if (phoneObject.isValid) return phoneObject.phoneNumber;
    }
    return false;
}
