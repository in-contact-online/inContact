import { User } from '../models/index.mjs';
import UseCaseBase from './UseCaseBase.mjs';


export class ReadUsers extends UseCaseBase {
    static validationRules = {

    }
    async execute(params) {
        const users = await new User().readList(params);
        //todo: find way how to handle results one by one
        return users;
    }
}
