import { makeRequestHandler } from '../../utils/index.mjs';
import { ReadUsers } from '../../../usecases/index.mjs';

export const users = {
    /**
     * @swagger
     * /users:
     *   get:
     *     description: Retrieve users list
     *     tags:
     *       - Users API
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
     *        description: users number per page
     *     responses:
     *       '200':
     *         description: users
     *         content:
     *          application/json:
     *              schema:
     *                  $ref: '#/components/schemas/Users'
     *              example:
     *                  data:
     *                      -
     *                          id: 1039964138
     *                          username: null
     *                          first_name: null
     *                          second_name: null
     *                          phone: null
     *                          active: true
     *                          created_at: 2021-04-21T10:00:00.000Z
     *                          updated_at: 2021-04-21T10:00:00.000Z
     *                      -
     *                          id: 1039964139
     *                          username: null
     *                          first_name: null
     *                          second_name: null
     *                          phone: null
     *                          active: true
     *                          created_at: 2021-04-21T10:00:00.000Z
     *                          updated_at: 2021-04-21T10:00:00.000Z
     *                  total: 2
     */
    readList: makeRequestHandler(
        ReadUsers,
        (req) => ({
            page: req.query.page,
            size: req.query.size,
        }),
        (result, res) => {
            res.send(result);
        }
    ),
};
