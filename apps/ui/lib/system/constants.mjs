export const BOT_COMMAND = {
    HELP: 'help',
    ADD_TRACK_PHONE: 'add_track_phone',
    ADD_EMAIL: 'add_email',
    ADD_TRACK_PHONE_MENU: 'add_track_phone_menu',
    NOTIFY_WHEN_ONLINE: 'notify_when_online',
    EDIT_TRACK_PHONES_MENU: 'edit_track_phones_menu',
    STOP_TRACK_PHONE: 'stop_track_phone',
    LEAVE_CHAT: 'user_leave_chat',
    RESTART_CHAT: 'user_restart_chat',
};

export const BOT_COMMAND_UI = {
    START: '/start',
    HELP: '/help',
    NOTIFY_WHEN_ONLINE: '/notify_online',
    EDIT_TRACK_PHONES: '/edit_numbers',
    STOP_TRACK_PHONE: '/stop_track',
};

export const BOT_COMMANDS = [
    { command: BOT_COMMAND_UI.HELP, description: 'Общая информация' },
    { command: BOT_COMMAND_UI.NOTIFY_WHEN_ONLINE, description: 'Сообщить когда номер онлайн' },
    { command: BOT_COMMAND_UI.EDIT_TRACK_PHONES, description: 'Список отслеживаемых номеров / Удалить номер' },
];
