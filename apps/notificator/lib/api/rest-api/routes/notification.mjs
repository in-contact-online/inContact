import { makeRequestHandler } from '../../utils/index.mjs';
import { SendEmail, SendTextMessage } from '../../../usecases/index.mjs';

export const notification = {
    /**
     * @swagger
     * /notification/email:
     *   post:
     *     description: Send email notification
     *     tags:
     *       - Notifications API
     *     requestBody:
     *      content:
     *          application/json:
     *              schema:
     *                  $ref: '#/components/schemas/AnchorCreateBody'
     *              example:
     *                  email: test@gmail.com
     *                  message: Notification message
     *     responses:
     *       '200':
     *         content:
     *          application/json:
     *              schema:
     *                  $ref: '#/components/schemas/Anchor'
     *              example:
     *                  email: test@gmail.com
     *                  message: Notification message
     *       '422':
     *         description: Invalid request parameters.
     *         content:
     *          application/json:
     *              schema:
     *                  $ref: '#/components/schemas/ValidationError'
     *              examples:
     *                  Email not specify:
     *                      value:
     *                          message: '{"email":"REQUIRED"}'
     *                          code: VALIDATION_ERROR
     *                  Empty email:
     *                      value:
     *                          message: '{"email":"CANNOT_BE_EMPTY"}'
     *                          code: VALIDATION_ERROR
     *                  Message not specify:
     *                      value:
     *                          message: '{"message":"REQUIRED"}'
     *                          code: VALIDATION_ERROR
     *                  Empty message:
     *                      value:
     *                          message: '{"message":"CANNOT_BE_EMPTY"}'
     *                          code: VALIDATION_ERROR
     */
    sendEmail: makeRequestHandler(
        SendEmail,
        (req) => ({
            email: req.body.email,
            message: req.body.message,
        }),
        (result, res) => {
            res.send(result);
        }
    ),

    /**
     * @swagger
     * /notification/text_message:
     *   post:
     *     description: Send email notification
     *     tags:
     *       - Notifications API
     *     requestBody:
     *      content:
     *          application/json:
     *              schema:
     *                  $ref: '#/components/schemas/AnchorCreateBody'
     *              example:
     *                  phone: +380951444482
     *                  message: Notification message
     *     responses:
     *       '200':
     *         content:
     *          application/json:
     *              schema:
     *                  $ref: '#/components/schemas/Anchor'
     *              example:
     *                  phone: +380951444482
     *                  message: Notification message
     *       '422':
     *         description: Invalid request parameters.
     *         content:
     *          application/json:
     *              schema:
     *                  $ref: '#/components/schemas/ValidationError'
     *              examples:
     *                  Phone not specify:
     *                      value:
     *                          message: '{"phone":"REQUIRED"}'
     *                          code: VALIDATION_ERROR
     *                  Empty phone:
     *                      value:
     *                          message: '{"phone":"CANNOT_BE_EMPTY"}'
     *                          code: VALIDATION_ERROR
     *                  Message not specify:
     *                      value:
     *                          message: '{"message":"REQUIRED"}'
     *                          code: VALIDATION_ERROR
     *                  Empty message:
     *                      value:
     *                          message: '{"message":"CANNOT_BE_EMPTY"}'
     *                          code: VALIDATION_ERROR
     */
    sendTestMessage: makeRequestHandler(
        SendTextMessage,
        (req) => ({
            phone: req.body.phone,
            message: req.body.message,
        }),
        (result, res) => {
            res.send(result);
        }
    ),
};
