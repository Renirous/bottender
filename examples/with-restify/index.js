require('babel-register');

const { MessengerBot } = require('../../src');
const { createServer } = require('../../src/restify');

const config = {
  accessToken: '__FILL_YOUR_TOKEN_HERE__',
};

const bot = new MessengerBot({
  accessToken: config.accessToken,
});

bot.onEvent(async context => {
  await context.sendText('Hello World');
});

const server = createServer(bot);

server.listen(5000, () => {
  console.log('server is running on 5000 port...');
});
