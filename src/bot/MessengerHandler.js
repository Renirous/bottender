/* @flow */
import warning from 'warning';

import Handler, {
  type Predicate,
  type FunctionalHandler,
  type Pattern,
  type Builder,
  matchPattern,
} from './Handler';

export default class MessengerHandler extends Handler {
  onPostback(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isPostback, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);
      this.on(
        context => context.event.isPostback && predicate(context),
        handler
      );
    }

    return this;
  }

  onPayload(arg1: Pattern | FunctionalHandler, arg2?: FunctionalHandler) {
    let pattern;
    let handler;
    if (arg2) {
      pattern = ((arg1: any): Pattern);
      handler = (arg2: FunctionalHandler);

      warning(
        typeof pattern === 'string' || pattern instanceof RegExp,
        `'onPayload' only accepts string or regex, but received ${typeof pattern}`
      );

      this.on(({ event }) => {
        if (event.isPostback && matchPattern(pattern, event.postback.payload)) {
          return true;
        } else if (
          event.isMessage &&
          event.message.quick_reply &&
          matchPattern(pattern, event.message.quick_reply.payload)
        ) {
          return true;
        }
        return false;
      }, handler);
    } else {
      handler = ((arg1: any): FunctionalHandler);

      this.on(
        ({ event }) =>
          event.isPostback || (event.isMessage && !!event.message.quick_reply),
        handler
      );
    }
    return this;
  }

  onPayment(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isPayment, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);
      this.on(
        context => context.event.isPayment && predicate(context),
        handler
      );
    }

    return this;
  }

  onOptin(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isOptin, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);
      this.on(context => context.event.isOptin && predicate(context), handler);
    }

    return this;
  }

  onCheckoutUpdate(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isCheckoutUpdate, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);
      this.on(
        context => context.event.isCheckoutUpdate && predicate(context),
        handler
      );
    }

    return this;
  }

  onPreCheckout(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isPreCheckout, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);
      this.on(
        context => context.event.isPreCheckout && predicate(context),
        handler
      );
    }

    return this;
  }

  onQuickReply(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isQuickReply, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);
      this.on(
        context => context.event.isQuickReply && predicate(context),
        handler
      );
    }

    return this;
  }

  onEcho(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isEcho, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);
      this.on(context => context.event.isEcho && predicate(context), handler);
    }

    return this;
  }

  onEchoText(
    ...args:
      | [Pattern, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.onEcho(context => context.event.isTextMessage, handler);
    } else {
      const [pattern, handler]: [
        Pattern,
        FunctionalHandler | Builder,
      ] = (args: any);
      // FIXME
      this.onEcho(
        context =>
          context.event.isTextMessage &&
          matchPattern(pattern, context.event.message.text),
        handler
      );
    }

    return this;
  }

  onRead(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isRead, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);
      this.on(context => context.event.isRead && predicate(context), handler);
    }

    return this;
  }

  onDelivery(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isDelivery, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);
      this.on(
        context => context.event.isDelivery && predicate(context),
        handler
      );
    }

    return this;
  }

  onLocation(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isLocationMessage, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);
      this.on(
        context => context.event.isLocationMessage && predicate(context),
        handler
      );
    }

    return this;
  }

  onImage(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isImageMessage, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);
      this.on(
        context => context.event.isImageMessage && predicate(context),
        handler
      );
    }

    return this;
  }

  onAudio(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isAudioMessage, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);
      this.on(
        context => context.event.isAudioMessage && predicate(context),
        handler
      );
    }

    return this;
  }

  onVideo(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isVideoMessage, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);
      this.on(
        context => context.event.isVideoMessage && predicate(context),
        handler
      );
    }

    return this;
  }

  onFile(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isFileMessage, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);
      this.on(
        context => context.event.isFileMessage && predicate(context),
        handler
      );
    }

    return this;
  }

  onFallback(
    ...args:
      | [Predicate, FunctionalHandler | Builder]
      | [FunctionalHandler | Builder]
  ) {
    // FIXME: Can't refine tuple union - https://github.com/facebook/flow/issues/2389
    if (args.length < 2) {
      const [handler]: [FunctionalHandler | Builder] = (args: any);
      this.on(context => context.event.isFallbackMessage, handler);
    } else {
      const [predicate, handler]: [
        Predicate,
        FunctionalHandler | Builder,
      ] = (args: any);
      this.on(
        context => context.event.isFallbackMessage && predicate(context),
        handler
      );
    }

    return this;
  }
}
