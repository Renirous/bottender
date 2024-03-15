import * as core from '../index';

describe('core', () => {
  it('export bots', () => {
    expect(core.Bot).toBeDefined();
    expect(core.ConsoleBot).toBeDefined();
    expect(core.MessengerBot).toBeDefined();
    expect(core.LineBot).toBeDefined();
    expect(core.SlackBot).toBeDefined();
    expect(core.TelegramBot).toBeDefined();
  });

  it('export connectors', () => {
    expect(core.Connector).toBeDefined();
    expect(core.ConsoleConnector).toBeDefined();
    expect(core.MessengerConnector).toBeDefined();
    expect(core.LineConnector).toBeDefined();
    expect(core.SlackConnector).toBeDefined();
    expect(core.TelegramConnector).toBeDefined();
  });

  it('export cache implements', () => {
    expect(core.MemoryCacheStore).toBeDefined();
    expect(core.RedisCacheStore).toBeDefined();
  });

  it('export session stores', () => {
    expect(core.CacheBasedSessionStore).toBeDefined();
    expect(core.MemorySessionStore).toBeDefined();
    expect(core.RedisSessionStore).toBeDefined();
    expect(core.FileSessionStore).toBeDefined();
    expect(core.MongoSessionStore).toBeDefined();
  });

  it('export handler builders', () => {
    expect(core.middleware).toBeDefined();
    expect(core.BasicHandlerBuilder).toBeDefined();
    expect(core.ClassifierHandlerBuilder).toBeDefined();
    expect(core.MiddlewareHandlerBuilder).toBeDefined();
    expect(core.MessengerHandlerBuilder).toBeDefined();
    expect(core.LineHandlerBuilder).toBeDefined();
    expect(core.SlackHandlerBuilder).toBeDefined();
    expect(core.TelegramHandlerBuilder).toBeDefined();
  });

  it('export extensions', () => {
    expect(core.withTyping).toBeDefined();
  });
});
