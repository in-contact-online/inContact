import { makeRequestHandler } from '../../utils/index.mjs';
import { ReadStatuses } from '../../../usecases/index.mjs';

export const statuses = {
    /**
     * @swagger
     * /statuses:
     *   get:
     *     description: Retrieve statuses list
     *     tags:
     *       - Statuses API
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
     *      - in: query
     *        name: phoneNumber
     *        schema:
     *          type: string
     *          required: false
     *          example: 380951465591
     *        description: tracked phone number
     *      - in: query
     *        name: checkFrom
     *        schema:
     *          type: string
     *          required: false
     *          example: 2022-05-01T10:00:00.000Z
     *        description: check date in ISO 8601 format
     *      - in: query
     *        name: checkTo
     *        schema:
     *          type: string
     *          required: false
     *          example: 2022-05-01T12:00:00.000Z
     *        description: check date in ISO 8601 format
     *     responses:
     *       '200':
     *         description: statuses
     *         content:
     *          application/json:
     *              schema:
     *                  $ref: '#/components/schemas/Statuses'
     *              example:
     *                  data:
     *                      -
     *                          id: 1
     *                          phone_number: 380683568045
     *                          username: null
     *                          was_online: 2021-04-21T10:00:00.000Z
     *                          check_date: 2021-04-21T10:00:00.000Z
     *                      -
     *                          id: 2
     *                          phone_number: 380683568044
     *                          username: null
     *                          was_online: 2021-04-21T10:00:00.000Z
     *                          check_date: 2021-04-21T10:00:00.000Z
     *                  total: 2
     */
    readList: makeRequestHandler(
        ReadStatuses,
        (req) => ({
            page: req.query.page,
            size: req.query.size,
            phoneNumber: req.query.phoneNumber,
            checkFrom: req.query.checkFrom,
            checkTo: req.query.checkTo,
        }),
        (result, res) => {
            res.send(result);
        }
    ),
};
