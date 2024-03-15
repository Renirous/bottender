/* @flow */
import randomItem from 'random-item';
import warning from 'warning';

// FIXME: platform
export type Context = {
  event: {
    isMessage: boolean,
    isTextMessage: boolean,
    message: {
      text: string,
      is_echo: boolean,
      quick_reply: {
        payload: string,
      },
    },
    postback: {
      payload: string,
      data: string,
    },
    attachments: [
      {
        type: string,
      },
    ],
    callbackQuery: {
      data: string,
    },
    isEcho: boolean,
    isRead: boolean,
    isDelivery: boolean,
    isPostback: boolean,
    isFollow: boolean,
    isUnfollow: boolean,
    isJoin: boolean,
    isLeave: boolean,
    isBeacon: boolean,
    hasAttachment: boolean,
    isImageMessage: boolean,
    isLocationMessage: boolean,
    isVideoMessage: boolean,
    isAudioMessage: boolean,
    isFileMessage: boolean,
    isFallbackMessage: boolean,
    isCallbackQuery: boolean,
    isPhotoMessage: boolean,
    isDocumentMessage: boolean,
    isGameMessage: boolean,
    isStickerMessage: boolean,
    isVoiceMessage: boolean,
    isVideoNoteMessage: boolean,
    isContactMessage: boolean,
    isVenueMessage: boolean,
  },
  sendText: (text: string) => void,
};

export type Predicate = (context: Context) => boolean | Promise<boolean>;

type FunctionalHandler = (
  context: Context,
  otherArg?: any
) => void | Promise<void>;

export type Handler = string | Array<string> | FunctionalHandler;

export type Pattern = string | RegExp;

type PredicateHandler = {
  predicate: Predicate,
  handler: FunctionalHandler,
};

export function normalizeHandler(handler: Handler): FunctionalHandler {
  if (typeof handler === 'string') {
    return context => {
      // $FlowFixMe
      context.sendText(handler);
    };
  } else if (Array.isArray(handler)) {
    return context => {
      context.sendText(randomItem(handler));
    };
  }
  return handler;
}

export function matchPattern(pattern: Pattern, text: string): boolean {
  if (typeof pattern === 'string') {
    return pattern === text;
  } else if (pattern instanceof RegExp) {
    return pattern.test(text);
  }
  return false;
}

export default class HandlerBuilder {
  _beforeHandlers: Array<FunctionalHandler> = [];
  _handlers: Array<PredicateHandler> = [];
  _fallbackHandler: ?PredicateHandler = null;
  _fallbackMessageHandler: ?PredicateHandler = null;
  _errorHandler: ?FunctionalHandler = null;

  before(handler: FunctionalHandler) {
    warning(false, '`before` is deprecated. Use middleware instead.');

    this._beforeHandlers.push(handler);
    return this;
  }

  beforeMessage(handler: FunctionalHandler) {
    warning(false, '`beforeMessage` is deprecated. Use middleware instead.');

    this._beforeHandlers.push(context => {
      if (context.event.isMessage) {
        return handler(context);
      }
    });
    return this;
  }

  on(predicate: Predicate, handler: Handler) {
    this._handlers.push({
      predicate,
      handler: normalizeHandler(handler),
    });
    return this;
  }

  onEvent(handler: Handler) {
    this._handlers.push({
      predicate: () => true,
      handler: normalizeHandler(handler),
    });
    return this;
  }

  onUnhandled(handler: Handler) {
    warning(
      false,
      '`onUnhandled` is deprecated. Use `onEvent` at tail call instead.'
    );
    this._fallbackHandler = {
      predicate: () => true,
      handler: normalizeHandler(handler),
    };
    return this;
  }

  onUnhandledMessage(handler: Handler) {
    warning(false, '`onUnhandledMessage` is deprecated.');
    this._fallbackMessageHandler = {
      predicate: context => context.event.isMessage,
      handler: normalizeHandler(handler),
    };
    return this;
  }

  onError(handler: Handler) {
    this._errorHandler = normalizeHandler(handler);
    return this;
  }

  build(): FunctionalHandler {
    const handlers = this._handlers.concat(
      this._fallbackMessageHandler || [],
      this._fallbackHandler || []
    );

    return async (context: Context) => {
      try {
        for (let i = 0; i < this._beforeHandlers.length; i++) {
          // eslint-disable-next-line no-await-in-loop
          await this._beforeHandlers[i](context);
        }

        for (let i = 0; i < handlers.length; i++) {
          const { predicate, handler } = handlers[i];
          // eslint-disable-next-line no-await-in-loop
          const predicateReturn = await predicate(context);
          if (typeof predicateReturn === 'boolean' && predicateReturn) {
            // eslint-disable-next-line no-await-in-loop
            await handler(context);
            break;
          }
        }
      } catch (err) {
        if (this._errorHandler) {
          return this._errorHandler(context, err);
        }
        throw err;
      }
    };
  }
}
