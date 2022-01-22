import { makeRequestHandler } from '../../utils';
import { AddSubscriptions, GetSubscriptions, DeleteSubscriptions } from '../../../usecases'

export const main = {
    get: makeRequestHandler(
        GetSubscriptions,
        (req) => ({
            jsonrpc: req.jsonrpc,
            id: req.id,
            entity: req.params.entity,
        }),
        (result, res) => {
            res.send(result);
        }
    ),
    add: makeRequestHandler(
        AddSubscriptions,
        (req, res) => ({
            jsonrpc: req.jsonrpc,
            id: req.id,
            clientUid: res.uid,
            email: req.params.userEmail,
            project: req.params.project_uid,
            channels: req.params.data,
            entity: req.params.entity,
            client: res,
        }),
        (result, res) => {
            res.send(result);
        }
    ),
    del: makeRequestHandler(
        DeleteSubscriptions,
        (req, res) => ({
            jsonrpc: req.jsonrpc,
            id: req.id,
            clientUid: res.uid,
            email: req.params.userEmail,
            project: req.params.project_uid,
            channels: req.params.data,
            entity: req.params.entity,
        }),
        (result, res) => {
            res.send(result);
        }
    ),
}
