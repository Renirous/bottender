const { MessengerBot } = require('bottender');
const { createServer } = require('bottender/express');

const bot = new MessengerBot({
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  appSecret: '__FILL_YOUR_SECRET_HERE__',
});

bot.onEvent(async context => {
  if (context.event.isText) {
    await context.sendText('I know you sent text message.');
  } else {
    await context.sendText("I know you didn't send text message.");
  }
});

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
