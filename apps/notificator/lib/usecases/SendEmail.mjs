import { Notification } from '../models/index.mjs';
import UseCaseBase from './UseCaseBase.mjs';


export class SendEmail extends UseCaseBase {
    static validationRules = {
        email: ['required', 'string'],
        message: ['required', 'string']
    }

    async execute(params) {
        await new Notification().sendEmail(params);
        return params;
    }
}
