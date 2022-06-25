export class UserMessages {
    static welcomeMessage() {
        return `
Привет, это бот трекинга статусов телеграм аккаунтов, и его озможности:
  <b>отследить</b> - для отслеживания номера введите его в формате <b>+380992112233</b>
  <b>отловить</b> - для получения информации когда контакт онлайн введите команду <b>/notify_online</b>
  <b>отчет</b> - для получения ежедневного отчета актиности контакта введите свой Email

<b>Доступные команды:</b>
<b>/help</b> - Общая информация
<b>/edit_numbers</b> - Список отслеживаемых номеров / Удалить номер
<b>/notify_online</b> - Сообщить когда пользователь будет онлайн`;
    }
    static editTrackingMessage() {
        return '<b>Ваш список номеров.</b> <i>Выберите номер, если хотите прекратить отслеживание по нему</i>';
    }

    static noTrackingMessage() {
        return '<b>У вас нет отслеживаемых номеров.</b>';
    }

    static phoneStopTrackingMessage(phone) {
        return `Номер ${phone} больше не отслеживается`;
    }

    static phoneStartTrackingMessage(phone) {
        return `Номер ${phone} добавлен и начал отслеживаться`;
    }
    static phoneActivateTrackingMessage(phone) {
        return `По номеру ${phone} возобновлено отслеживание`;
    }
    static emailUpdated() {
        return `Ваша почта обновлена`;
    }
    static dublicatePhoneMessage(phone) {
        return `Номер ${phone} уже отслеживается`;
    }
    static unknownCommandMessage() {
        return `Неправильная команда. Повторите пожалуйста!`;
    }
    static notImplementYetMessage() {
        return `В разработке...`;
    }
    static exceedLimitMessage() {
        return `Превышен лимит на количество отслеживаемых номеров`;
    }
    static invalidPhoneNumber() {
        return `Неправильный номер телефона`;
    }
    static notifyYouWhenTrackedOnline() {
        return `
        Мы оповестим вас когда отслеживаемые контакты будут онлайн.
Сообщение будет отправленно один раз.
Для повторного отслеживание введите команду заново.
        `;
    }
}
