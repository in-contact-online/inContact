export function parseSafeNull(string) {
    let result = null;
    if (string === null || string === undefined) {
        return string;
    }
    try {
        result = JSON.parse(string);
    } catch (e) {
        console.error(`Error parsing "${string}"`, e);
    }
    return result;
}

/**
 * @function
 * @param {String} rawMessage - input ZMQ message message
 * @return {Object<channel<String>,message<String>>} - separated ZMQ channel and message
 */
export function getChannelWithMessage(rawMessage = '') {
    const index = rawMessage.indexOf('{');
    const channel = (rawMessage.substring(0, index) || '').replace(/\s/g, '');
    const message = parseSafeNull(rawMessage.substring(index)) || null;

    return {
        channel,
        message,
    };
}
