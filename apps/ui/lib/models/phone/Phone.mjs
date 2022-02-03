import { phone } from 'phone';

export class Phone {
    constructor(phoneNumber, countries) {
        this.phoneNumber = phoneNumber;
        this.validated = Phone.isValid(this.phoneNumber, countries);
    }

    static isValid(phoneNumber, countries) {
        for (let country of countries) {
            let result = phone(phoneNumber, { country });
            if (result.isValid) return { phoneNumber: result.phoneNumber, country: result.countryIso2 };
        }
        return false;
    }
}
