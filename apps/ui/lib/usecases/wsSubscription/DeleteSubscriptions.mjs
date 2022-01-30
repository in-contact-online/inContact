import UseCaseBase from '../UseCaseBase';

export class DeleteSubscriptions extends UseCaseBase {
    static validationRules = {
    };

    async execute(params) {

        return JSON.stringify({
            jsonrpc: params.jsonrpc,
            id: params.id,
            result: params.channels
        });
    }
}