const BrowserKeys = {
    UserToken: 'IN_CONTACT_APP_TOKEN',
};

class AppPersistentStorage {
    private local: Storage;

    /**
     * @param {WindowLocalStorage} localStorage - browser local storage
     */
    constructor(localStorage: Storage) {
        this.local = localStorage;
    }

    /**
     * @method Read token in a local storage
     * @return {string|null}
     */
    get apiToken() {
        return this.local.getItem(BrowserKeys.UserToken);
    }
}

export const appPersistentStorage = new AppPersistentStorage(localStorage);
