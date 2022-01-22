import UseCaseBase from '../UseCaseBase';
import { SubscriptionsManager } from '../../models';
import { WS_ENTITY, WS_CHANNELS } from '../../system';

export class GetSubscriptions extends UseCaseBase {
    static validationRules = {
        jsonrpc: ['string', 'required'],
        id: ['required'],
        entity: ['string', { 'one_of': [WS_ENTITY.CHANNELS, WS_ENTITY.SUBSCRIPTIONS] }, 'required'],
    };

    async execute(params) {
        let result;
        if (params.entity === WS_ENTITY.CHANNELS) {
            result = Object.values(WS_CHANNELS);
        } else {
            const subscriptionsManager = new SubscriptionsManager();
            result = subscriptionsManager.getAllSubscriptions();
        }

        return JSON.stringify({
            jsonrpc: params.jsonrpc,
            id: params.id,
            result
        });
    }
}
