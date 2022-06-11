import { Notification } from '../models/index.mjs';
import UseCaseBase from './UseCaseBase.mjs';

export class SendTextMessage extends UseCaseBase {
    static validationRules = {
        phone: ['required', 'string'],
        message: ['required', 'string']
    }

    async execute(params) {
        await new Notification().sendTextMessage(params);
        return params;
    }
}
