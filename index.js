require('dotenv').config();


const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(
    'Добро пожаловать! Запишитесь на маникюр:',
    Markup.keyboard([[

        '📅 Записаться',
        '📝 Мои записи']
        ]).resize()

  );git init  # создает скрытую папку .git
});

bot.launch();