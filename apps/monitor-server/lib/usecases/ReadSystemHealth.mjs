import { System } from '../models/index.mjs';
import UseCaseBase from './UseCaseBase.mjs';


export class ReadSystemHealth extends UseCaseBase {
    static validationRules = {

    }
    async execute() {
        const serviceStatuses = await new System().readStatuses();
        const resourceUsage = await new System().readResourceUsage();
        //todo: find way how to handle results one by one
        return {
            serviceStatuses,
            resourceUsage
        };
    }
}
