import { randomInt } from '../utils';
import { generateUid } from '../../lib/utils';
import { main } from '../../appSetup';
import { Repository } from '../utils/Repository';
import DbSeeds from '../seeds/data.json';

/**
 * @function
 * @param {String} mac - hardware device MAC address
 * @return {Object}
 */
export function createPosition(mac) {
    return {
        tk_uid: generateUid(),
        ts: new Date().toISOString(),
        data: {
            x: randomInt(),
            y: randomInt(),
            z: randomInt(),
            sl_uid: generateUid(),
            type: 'UWB',
            mac,
        },
    };
}

/**
 * @function
 * @param {String} object - object name (ZONE, NODE, ...)
 * @param {String} action - action type (created, updated, ...)
 * @param {String} projectUid - project unique identifier
 * @return {Object}
 */
export function createNotify(object, action, projectUid) {
    const now = new Date().getTime();
    const ms = now % 1000;
    const ts = Math.floor((now - ms) / 1000);

    return {
        ts,
        ms,
        object,
        action,
        project_uid: projectUid,
        plist: {},
    };
}

/**
 * @function
 * @param {String} uid - alarm unique identifier
 * @param {String} projectUid - project unique identifier
 * @return {Object}
 */
export function createAlarm(uid, projectUid) {
    const now = new Date().getTime();
    const ms = now % 1000;
    const ts = Math.floor((now - ms) / 1000);

    return {
        ts,
        ms,
        alarm_name: 'zone_violation',
        state: 'set',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        project_uid: projectUid,
        sublocation_uid: generateUid(),
        uid,
    };
}

/**
 * @function
 * @param {String} mac - hardware MAC address
 * @param {String} uid
 * @return {Object}
 */
export function createOta(mac, uid) {
    const now = new Date().getTime();
    const ms = now % 1000;
    const ts = Math.floor((now - ms) / 1000);

    return {
        ts,
        ms,
        mac,
        uid,
        type: 'ota_page_req',
        plist: {
            git: '5F013059',
            crc: 'EFA6DB81',
            page_sz: 512,
            page_n: 84
        },
        id: randomInt(),
    };
}

/**
 * @function
 * @param {String} uid - alarm unique identifier
 * @param {String} projectUid - project unique identifier
 * @return {Object}
 */
export function createZoneEvent(uid, projectUid) {
    const now = new Date().getTime();
    const ms = now % 1000;
    const ts = Math.floor((now - ms) / 1000);

    return {
        ts,
        ms,
        action: 'leave',
        state: 'set',
        x: randomInt(),
        y: randomInt(),
        z: randomInt(),
        project_uid: projectUid,
        sublocation_uid: generateUid(),
        zone_uid: generateUid(),
        zone_type_name: 'keep_in',
        uid // need as identificator for test
    };
}

let initialized;
export const Server = () => {
    const serverStart = () => {
        return main();
    }
    
    return {
        init: () => {
            if (!initialized) {
                initialized = serverStart();
            }
            return initialized;
        }
    }
}

export async function initRepoData() {
    const repository = new Repository();
    for (const migration of DbSeeds.migrations) {
        await repository.runSql(migration);
    }
    for (const user of DbSeeds.users) {
        await repository.createUser(user);
    }
    for (const node of DbSeeds.nodes) {
        await repository.createNode(node);
    }
}

export async function clearRepoData() {
    const repository = new Repository();

    for (const user of DbSeeds.users) {
        await repository.deleteUser(user.email);
    }
    for (const node of DbSeeds.nodes) {
        await repository.deleteNode(node.mac);
    }
}