import LIVR from 'livr';
import extraRules from 'livr-extra-rules';
import { customRules } from '../system/livr-custom-rules/index.mjs';
import { ValidationError } from '../models';

export default class UseCaseBase {
    constructor() {
        this.validator = null;
    }

    async run(params) {
        const cleanParams = await this.validate(params);
        if (cleanParams) {
            return this.execute(cleanParams);
        }
        const errors = this.validator.getErrors();
        throw new ValidationError(JSON.stringify(errors));
    }

    // Validate only use-cases with the validationRules
    async validate(params) {
        if (this.constructor.validationRules) {
            this.validator = new LIVR.Validator(this.constructor.validationRules);
            this.validator.registerRules({ ...extraRules, ...customRules });
            return this.validator.validate(params);
        }
        return params;
    }
}
