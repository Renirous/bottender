import Context from '../context/Context';

import TwilioClient from './TwilioClient';
import WhatsappEvent from './WhatsappEvent';

class WhatsappContext extends Context<TwilioClient, WhatsappEvent> {
  /**
   * The name of the platform.
   *
   */
  get platform(): string {
    return 'whatsapp';
  }

  /**
   * Send text to the owner of then session.
   *
   */
  async sendText(
    text: string,
    options?: {
      maxPrice?: number;
      provideFeedback?: boolean;
      validityPeriod?: number;
      forceDelivery?: boolean;
      smartEncoded?: boolean;
      persistentAction?: string[];
      mediaUrl?: string[];
    }
  ): Promise<any> {
    const from =
      this._event.rawEvent.smsStatus === 'received'
        ? this._event.rawEvent.to
        : this._event.rawEvent.from;
    const to =
      this._event.rawEvent.smsStatus === 'received'
        ? this._event.rawEvent.from
        : this._event.rawEvent.to;

    return this._client.createMessage({
      from,
      to,
      body: text,
      ...options,
    });
  }
}

export default WhatsappContext;
