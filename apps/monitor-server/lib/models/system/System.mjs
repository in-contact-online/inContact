import os from 'os';
import moment from 'moment';
import ModelBase from '../ModelBase.mjs';

/**
 * @swagger
 * components:
 *  schemas:
 *      System:
 *          type: object
 *          properties:
 *              serviceStatuses:
 *                  type: object
 *              resourceUsage:
 *                  type: object
 *                  properties:
 *                      cpuUsage:
 *                          type: number
 *                          description: CPU usgae in perecent.
 *                      freeMemory:
 *                          type: string
 *                          description: Free memory.
 *                      totalMemory:
 *                          type: string
 *                          description: Total instance memory.
 *                      serverUptime:
 *                          type: string
 *                          description: Server uptime.
 */
export class System extends ModelBase {
    /**
     * @typedef {Class} System
     * @property readStatuses
     * @property readResourceUsage
     */

    /**
     * @method
     * @returns {Promise<Object>}
     */
    async readStatuses() {
        //todo: check services statuses active/inactive/uptime
        return {};
    }

    /**
     * @method
     * @returns {Promise<Object>}
     */
    async readResourceUsage() {
        const cpus = os.cpus();
        const cpuTicks = cpus.reduce(
            (memo, cpu) => {
                memo.total += cpu.times.user + cpu.times.sys;
                memo.idle += cpu.times.idle;
                return memo;
            },
            { idle: 0, total: 0 }
        );

        const freemem = os.freemem();
        const totalmem = os.totalmem();
        const uptime = os.uptime();
        const cpuUsage = Math.round((cpuTicks.idle / cpuTicks.total) * 100);
        const freeMemory = `${Math.round(freemem / (1024 * 1024))} MB`;
        const totalMemory = `${Math.round(totalmem / (1024 * 1024))} MB`;
        const serverUptime = moment.duration(uptime, 'seconds').humanize();
        return { cpuUsage, freeMemory, totalMemory, serverUptime };
    }
}
