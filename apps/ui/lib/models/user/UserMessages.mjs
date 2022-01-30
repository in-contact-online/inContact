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
}