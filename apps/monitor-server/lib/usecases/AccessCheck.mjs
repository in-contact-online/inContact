import UseCaseBase from './UseCaseBase.mjs';
import { AuthenticationError } from '../models/index.mjs';
import * as ConfigContainer from '../config.cjs';

export class AccessCheck extends UseCaseBase {
    static validationRules = {
        securityToken: ['required', 'string'],
    };

    // ad-hoc security mechanism
    async execute(params) {
        const { securityToken } = ConfigContainer.config;
        if (securityToken === params.securityToken) {
            return null;
        } else {
            throw new AuthenticationError({ message: 'Wrong security token provided' });
        }
    }
}
