import { Contact } from '../models/index.mjs';
import UseCaseBase from './UseCaseBase.mjs';


export class ReadContacts extends UseCaseBase {
    static validationRules = {

    }
    async execute(params) {
        const contacts = await new Contact().readList(params);
        //todo: find way how to handle results one by one
        return contacts;
    }
}
