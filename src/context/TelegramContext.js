/* @flow */

import sleep from 'delay';
import warning from 'warning';
import { TelegramClient } from 'messaging-api-telegram';

import type { TelegramSession } from '../bot/TelegramConnector';

import Context from './Context';
import TelegramEvent from './TelegramEvent';
import type { PlatformContext } from './PlatformContext';

type Options = {|
  client: TelegramClient,
  event: TelegramEvent,
  session: ?TelegramSession,
|};

class TelegramContext extends Context implements PlatformContext {
  _client: TelegramClient;
  _event: TelegramEvent;
  _session: ?TelegramSession;

  constructor({ client, event, session }: Options) {
    super({ client, event, session });
  }

  /**
   * The name of the platform.
   *
   */
  get platform(): string {
    return 'telegram';
  }

  /**
   * Delay and show indicators for milliseconds.
   *
   */
  async typing(milliseconds: number): Promise<void> {
    await sleep(milliseconds);
  }

  /**
   * Send text to the owner of then session.
   *
   */
  async sendText(text: string): Promise<any> {
    if (!this._session) {
      warning(
        false,
        'sendText: should not be called in context without session'
      );
      return;
    }
    return this._client.sendMessage(this._session.user.id, text);
  }

  async sendTextWithDelay(delay: number, text: string): Promise<any> {
    warning(false, `sendTextWithDelay is deprecated.`);

    if (!this._session) {
      warning(
        false,
        'sendText: should not be called in context without session'
      );
      return;
    }
    return this._client.sendMessage(this._session.user.id, text);
  }
}

const sendMethods = [
  'sendMessage',
  'sendPhoto',
  'sendAudio',
  'sendDocument',
  'sendSticker',
  'sendVideo',
  'sendVoice',
  // 'sendVideoNote',
  'sendLocation',
  'sendVenue',
  'sendContact',
  'sendChatAction',
];

sendMethods.forEach(method => {
  Object.defineProperty(TelegramContext.prototype, `${method}`, {
    enumerable: false,
    configurable: true,
    writable: true,
    async value(...args) {
      if (!this._session) {
        warning(
          false,
          `${method}: should not be called in context without session`
        );
        return;
      }
      return this._client[method](this._session.user.id, ...args);
    },
  });
});

export default TelegramContext;
