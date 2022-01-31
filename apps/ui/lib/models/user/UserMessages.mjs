export class UserMessages {
    static welcomeMessage() {
        return `Привет. Это бот трекинга статусов телеграм аккаунтов.
Доступные команды:
<b>/start</b> - Запустить бота / Помощь и команды
<b>/add_number</b> - Добавить номер и начать отслеживание
<b>/edit_numbers</b> - Список отслеживаемых номеров / Удалить номер
<b>/get_status</b> - Статус отслеживания`;
    }

    static editTrackingMessage() {
        return '<b>Ваш список номеров.</b> <i>Выберите номер, если хотите удалить его из базы и прекратить отслеживание:</i>';
    }

    static noTrackingMessage() {
        return '<b>У вас нет отслеживаемых номеров.</b>';
    }

    static phoneStopTracking(phone) {
        return `Номер ${phone} больше не отслеживается`;
    }

    static phoneStartTracking(phone) {
        return `Номер ${phone} добавлен и начал отслеживаться`;
    }

    static phoneActivateTracking(phone) {
        return `По номеру ${phone} возобновлено отслеживание`;
    }
    static welcomeAddingMessage() {
        return `Добавьте номер на отслеживание в формате <b>+380992112233</b> или <b>+71234567890</b>`;
    }

    static dublicatePhone(phone) {
        return `Номер ${phone} уже отслеживается`;
    }

    static unknownCommand() {
        return `Неправильная команда. Повторите пожалуйста!`;
    }
}
