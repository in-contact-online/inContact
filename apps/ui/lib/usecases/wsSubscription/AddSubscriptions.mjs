import { SubscriptionsManager, WsClient } from '../../models';
import { WS_CHANNELS, WS_ENTITY } from '../../system';
import UseCaseBase from '../UseCaseBase';

export class AddSubscriptions extends UseCaseBase {
    static validationRules = {
        jsonrpc: ['string', 'required'],
        id: ['required'],
        clientUid: ['string', 'required'],
        email: ['string', 'required'],
        client: ['not_empty'],
        channels: ['required', 'not_empty_list', {
            list_of: ['required',  'string', { 'one_of': [Object.values(WS_CHANNELS)] }]
        }],
        project: ['string', 'required'],
        entity: ['string', {'eq': WS_ENTITY.SUBSCRIPTIONS}, 'required'],
    };

    async execute(params) {
        const wsClient = new WsClient(params.client, params.email, params.clientUid);
        const subscriptionsManager = new SubscriptionsManager();
        for (const channel of params.channels) {
            const topic = `${channel}:${params.project}`;
            subscriptionsManager.addSubscription(wsClient, topic, params.clientUid);
        }

        return JSON.stringify({
            jsonrpc: params.jsonrpc,
            id: params.id,
            result: params.channels
        });
    }
}
