import { SubscriptionsManager } from '../../models';
import {WS_CHANNELS, WS_ENTITY} from '../../system';
import UseCaseBase from '../UseCaseBase';

export class DeleteSubscriptions extends UseCaseBase {
    static validationRules = {
        jsonrpc: ['string', 'required'],
        id: ['required'],
        clientUid: ['string', 'required'],
        email: ['string', 'required'],
        channels: ['required', 'not_empty_list', {
            list_of: ['required',  'string', { 'one_of': [Object.values(WS_CHANNELS)] }]
        }],
        project: ['string', 'required'],
        entity: ['string', {'eq': WS_ENTITY.SUBSCRIPTIONS}, 'required'],
    };

    async execute(params) {
        const subscriptionsManager = new SubscriptionsManager();
        subscriptionsManager.deleteSubscriptionByParams(params.email, params.channels, params.project, params.clientUid);

        return JSON.stringify({
            jsonrpc: params.jsonrpc,
            id: params.id,
            result: params.channels
        });
    }
}
