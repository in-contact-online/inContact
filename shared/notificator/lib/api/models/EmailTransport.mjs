import nodemailer from 'nodemailer';

export class EmailTransport {
    /**
     * @typedef {Class} EmailTransport
     * @method sendEmail
     */

    #transport = null;

    #config = null;

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

        this.#config = options;
    }

     /**
     * @method
     * @param {Object} params - filter parameters
     * @param {Number} params.text - email text
     * @param {Number} params.from - email address
     * @param {Number} params.to - email address
     * @param {Number} params.subject - email address
     * @returns {Promise<void>}
     */
      async send(params) {
        try {
            await this.#transport.sendMail({
                from: params.from || this.#config.from, // sender address
                to: params.to, // list of receivers
                subject: params.subject, // Subject line
                text: params.text, // plain text body
                html: '', // html body
            });
        } catch (err) {
            console.error(err);
        }
    }
}
