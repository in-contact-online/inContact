import UseCaseBase from './UseCaseBase.mjs';
import { UserMessages } from '../models/index.mjs';

export class GetUserStatus extends UseCaseBase {
    static validationRules = {
        firstName: ['string'],
        lastName: ['string'],
        userId: ['required', 'positive_integer'],
        idBot: ['boolean'],
    };

    async execute() {
        //todo: implement get status logic based on data-scanner
        return UserMessages.notImplementYetMessage();
    }
}
