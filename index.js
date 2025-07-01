require('dotenv').config();


const { Telegraf } = require('telegraf');
const LocalSession = require('telegraf-session-local');


const bot = new Telegraf(process.env.BOT_TOKEN);
const ADMIN_ID = parseInt(process.env.ADMIN_ID);


const session = new LocalSession({
  database: 'sessions.json',
  getSessionKey: (ctx) => ctx.from?.id.toString()
});

bot.use(session.middleware());

bot.use((ctx, next) => {
  ctx.session.userState = ctx.session.userState || {
    step: 'init',
    previousSteps: []
  };
  return next();
});

const adminCheck = require('./adminCheck');

require('./handlers/admin/adminCommands')(bot, adminCheck);
require('./handlers/user/userCommands')(bot);



bot.start((ctx) => {

  ctx.session.userState.previousSteps.push('start');


  if (ctx.from.id === ADMIN_ID) {
    // Показываем админское меню
    require('./handlers/admin/menu').showAdminMenu(ctx);
  } else {
    // Показываем пользовательское меню
    require('./handlers/user/menu').showUserMenu(ctx);
  }

});

bot.hears('🔙 Назад', async (ctx) => {

  const previousStep = ctx.session.userState.previousSteps.pop();

  switch (previousStep) {
    case 'admin_menu':
      await require('./handlers/admin/menu').showAdminMenu(ctx);
      break;
    case 'user_selection':
      await require('./handlers/user/menu').showUserMenu(ctx);
      break;
    case 'create_schedule':
      await require('./handlers/admin/schedules').showSchedulesMenu(ctx);
      break;
    default:
      this.showUserMenu(ctx);
  }
});



bot.launch();