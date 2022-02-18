import fs from 'fs';

class SQLiteSession extends StringSession {
    constructor(session_path, acc_path) {
        let acc_data = JSON.parse(fs.readFileSync(acc_path));
        for (let prop in acc_data) {
            this.prop = acc_data[prop];
        }
    }
}
