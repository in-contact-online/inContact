import UseCaseBase from './UseCaseBase.mjs';
import { User, UserMessages } from '../models/index.mjs';

export class RegisterAndStart extends UseCaseBase {
    static validationRules = {
        firstName: ['string'],
        lastName: ['string'],
        userId: ['required', 'positive_integer'],
        idBot: ['boolean'],
    };

    async execute(params) {
        const user = await (new User()).read(params);
        if (!user) {
            await (new User()).save(params);
        }
        return UserMessages.welcomeMessage();
    }
}
