import { Session } from '../models/index.mjs';
import UseCaseBase from './UseCaseBase.mjs';


export class ReadSessions extends UseCaseBase {
    static validationRules = {

    }
    async execute(params) {
        const sessionList = await new Session().readList(params);
        //todo: find way how to handle results one by one
        return sessionList;
    }
}
