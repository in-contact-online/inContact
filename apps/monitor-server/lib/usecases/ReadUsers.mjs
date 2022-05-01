import { User } from '../models/index.mjs';
import UseCaseBase from './UseCaseBase.mjs';


export class ReadUsers extends UseCaseBase {
    static validationRules = {
        page: ['required', 'integer'],
        size: ['required', 'integer']
    }
    async execute(params) {
        const data = await new User().readList(params);
        const total = await new User().getTotal();
        return { data, total };
    }
}
