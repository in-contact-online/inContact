const BrowserKeys = {
    showAdminFlag: 'IN_CONTACT_ADMIN_FLAG',
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
    get adminFlag() {
        return this.local.getItem(BrowserKeys.showAdminFlag);
    }
}

export const appPersistentStorage = new AppPersistentStorage(localStorage);
