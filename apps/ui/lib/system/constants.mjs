export const BOT_COMMAND = {
    START: 'start',
    ADD_TRACK_PHONE: 'add_track_phone',
    EDIT_TRACK_PHONES_MENU: 'edit_track_phones_menu',
    STOP_TRACK_PHONE: 'stop_track_phone',
    GET_TRACK_STATUS: 'get_track_status',
};

export const BOT_COMMAND_UI = {
    START: '/start',
    ADD_TRACK_PHONE: '/add_number',
    EDIT_TRACK_PHONES: '/edit_numbers',
    STOP_TRACK_PHONE: '/stop_track',
    GET_TRACK_STATUS: '/get_status',
};

export const BOT_COMMANDS = [
    { command: BOT_COMMAND_UI.START, description: 'Добавить номер и начать отслеживание' },
    { command: BOT_COMMAND_UI.ADD_TRACK_PHONE, description: 'Добавить номер и начать отслеживание' },
    { command: BOT_COMMAND_UI.EDIT_TRACK_PHONES, description: 'Список отслеживаемых номеров / Удалить номер' },
    { command: BOT_COMMAND_UI.GET_TRACK_STATUS, description: 'Статус отслеживания' },
];
