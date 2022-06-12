import nodemailer from 'nodemailer';

export class TextTransport {
    /**
     * @typedef {Class} TextTransport
     * @method send
     */

    #transport = null;

    /**
     * @param {Object} options - email service options
     * @param {String} options.host - email sending host
     * @param {Number} options.port - email sending port
     * @param {String} options.user - email service user
     * @param {String} options.password - email service password
     * @param {String} options.from - sender address
     */
    constructor(options) {
        this.#transport = nodemailer.createTransport({
            host: options.host,
            port: options.port,
            secure: false, // true for 465, false for other ports
            auth: {
                user: options.user, // generated ethereal user
                pass: options.password, // generated ethereal password
            },
        });
    }

     /**
     * @method
     * @param {Object} params - filter parameters
     * @param {Number} params.message - email text
     * @param {Number} params.phone - recepient phone number
     * @returns {Promise<void>}
     */
      async send(params) {
        try {
            console.log('Send text');
            // await this.#transport.sendMail({
            //     from: 'yzhbankov@gmail.com', // sender address
            //     to: params.email, // list of receivers
            //     subject: 'In Contact Notification', // Subject line
            //     text: 'Plain text', // plain text body
            //     html: params.message, // html body
            // });
        } catch (err) {
            console.error(err);
        }
    }
}
