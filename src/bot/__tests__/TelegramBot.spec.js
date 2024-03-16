import TelegramBot from '../TelegramBot';
import TelegramConnector from '../TelegramConnector';

const _consoleError = console.error;

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = _consoleError;
});

it('should construct bot with TelegramConnector', () => {
  const bot = new TelegramBot({
    accessToken: 'FAKE_TOKEN',
  });
  expect(bot).toBeDefined();
  expect(bot.onEvent).toBeDefined();
  expect(bot.createRequestHandler).toBeDefined();
  expect(bot.connector).toBeDefined();
  expect(bot.connector).toBeInstanceOf(TelegramConnector);
});

it('should export createLongPollingRuntime method', () => {
  const bot = new TelegramBot({
    accessToken: 'FAKE_TOKEN',
  });
  expect(bot.createLongPollingRuntime).toBeDefined();
});

describe('#createLongPollingRuntime', () => {
  it('should call updates without params', done => {
    const bot = new TelegramBot({
      accessToken: 'FAKE_TOKEN',
    });

    const handler = jest.fn();

    bot.onEvent(handler);

    const getUpdatesPromise = Promise.resolve({
      ok: true,
      result: [
        {
          update_id: 513400512,
          message: {
            message_id: 3,
            from: {
              id: 313534466,
              first_name: 'first',
              last_name: 'last',
              username: 'username',
            },
            chat: {
              id: 313534466,
              first_name: 'first',
              last_name: 'last',
              username: 'username',
              type: 'private',
            },
            date: 1499402829,
            text: 'hi',
          },
        },
      ],
    });

    bot.connector.client.getUpdates = jest.fn();
    bot.connector.client.getUpdates
      .mockReturnValueOnce(getUpdatesPromise)
      .mockImplementationOnce(() => {
        bot.stop();
        expect(bot.connector.client.getUpdates).toBeCalledWith({});
        expect(handler).toBeCalledWith(expect.any(Object));
        done();
      });

    bot.createLongPollingRuntime();
  });

  it('should call updates with params', done => {
    const bot = new TelegramBot({
      accessToken: 'FAKE_TOKEN',
    });

    const handler = jest.fn();

    bot.onEvent(handler);

    const getUpdatesPromise = Promise.resolve({
      ok: true,
      result: [
        {
          update_id: 513400512,
          message: {
            message_id: 3,
            from: {
              id: 313534466,
              first_name: 'first',
              last_name: 'last',
              username: 'username',
            },
            chat: {
              id: 313534466,
              first_name: 'first',
              last_name: 'last',
              username: 'username',
              type: 'private',
            },
            date: 1499402829,
            text: 'hi',
          },
        },
      ],
    });

    bot.connector.client.getUpdates = jest.fn();
    bot.connector.client.getUpdates
      .mockReturnValueOnce(getUpdatesPromise)
      .mockImplementationOnce(() => {
        bot.stop();
        expect(bot.connector.client.getUpdates).toBeCalledWith({
          limit: 100,
          timeout: 0,
          allowed_updates: ['message', 'edited_channel_post', 'callback_query'],
          offset: 1,
        });
        expect(handler).toBeCalledWith(expect.any(Object));
        done();
      });

    bot.createLongPollingRuntime({
      limit: 100,
      timeout: 0,
      allowed_updates: ['message', 'edited_channel_post', 'callback_query'],
      offset: 1,
    });

    expect(bot.offset).toBe(1);
  });
});
