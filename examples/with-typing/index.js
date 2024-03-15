require('babel-register');

const { MessengerBot, withTyping } = require('../../src');
const { createServer } = require('../../src/express');

const config = {
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
  appSecret: '__FILL_YOUR_SECRET_HERE__',
};

const bot = new MessengerBot({
  accessToken: config.accessToken,
  appSecret: config.appSecret,
});

bot.extendContext(withTyping({ delay: 1000 }));

bot.onEvent(async context => {
  await context.sendText('Hello World');
  await context.sendText('Hello World');
  await context.sendTextWithDelay(2000, 'Hello World~~~~~~~~~~');
});

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
