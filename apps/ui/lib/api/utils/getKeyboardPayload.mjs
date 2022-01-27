export function getKeyboardPayload(data) {
    const keyboard_payload = data.map((number) => [{ text: number, callback_data: number }]);
    return { inline_keyboard: keyboard_payload };
}
