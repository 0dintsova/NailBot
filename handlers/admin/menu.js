const { Markup } = require('telegraf');

module.exports = {

    showAdminMenu(ctx) {

        ctx.session.userState.previousSteps.push('start');
        ctx.session.userState.step = 'admin_menu';

        ctx.reply('🔐 Админ-панель', Markup.keyboard([
            ['📅 Выставить расписание', '📢 Создать объявление'],
            ['💰 Прайс', '📋 Помощь'],
            ['👥 Управление пользователями', '📊 Статистика'],
            ['⚙️ Настройки']
        ]).resize());
    }


};
