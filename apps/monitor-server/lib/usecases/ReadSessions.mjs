import { Session } from '../models/index.mjs';
import UseCaseBase from './UseCaseBase.mjs';


export class ReadSessions extends UseCaseBase {
    static validationRules = {
        page: ['required', 'integer'],
        size: ['required', 'integer']
    }

    async execute(params) {
        const sessions = await new Session().readList(params);
        const total = await new Session().getTotal();
        return { sessions, total };
    }
}
