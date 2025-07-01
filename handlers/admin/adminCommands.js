const { Markup } = require('telegraf');
const dateUtils = require('../../utils/dateUtils');

module.exports = (bot, adminCheck) => {

    //Расписание
    require('./schedules').schedulesSetting(bot, adminCheck);


    bot.use((ctx, next) => {
        if (ctx.message?.text?.match(/📅 Выставить расписание|📢 Создать объявление|💰 Прайс|📋 Помощь|👥 Управление пользователями|📊 Статистика|⚙️ Настройки/i)) {
            return adminCheck(ctx, next);
        }
        return next();
    });

    bot.hears('📅 Выставить расписание', async (ctx) => {

        await require('./schedules').showSchedulesMenu(ctx);

    });

    bot.hears('📢 Создать объявление', (ctx) => {

    });
    bot.hears('💰 Прайс', (ctx) => {

    });
    bot.hears('📋 Помощь', (ctx) => {

    });
    bot.hears('👥 Управление пользователями', (ctx) => {

    });
    bot.hears('📊 Статистика', (ctx) => {

    });
    bot.hears('⚙️ Настройки', (ctx) => {

    });
}