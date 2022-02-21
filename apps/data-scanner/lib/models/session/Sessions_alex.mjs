import { TelegramClient } from 'telegram';

export class Sessions {
    /**
     * @typedef {Class} Sessions
     * @property #pool
     * @property #api_id
     * @property #api_hash
     * @property #command
     * @method addSession
     * @method removeSession
     * @method run
     */

    #pool = [];
    #api_id = null;
    #api_hash = null;
    #command = null;

    constructor(command, apiConfig) {
        this.#command = command;
        this.#api_id = apiConfig.api_id;
        this.#api_hash = apiConfig.api_hash;
        //TODO: implement session bd level
        this.#pool = this.repository.read();
    }

    static isSuccessfulCommand(command, result) {
        switch (true) {
            case command instanceof Api.contacts.ImportContacts: {
                if (result.users.length !== 0) return true;
                break;
            }
        }
        return false;
    }

    async run() {
        for (let session in this.#pool) {
            let client = new TelegramClient(session, this.#api_id, this.#api_hash);
            let result = await client.invoke(this.#command);
            if (Sessions.isSuccessfulCommand(this.#command, result)) return result;
            else {
                //Mark session with error
            }
        }
        return false;
    }
}
