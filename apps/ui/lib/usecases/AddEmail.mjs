import UseCaseBase from './UseCaseBase.mjs';
import { User, UserMessages } from '../models/index.mjs';

export class AddEmail extends UseCaseBase {
    static validationRules = {
        email: ['string'],
        userId: ['required', 'positive_integer'],
    };

    async execute(params) {
        await new User().update(params);

        return UserMessages.emailUpdated();
    }
}
