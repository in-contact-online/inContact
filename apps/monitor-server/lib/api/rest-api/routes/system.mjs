import { makeRequestHandler } from '../../utils/index.mjs';
import { ReadSystemHealth } from '../../../usecases/index.mjs';

export const systemHealth = {
    /**
     * @swagger
     * /system_health:
     *   get:
     *     description: Retrieve system health status
     *     tags:
     *       - System Health API
     *     responses:
     *       '200':
     *         description: system health
     *         content:
     *          application/json:
     *              schema:
     *                  $ref: '#/components/schemas/System'
     *              example:
     *                  serviceStatuses: {}
     *                  resourceUsage:
     *                      cpuUsage: 30
     *                      freeMemory: 3011 MB
     *                      totalMemory: 15820 MB
     *                      serverUptime: 17 days
     */
    read: makeRequestHandler(
        ReadSystemHealth,
        () => ({}),
        (result, res) => {
            res.send(result);
        }
    ),
};
