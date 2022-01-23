import UseCaseBase from '../UseCaseBase';
import { User } from '../../models';

export class GetSubscriptions extends UseCaseBase {
    static validationRules = {
    };

    async execute() {
        const user = await (new User()).read(123456);
        return JSON.stringify(user);
    }
}
