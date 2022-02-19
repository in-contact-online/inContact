import { Client } from './Client.mjs';
import { writeToFile, readDir, readSqlite } from '../../utils/index.mjs';

export class Session {
     #config = null;
     #pool = [];
 
     constructor(config) {
         this.#config = config;
     }
 
     async init() {
         const sessionFiles = await readDir(this.#config.sessionsFolder, '.session');
         for (const sessionFile of sessionFiles) {
             const session = await readSqlite(sessionFile, 'sessions');
             const client = new Client(session, this.#config);
             await client.init();
             this.#pool.push(client);
         }
     }
 
     async invokeEach(command) {
         for (const client of this.#pool) {
             const result = await client.invoke(command);
             await writeToFile(result.users);
         }
     }
 }
