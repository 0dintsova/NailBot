

const ADMINS = parseInt(process.env.ADMIN_ID);

module.exports = async (ctx, next) => {

    if (ADMINS === ctx.from.id) {
        return next();
    }
    await ctx.reply('⛔ Доступ запрещен');
  return;
};
  