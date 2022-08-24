import { makeRequestHandler } from '../../utils/index.mjs';
import { ReadContacts } from '../../../usecases/index.mjs';

export const contacts = {
    /**
     * @swagger
     * /contacts:
     *   get:
     *     description: Retrieve contacts list
     *     tags:
     *       - Contacts API
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
     *        description: contacts number per page
     *     responses:
     *       '200':
     *         description: contacts
     *         content:
     *          application/json:
     *              schema:
     *                  $ref: '#/components/schemas/Contacts'
     *              example:
     *                  data:
     *                      -
     *                          user_id: 628714995
     *                          tracked_phone: +380502262641
     *                          tracked: false
     *                          created_at: 2021-04-21T10:00:00.000Z
     *                          updated_at: 2021-04-21T10:00:00.000Z
     *                          id: 1
     *                          session_id: null
     *                      -
     *                          user_id: 628714995
     *                          tracked_phone: +380502262642
     *                          tracked: false
     *                          created_at: 2021-04-21T10:00:00.000Z
     *                          updated_at: 2021-04-21T10:00:00.000Z
     *                          id: 2
     *                          session_id: null
     *                  total: 2
     */
    readList: makeRequestHandler(
        ReadContacts,
        (req) => ({
            page: req.query.page,
            size: req.query.size,
        }),
        (result, res) => {
            res.send(result);
        }
    ),
};
