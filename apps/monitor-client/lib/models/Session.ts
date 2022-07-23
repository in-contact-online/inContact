export interface ISession {
    id: number;
    authKey: {
        type: string;
        data: number[];
    };
    dcId: number;
    serverAddress: string;
    port: number;
    active: boolean;
    valid: boolean;
}

export interface ISessionsReposnse {
    data: ISession[];
    total: number;
}

export interface ISessionRaw {
    id: number;
    auth_key: {
        type: string;
        data: number[];
    };
    dc_id: number;
    server_address: string;
    port: number;
    active: boolean;
    valid: boolean;
}

export class Session implements ISession {
    id: number;

    authKey: { type: string; data: number[] };

    dcId: number;

    serverAddress: string;

    port: number;

    active: boolean;

    valid: boolean;

    constructor(props: ISessionRaw) {
        this.id = props.id;
        this.authKey = props.auth_key;
        this.dcId = props.dc_id;
        this.serverAddress = props.server_address;
        this.port = props.port;
        this.active = props.active;
        this.valid = props.valid;
    }
}
