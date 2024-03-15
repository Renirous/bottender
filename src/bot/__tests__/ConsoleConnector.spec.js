import ConsoleConnector from '../ConsoleConnector';
import ConsoleEvent from '../../context/ConsoleEvent';
import ConsoleContext from '../../context/ConsoleContext';

const request = {
  message: {
    text: 'hello',
  },
};

function setup() {
  return {
    connector: new ConsoleConnector(),
  };
}

describe('#platform', () => {
  it('should be console', () => {
    const { connector } = setup();
    expect(connector.platform).toBe('console');
  });
});

describe('#getUniqueSessionIdFromRequest', () => {
  it('always return 1', () => {
    const { connector } = setup();
    const senderId = connector.getUniqueSessionIdFromRequest(request.body);
    expect(senderId).toBe('1');
  });
});

describe('#updateSession', () => {
  it('always attach sample dummy user', async () => {
    const { connector } = setup();
    const session = {};

    await connector.updateSession(session);

    expect(session).toEqual({
      user: {
        id: '1',
        platform: 'console',
        name: 'you',
      },
    });
  });
});

describe('#mapRequestToEvents', () => {
  it('should map request to ConsoleEvents', () => {
    const { connector } = setup();
    const events = connector.mapRequestToEvents(request.body);

    expect(events).toHaveLength(1);
    expect(events[0]).toBeInstanceOf(ConsoleEvent);
  });
});

describe('#createContext', () => {
  it('should create ConsoleContext', () => {
    const { connector } = setup();
    const event = {};
    const session = {};

    const context = connector.createContext({
      event,
      session,
    });

    expect(context).toBeDefined();
    expect(context).toBeInstanceOf(ConsoleContext);
  });
});
