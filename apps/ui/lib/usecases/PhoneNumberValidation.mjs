import UseCaseBase from './UseCaseBase.mjs';
import { phone } from 'phone';
import { COUNTRIES } from '../system/index.mjs';

export class PhoneNumberValidation extends UseCaseBase {
    static validationRules = {
        phone: ['string'],
    };

    static isValid(phoneNumber, countries) {
        for (let country of countries) {
            let result = phone(phoneNumber, { country });
            if (result.isValid) return { validatedPhoneNumber: result.phoneNumber, country: result.countryIso2 };
        }
        return false;
    }

    async execute(params) {
        console.log('params');
        params.phone = PhoneNumberValidation.isValid(params.phone, COUNTRIES).validatedPhoneNumber;
    }
}
