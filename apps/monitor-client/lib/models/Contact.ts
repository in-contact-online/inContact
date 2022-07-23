export interface IContact {
    id: number;
    userId: number;
    sessionId: string;
    trackedPhone: string;
    tracked: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IContactRaw {
    id: number;
    user_id: number;
    session_id: string;
    tracked_phone: string;
    tracked: boolean;
    created_at: string;
    updated_at: string;
}

export interface IContacsReposnse {
    data: IContact[];
    total: number;
}

export class Contact implements IContact {
    userId: number;

    id: number;

    sessionId: string;

    trackedPhone: string;

    tracked: boolean;

    createdAt: string;

    updatedAt: string;

    constructor(props: IContactRaw) {
        this.userId = props.user_id;
        this.id = props.id;
        this.sessionId = props.session_id;
        this.trackedPhone = props.tracked_phone;
        this.tracked = props.tracked;
        this.createdAt = props.created_at;
        this.updatedAt = props.updated_at;
    }
}
