import { phone } from 'phone';

const COUNTRIES = ['RU', 'UA', 'BY', 'KZ'];

export function isValidPhone(phoneNumber) {
    for (let country of COUNTRIES) {
        if (phone(phoneNumber, { country }).isValid) return phone(phoneNumber, { country }).phoneNumber;
    }
    return false;
}
