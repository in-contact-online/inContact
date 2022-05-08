import { makeRequestHandler } from '../../utils/index.mjs';
import { ReadSessions } from '../../../usecases/index.mjs';

export const sessions = {
    /**
     * @swagger
     * /sessions:
     *   get:
     *     description: Retrieve sessions list
     *     tags:
     *       - Sessions API
     *     parameters:
     *      - in: query
     *        name: page
     *        schema:
     *          type: number
     *          required: true
     *          example: 0
     *        description: page number
     *      - in: query
     *        name: size
     *        schema:
     *          type: number
     *          required: true
     *          example: 10
     *        description: sessions number per page
     *     responses:
     *       '200':
     *         description: sessions
     *         content:
     *          application/json:
     *              schema:
     *                  $ref: '#/components/schemas/Sessions'
     *              example:
     *                  data:
     *                      -
     *                          id: +79118453479
     *                          auth_key:
     *                              type: Buffer
     *                              data: [134,132,69,117,185,158,10]
     *                          dc_id: 2
     *                          server_address: 149.154.167.51
     *                          port: 443
     *                          active: true
     *                          valid: true
     *                      -
     *                          id: +79118453478
     *                          auth_key:
     *                              type: Buffer
     *                              data: [134,132,69,117,185,158,10]
     *                          dc_id: 2
     *                          server_address: 149.154.167.51
     *                          port: 443
     *                          active: true
     *                          valid: true
     *                  total: 2
     */
    readList: makeRequestHandler(
        ReadSessions,
        (req) => ({
            page: req.query.page,
            size: req.query.size,
        }),
        (result, res) => {
            res.send(result);
        }
    ),
};
