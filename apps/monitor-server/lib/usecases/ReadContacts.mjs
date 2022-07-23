import { Contact } from '../models/index.mjs';
import UseCaseBase from './UseCaseBase.mjs';

export class ReadContacts extends UseCaseBase {
    static validationRules = {
        page: ['required', 'integer'],
        size: ['required', 'integer'],
    };

    async execute(params) {
        const data = await new Contact().readList(params);
        const total = await new Contact().getTotal();

        return { data, total };
    }
}
