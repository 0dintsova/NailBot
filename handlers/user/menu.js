const { Markup } = require('telegraf');

module.exports = {

    showUserMenu(ctx) {

        ctx.session.userState.previousSteps.push('start');
        ctx.session.userState.step = 'user_menu';

        ctx.reply('Меню', Markup.keyboard([
            ['📅 Расписание', '💰 Прайс']
        ]).resize());


    }


}