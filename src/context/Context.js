/* @flow */

type Options = {|
  client: any,
  event: any,
  session: ?any,
|};

type Response = {
  status: number,
  headers: { [key: string]: string },
  body: any,
};

export default class Context {
  _handled = false;

  _client: Object;
  _event: Object;
  _session: ?Object;

  response: Response;

  constructor({ client, event, session }: Options) {
    this._client = client;
    this._event = event;
    this._session = session;

    this.response = {
      status: 200,
      headers: {},
      body: null,
    };
  }

  /**
   * The client instance.
   *
   */
  get client(): Object {
    return this._client;
  }

  /**
   * The event instance.
   *
   */
  get event(): Object {
    return this._event;
  }

  /**
   * The session state of the context.
   *
   */
  get session(): ?Object {
    return this._session;
  }

  get handled(): boolean {
    return this._handled;
  }
}
