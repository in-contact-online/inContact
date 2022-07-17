import { Statuses } from '../models/index.mjs';
import UseCaseBase from './UseCaseBase.mjs';

export class ReadStatuses extends UseCaseBase {
    static validationRules = {
        page: ['required', 'integer'],
        size: ['required', 'integer'],
        phoneNumber: ['string'],
        checkFrom: ['iso_date'],
        checkTo: ['iso_date'],
    };

    async execute(params) {
        const data = await new Statuses().readList(params);
        const total = await new Statuses().getTotal(params);
        return { data, total };
    }
}
