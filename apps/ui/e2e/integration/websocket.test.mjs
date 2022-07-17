import assert from 'assert';
import {
    Server,
    initRepoData,
    clearRepoData,
    createPosition,
    createNotify,
    createAlarm,
    createZoneEvent,
    createOta,
} from './helpers';
import { WsApi, ZmqPublisher } from '../utils';
import { generateUid, generateToken } from '../../lib/utils';
import { WS_CHANNELS } from '../../lib/system';

let wsApi;
describe('WebSocket API', function () {
    const zmqPublisher = new ZmqPublisher();
    before(async function () {
        await Server().init();
        await zmqPublisher.init(); // init with some delay to init zmq connection
        await initRepoData();
    });
    after(async function () {
        await clearRepoData();
        zmqPublisher.destroy();
    });

    describe('get method', function () {
        beforeEach(async function () {
            wsApi = new WsApi();
            await wsApi.init();
        });

        afterEach(async function () {
            wsApi.close();
        });

        it('should handle get channels request', function (done) {
            const id = generateUid();
            const req = { jsonrpc: '2.0', method: 'get', params: { entity: 'channels' }, id };
            const CHANNELS = [
                WS_CHANNELS.POS,
                WS_CHANNELS.NOTIFY,
                WS_CHANNELS.ALARM,
                WS_CHANNELS.ZONE_EVENT,
                WS_CHANNELS.PARAM_P,
                WS_CHANNELS.SENSOR,
                WS_CHANNELS.OTA,
            ];

            wsApi.setOnMessage(function (rawMessage) {
                const message = JSON.parse(rawMessage);
                if (message.id === id) {
                    assert.deepStrictEqual(message.result, CHANNELS);
                    assert.deepStrictEqual(Object.keys(message), ['jsonrpc', 'id', 'result']);
                    done();
                }
            });
            wsApi.send(req);
        });
        it('should return error on invalid entity value', function (done) {
            const id = generateUid();
            const req = { jsonrpc: '2.0', method: 'get', params: { entity: 'wrongentityname' }, id };
            const res = { httpCode: 422, errorCode: 'VALIDATION_ERROR', isOperational: true };
            wsApi.setOnMessage(function (rawMessage) {
                if (rawMessage === JSON.stringify(res)) {
                    done();
                }
            });
            wsApi.send(req);
        });
        it('should return error on absence of "jsonrpc" property in request', function (done) {
            const id = generateUid();
            const req = { method: 'get', params: { entity: 'channels' }, id };
            const res = { httpCode: 422, errorCode: 'VALIDATION_ERROR', isOperational: true };
            wsApi.setOnMessage(function (rawMessage) {
                if (rawMessage === JSON.stringify(res)) {
                    done();
                }
            });
            wsApi.send(req);
        });
        it('should return error on absence of "id" property in request', function (done) {
            const id = generateUid();
            const req = { jsonrpc: '2.0', method: 'get', params: { entity: 'channels' } };
            const res = { httpCode: 422, errorCode: 'VALIDATION_ERROR', isOperational: true };
            wsApi.setOnMessage(function (rawMessage) {
                if (rawMessage === JSON.stringify(res)) {
                    done();
                }
            });
            wsApi.send(req);
        });
    });

    describe('add method', function () {
        beforeEach(async function () {
            wsApi = new WsApi();
            await wsApi.init();
        });

        afterEach(async function () {
            wsApi.close();
        });

        it('should handle add subscriptions request', function (done) {
            const id = generateUid();
            const projectUid = 'wABnaPYiSLyHncJVmTWHE2'; // DbSeeds.json
            const req = {
                jsonrpc: '2.0',
                method: 'add',
                params: {
                    data: [WS_CHANNELS.POS, WS_CHANNELS.ALARM],
                    entity: 'subscriptions',
                    userEmail: 'test@redpointpositioning.com',
                    authToken: generateToken({ user: { email: 'test@redpointpositioning.com' } }),
                    project_uid: projectUid,
                },
                id,
            };
            wsApi.setOnMessage(function (rawMessage) {
                const message = JSON.parse(rawMessage);
                if (message.id === id) {
                    assert.deepStrictEqual(message.result, req.params.data);
                    done();
                }
            });
            wsApi.send(req);
        });
        it('should fail add subscriptions for not supported channels', function (done) {
            const id = generateUid();
            const projectUid = 'wABnaPYiSLyHncJVmTWHE2'; // DbSeeds.json
            const req = {
                jsonrpc: '2.0',
                method: 'add',
                params: {
                    data: [WS_CHANNELS.POS, WS_CHANNELS.ALARM, 'not_supported'],
                    entity: 'subscriptions',
                    userEmail: 'test@redpointpositioning.com',
                    authToken: generateToken({ user: { email: 'test@redpointpositioning.com' } }),
                    project_uid: projectUid,
                },
                id,
            };
            const res = { httpCode: 422, errorCode: 'VALIDATION_ERROR', isOperational: true };
            wsApi.setOnMessage(function (rawMessage) {
                if (rawMessage === JSON.stringify(res)) {
                    done();
                }
            });
            wsApi.send(req);
        });
        it('should fail add subscriptions for invalid entity', function (done) {
            const id = generateUid();
            const projectUid = 'wABnaPYiSLyHncJVmTWHE2'; // DbSeeds.json
            const req = {
                jsonrpc: '2.0',
                method: 'add',
                params: {
                    data: [WS_CHANNELS.POS, WS_CHANNELS.ALARM],
                    entity: 'invalidentity',
                    userEmail: 'test@redpointpositioning.com',
                    authToken: generateToken({ user: { email: 'test@redpointpositioning.com' } }),
                    project_uid: projectUid,
                },
                id,
            };
            const res = { httpCode: 422, errorCode: 'VALIDATION_ERROR', isOperational: true };
            wsApi.setOnMessage(function (rawMessage) {
                if (rawMessage === JSON.stringify(res)) {
                    done();
                }
            });
            wsApi.send(req);
        });
        it('should fail add subscriptions in case of absence project uid', function (done) {
            const id = generateUid();
            const projectUid = 'wABnaPYiSLyHncJVmTWHE2'; // DbSeeds.json
            const req = {
                jsonrpc: '2.0',
                method: 'add',
                params: {
                    data: [WS_CHANNELS.POS, WS_CHANNELS.ALARM],
                    entity: 'subscriptions',
                    userEmail: 'test@redpointpositioning.com',
                    authToken: generateToken({ user: { email: 'test@redpointpositioning.com' } }),
                },
                id,
            };
            const res = { httpCode: 422, errorCode: 'VALIDATION_ERROR', isOperational: true };
            wsApi.setOnMessage(function (rawMessage) {
                if (rawMessage === JSON.stringify(res)) {
                    done();
                }
            });
            wsApi.send(req);
        });
        it('should fail add subscription if token email not equal to sent userEmail', function (done) {
            const id = generateUid();
            const projectUid = 'wABnaPYiSLyHncJVmTWHE2'; // DbSeeds.json
            const req = {
                jsonrpc: '2.0',
                method: 'add',
                params: {
                    data: [WS_CHANNELS.POS, WS_CHANNELS.ALARM],
                    entity: 'subscriptions',
                    userEmail: 'test2@redpointpositioning.com',
                    authToken: generateToken({ user: { email: 'test@redpointpositioning.com' } }),
                    project_uid: projectUid,
                },
                id,
            };
            const res = { httpCode: 401, errorCode: 'AUTHENTICATION_ERROR', isOperational: true };

            wsApi.setOnMessage(function (rawMessage) {
                if (rawMessage === JSON.stringify(res)) {
                    done();
                }
            });
            wsApi.send(req);
        });
        it('should fail add subscription on invalid token', function (done) {
            const id = generateUid();
            const projectUid = 'wABnaPYiSLyHncJVmTWHE2'; // DbSeeds.json
            const req = {
                jsonrpc: '2.0',
                method: 'add',
                params: {
                    data: [WS_CHANNELS.POS, WS_CHANNELS.ALARM],
                    entity: 'subscriptions',
                    userEmail: 'test2@redpointpositioning.com',
                    authToken: generateUid(),
                    project_uid: projectUid,
                },
                id,
            };
            const res = { httpCode: 401, errorCode: 'AUTHENTICATION_ERROR', isOperational: true };

            wsApi.setOnMessage(function (rawMessage) {
                if (rawMessage === JSON.stringify(res)) {
                    done();
                }
            });
            wsApi.send(req);
        });
        it('should fail add subscription for non existed user', function (done) {
            const id = generateUid();
            const projectUid = 'wABnaPYiSLyHncJVmTWHE2'; // DbSeeds.json
            const req = {
                jsonrpc: '2.0',
                method: 'add',
                params: {
                    data: [WS_CHANNELS.POS, WS_CHANNELS.ALARM],
                    entity: 'subscriptions',
                    userEmail: 'nonexist@redpointpositioning.com',
                    authToken: generateToken({ user: { email: 'nonexist@redpointpositioning.com' } }),
                    project_uid: projectUid,
                },
                id,
            };
            const res = { httpCode: 401, errorCode: 'AUTHENTICATION_ERROR', isOperational: true };

            wsApi.setOnMessage(function (rawMessage) {
                if (rawMessage === JSON.stringify(res)) {
                    done();
                }
            });
            wsApi.send(req);
        });
    });

    describe('delete method', function () {
        beforeEach(async function () {
            wsApi = new WsApi();
            await wsApi.init();
        });

        afterEach(async function () {
            wsApi.close();
        });

        it('should handle delete subscriptions request', function (done) {
            const id = generateUid();
            const projectUid = 'wABnaPYiSLyHncJVmTWHE2'; // DbSeeds.json
            const req = {
                jsonrpc: '2.0',
                method: 'delete',
                params: {
                    data: [WS_CHANNELS.POS, WS_CHANNELS.ALARM],
                    entity: 'subscriptions',
                    userEmail: 'test@redpointpositioning.com',
                    authToken: generateToken({ user: { email: 'test@redpointpositioning.com' } }),
                    project_uid: projectUid,
                },
                id,
            };
            wsApi.setOnMessage(function (rawMessage) {
                const message = JSON.parse(rawMessage);
                if (message.id === id) {
                    assert.deepStrictEqual(message.result, req.params.data);
                    done();
                }
            });
            wsApi.send(req);
        });
        it('should fail delete subscriptions for not supported channels', function (done) {
            const id = generateUid();
            const projectUid = 'wABnaPYiSLyHncJVmTWHE2'; // DbSeeds.json
            const req = {
                jsonrpc: '2.0',
                method: 'delete',
                params: {
                    data: [WS_CHANNELS.POS, WS_CHANNELS.ALARM, 'not_supported'],
                    entity: 'subscriptions',
                    userEmail: 'test@redpointpositioning.com',
                    authToken: generateToken({ user: { email: 'test@redpointpositioning.com' } }),
                    project_uid: projectUid,
                },
                id,
            };
            const res = { httpCode: 422, errorCode: 'VALIDATION_ERROR', isOperational: true };
            wsApi.setOnMessage(function (rawMessage) {
                if (rawMessage === JSON.stringify(res)) {
                    done();
                }
            });
            wsApi.send(req);
        });
        it('should fail delete subscriptions for invalid entity', function (done) {
            const id = generateUid();
            const projectUid = 'wABnaPYiSLyHncJVmTWHE2'; // DbSeeds.json
            const req = {
                jsonrpc: '2.0',
                method: 'delete',
                params: {
                    data: [WS_CHANNELS.POS, WS_CHANNELS.ALARM],
                    entity: 'invalidentity',
                    userEmail: 'test@redpointpositioning.com',
                    authToken: generateToken({ user: { email: 'test@redpointpositioning.com' } }),
                    project_uid: projectUid,
                },
                id,
            };
            const res = { httpCode: 422, errorCode: 'VALIDATION_ERROR', isOperational: true };
            wsApi.setOnMessage(function (rawMessage) {
                if (rawMessage === JSON.stringify(res)) {
                    done();
                }
            });
            wsApi.send(req);
        });
        it('should fail delete subscriptions in case of absence project uid', function (done) {
            const id = generateUid();
            const projectUid = 'wABnaPYiSLyHncJVmTWHE2'; // DbSeeds.json
            const req = {
                jsonrpc: '2.0',
                method: 'delete',
                params: {
                    data: [WS_CHANNELS.POS, WS_CHANNELS.ALARM],
                    entity: 'subscriptions',
                    userEmail: 'test@redpointpositioning.com',
                    authToken: generateToken({ user: { email: 'test@redpointpositioning.com' } }),
                },
                id,
            };
            const res = { httpCode: 422, errorCode: 'VALIDATION_ERROR', isOperational: true };
            wsApi.setOnMessage(function (rawMessage) {
                if (rawMessage === JSON.stringify(res)) {
                    done();
                }
            });
            wsApi.send(req);
        });
        it('should fail delete subscription if token email not equal to sent userEmail', function (done) {
            const id = generateUid();
            const projectUid = 'wABnaPYiSLyHncJVmTWHE2'; // DbSeeds.json
            const req = {
                jsonrpc: '2.0',
                method: 'delete',
                params: {
                    data: [WS_CHANNELS.POS, WS_CHANNELS.ALARM],
                    entity: 'subscriptions',
                    userEmail: 'test2@redpointpositioning.com',
                    authToken: generateToken({ user: { email: 'test@redpointpositioning.com' } }),
                    project_uid: projectUid,
                },
                id,
            };
            const res = { httpCode: 401, errorCode: 'AUTHENTICATION_ERROR', isOperational: true };

            wsApi.setOnMessage(function (rawMessage) {
                if (rawMessage === JSON.stringify(res)) {
                    done();
                }
            });
            wsApi.send(req);
        });
        it('should fail delete subscription on invalid token', function (done) {
            const id = generateUid();
            const projectUid = 'wABnaPYiSLyHncJVmTWHE2'; // DbSeeds.json
            const req = {
                jsonrpc: '2.0',
                method: 'delete',
                params: {
                    data: [WS_CHANNELS.POS, WS_CHANNELS.ALARM],
                    entity: 'subscriptions',
                    userEmail: 'test2@redpointpositioning.com',
                    authToken: generateUid(),
                    project_uid: projectUid,
                },
                id,
            };
            const res = { httpCode: 401, errorCode: 'AUTHENTICATION_ERROR', isOperational: true };

            wsApi.setOnMessage(function (rawMessage) {
                if (rawMessage === JSON.stringify(res)) {
                    done();
                }
            });
            wsApi.send(req);
        });
        it('should fail delete subscription for non existed user', function (done) {
            const id = generateUid();
            const projectUid = 'wABnaPYiSLyHncJVmTWHE2'; // DbSeeds.json
            const req = {
                jsonrpc: '2.0',
                method: 'delete',
                params: {
                    data: [WS_CHANNELS.POS, WS_CHANNELS.ALARM],
                    entity: 'subscriptions',
                    userEmail: 'nonexist@redpointpositioning.com',
                    authToken: generateToken({ user: { email: 'nonexist@redpointpositioning.com' } }),
                    project_uid: projectUid,
                },
                id,
            };
            const res = { httpCode: 401, errorCode: 'AUTHENTICATION_ERROR', isOperational: true };

            wsApi.setOnMessage(function (rawMessage) {
                if (rawMessage === JSON.stringify(res)) {
                    done();
                }
            });
            wsApi.send(req);
        });
    });

    describe('notify method', function () {
        beforeEach(async function () {
            wsApi = new WsApi();
            await wsApi.init();
        });

        afterEach(async function () {
            wsApi.close();
        });

        it('should receive pos messages', function (done) {
            const id = generateUid();
            const projectUid = 'wABnaPYiSLyHncJVmTWHE2'; // DbSeeds.json
            const mac = '00000000001a';
            const pos = createPosition(mac);
            const req = {
                jsonrpc: '2.0',
                method: 'add',
                params: {
                    data: [WS_CHANNELS.POS],
                    entity: 'subscriptions',
                    userEmail: 'test@redpointpositioning.com',
                    authToken: generateToken({ user: { email: 'test@redpointpositioning.com' } }),
                    project_uid: projectUid,
                },
                id,
            };
            wsApi.setOnMessage(function (rawMessage) {
                const message = JSON.parse(rawMessage);
                if (message.id === id) {
                    zmqPublisher.send('$pos', pos);
                }
                if (message.method === 'notify') {
                    const { subscription, data } = message.params;
                    assert(subscription === 'pos', 'Subscription is not equal to pos');
                    assert(data.ts * 1000 + data.ms === new Date(pos.ts).getTime(), 'Timestamps not equal');
                    assert(data.mac === pos.data.mac.toUpperCase(), 'MACs not equal');
                    assert(data.x === pos.data.x, 'X coordinate not equal');
                    assert(data.y === pos.data.y, 'Y coordinate not equal');
                    assert(data.z === pos.data.z, 'Z coordinate not equal');
                    done();
                }
            });
            wsApi.send(req);
        });

        it('should receive notify messages', function (done) {
            const id = generateUid();
            const projectUid = 'wABnaPYiSLyHncJVmTWHE2'; // DbSeeds.json
            const notify = createNotify('ZONE', 'created', projectUid);
            const req = {
                jsonrpc: '2.0',
                method: 'add',
                params: {
                    data: [WS_CHANNELS.NOTIFY],
                    entity: 'subscriptions',
                    userEmail: 'test@redpointpositioning.com',
                    authToken: generateToken({ user: { email: 'test@redpointpositioning.com' } }),
                    project_uid: projectUid,
                },
                id,
            };
            wsApi.setOnMessage(function (rawMessage) {
                const message = JSON.parse(rawMessage);
                if (message.id === id) {
                    zmqPublisher.send('#notify', notify);
                }

                if (message.method === 'notify') {
                    const { subscription, data } = message.params;
                    assert(subscription === 'notify', 'Subscription is not equal to "notify"');
                    assert(data.object === notify.object, 'Objects not equal');
                    assert(data.action === notify.action, 'Actions not equal');
                    done();
                }
            });
            wsApi.send(req);
        });

        it('should receive alarm messages', function (done) {
            const id = generateUid();
            const projectUid = 'wABnaPYiSLyHncJVmTWHE2'; // DbSeeds.json
            const uid = generateUid();
            const alarm = createAlarm(uid, projectUid);
            const req = {
                jsonrpc: '2.0',
                method: 'add',
                params: {
                    data: [WS_CHANNELS.ALARM],
                    entity: 'subscriptions',
                    userEmail: 'test@redpointpositioning.com',
                    authToken: generateToken({ user: { email: 'test@redpointpositioning.com' } }),
                    project_uid: projectUid,
                },
                id,
            };
            wsApi.setOnMessage(function (rawMessage) {
                const message = JSON.parse(rawMessage);
                if (message.id === id) {
                    zmqPublisher.send('#alarm', alarm);
                }

                if (message.method === 'notify') {
                    const { subscription, data } = message.params;
                    assert(subscription === 'alarm', 'Subscription is not equal to "alarm"');
                    assert(data.uid === alarm.uid, 'UID`s not equal');
                    done();
                }
            });
            wsApi.send(req);
        });

        it('should receive sensor messages', function (done) {
            const id = generateUid();
            const projectUid = 'wABnaPYiSLyHncJVmTWHE2'; // DbSeeds.json
            const uid = generateUid();
            const now = new Date().getTime();
            const ms = now % 1000;
            const ts = Math.floor((now - ms) / 1000);
            const sensor = { ts, ms, uid, project_uid: projectUid };

            const req = {
                jsonrpc: '2.0',
                method: 'add',
                params: {
                    data: [WS_CHANNELS.SENSOR],
                    entity: 'subscriptions',
                    userEmail: 'test@redpointpositioning.com',
                    authToken: generateToken({ user: { email: 'test@redpointpositioning.com' } }),
                    project_uid: projectUid,
                },
                id,
            };
            wsApi.setOnMessage(function (rawMessage) {
                const message = JSON.parse(rawMessage);
                if (message.id === id) {
                    zmqPublisher.send('#sensor', sensor);
                }

                if (message.method === 'notify') {
                    const { subscription, data } = message.params;
                    assert(subscription === 'sensor', 'Subscription is not equal to "sensor"');
                    assert(data.uid === sensor.uid, 'UID`s not equal');
                    done();
                }
            });
            wsApi.send(req);
        });

        it('should receive ota messages', function (done) {
            const id = generateUid();
            const uid = generateUid();
            const projectUid = 'wABnaPYiSLyHncJVmTWHE2'; // DbSeeds.json
            const mac = '00000000001a';
            const ota = createOta(mac, uid);

            const req = {
                jsonrpc: '2.0',
                method: 'add',
                params: {
                    data: [WS_CHANNELS.OTA],
                    entity: 'subscriptions',
                    userEmail: 'test@redpointpositioning.com',
                    authToken: generateToken({ user: { email: 'test@redpointpositioning.com' } }),
                    project_uid: projectUid,
                },
                id,
            };
            wsApi.setOnMessage(function (rawMessage) {
                const message = JSON.parse(rawMessage);
                if (message.id === id) {
                    zmqPublisher.send('#ota', ota);
                }

                if (message.method === 'notify') {
                    const { subscription, data } = message.params;
                    assert(subscription === 'ota', 'Subscription is not equal to "sensor"');
                    assert(data.uid === ota.uid, 'UID`s not equal');
                    done();
                }
            });
            wsApi.send(req);
        });

        it('should receive zone_event messages', function (done) {
            const id = generateUid();
            const projectUid = 'wABnaPYiSLyHncJVmTWHE2'; // DbSeeds.json
            const uid = generateUid();
            const zoneEvent = createZoneEvent(uid, projectUid);
            const req = {
                jsonrpc: '2.0',
                method: 'add',
                params: {
                    data: [WS_CHANNELS.ZONE_EVENT],
                    entity: 'subscriptions',
                    userEmail: 'test@redpointpositioning.com',
                    authToken: generateToken({ user: { email: 'test@redpointpositioning.com' } }),
                    project_uid: projectUid,
                },
                id,
            };
            wsApi.setOnMessage(function (rawMessage) {
                const message = JSON.parse(rawMessage);
                if (message.id === id) {
                    zmqPublisher.send('#zone_event', zoneEvent);
                }

                if (message.method === 'notify') {
                    const { subscription, data } = message.params;
                    assert(subscription === 'zone_event', 'Subscription is not equal to "zone_event"');
                    assert(data.uid === zoneEvent.uid, 'UID`s not equal');
                    done();
                }
            });
            wsApi.send(req);
        });

        it('should close WS connection on user delete', function (done) {
            const id = generateUid();
            const projectUid = 'wABnaPYiSLyHncJVmTWHE2'; // DbSeeds.json
            const userDelete = {
                object: 'USER',
                action: 'deleted',
                plist: { deletedUserEmail: 'test@redpointpositioning.com' },
            };
            const req = {
                jsonrpc: '2.0',
                method: 'add',
                params: {
                    data: [WS_CHANNELS.ZONE_EVENT],
                    entity: 'subscriptions',
                    userEmail: 'test@redpointpositioning.com',
                    authToken: generateToken({ user: { email: 'test@redpointpositioning.com' } }),
                    project_uid: projectUid,
                },
                id,
            };
            wsApi.setOnMessage(function (rawMessage) {
                const message = JSON.parse(rawMessage);
                if (message.id === id) {
                    zmqPublisher.send('#notify', userDelete);
                }
            });
            wsApi.setOnClose(function () {
                done();
            });
            wsApi.send(req);
        });

        it('should close WS connection on user update', function (done) {
            const id = generateUid();
            const projectUid = 'wABnaPYiSLyHncJVmTWHE2'; // DbSeeds.json
            const userDelete = { object: 'USER', action: 'updated', plist: { email: 'test@redpointpositioning.com' } };
            const req = {
                jsonrpc: '2.0',
                method: 'add',
                params: {
                    data: [WS_CHANNELS.ZONE_EVENT],
                    entity: 'subscriptions',
                    userEmail: 'test@redpointpositioning.com',
                    authToken: generateToken({ user: { email: 'test@redpointpositioning.com' } }),
                    project_uid: projectUid,
                },
                id,
            };
            wsApi.setOnMessage(function (rawMessage) {
                const message = JSON.parse(rawMessage);
                if (message.id === id) {
                    zmqPublisher.send('#notify', userDelete);
                }
            });
            wsApi.setOnClose(function () {
                done();
            });
            wsApi.send(req);
        });

        it('should close WS connection on project user access update', function (done) {
            const id = generateUid();
            const projectUid = 'wABnaPYiSLyHncJVmTWHE2'; // DbSeeds.json
            const userDelete = {
                object: 'PROJECT_USER_ACCESS',
                action: 'updated',
                plist: { email: 'test@redpointpositioning.com' },
            };
            const req = {
                jsonrpc: '2.0',
                method: 'add',
                params: {
                    data: [WS_CHANNELS.ZONE_EVENT],
                    entity: 'subscriptions',
                    userEmail: 'test@redpointpositioning.com',
                    authToken: generateToken({ user: { email: 'test@redpointpositioning.com' } }),
                    project_uid: projectUid,
                },
                id,
            };
            wsApi.setOnMessage(function (rawMessage) {
                const message = JSON.parse(rawMessage);
                if (message.id === id) {
                    zmqPublisher.send('#notify', userDelete);
                }
            });
            wsApi.setOnClose(function () {
                done();
            });
            wsApi.send(req);
        });
    });
});
