
const dateUtils = require('../../utils/dateUtils');
const { Markup } = require('telegraf');


module.exports = {

    showSchedulesMenu: async(ctx) =>{

        ctx.session.userState.previousSteps.push('admin_menu');
        ctx.session.userState.step = 'create_schedule';
        
        var curentMonth = dateUtils.getCurrentMonth();
        var nextMonth = curentMonth + 1;

        await ctx.reply(`📅 Выберите месяц на которое хотите сформировать расписания:`,
            Markup.keyboard([
                [dateUtils.parseMonth(curentMonth), dateUtils.parseMonth(nextMonth)],
                ['Другой месяц', '🔙 Назад']
            ]).resize()
        );
    },

    schedulesSetting (bot, adminCheck){

        bot.use((ctx, next) => {
            if (ctx.message?.text?.match(/Другой месяц|📢 Создать объявление|/i)) {
                return adminCheck(ctx, next);
            }
            return next();
        });

        bot.hears('Другой месяц', async (ctx) => {

            ctx.session.userState.previousSteps.push('create_schedule');
            ctx.session.userState.step = 'anotherMonth';
            const months = [];

            // Генерация 12 месяцев вперед
            for (let i = 0; i < 12; i++) {
                months.push(dateUtils.parseMonth(i));
            }

            // Разбиваем на строки по 3 месяца
            const keyboard = [];
            while (months.length) {
                keyboard.push(months.splice(0, 3));
            }

            keyboard.push(['🔙 Назад']);

            await ctx.reply(
                'Выберите из доступных месяцев:',
                Markup.keyboard(keyboard).resize()
            );

        });


        bot.hears(/^(Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь) \d{4}$/, async (ctx) => {
            if (!ctx.session.scheduleState) return;

            const selectedMonth = ctx.message.text;
            ctx.session.scheduleState.selectedMonth = selectedMonth;

            // Переходим к выбору дней
            //await showDaySelection(ctx, selectedMonth);
        });


    }
}



