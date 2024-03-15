module.exports = {
  messenger: {
    accessToken: '__PUT_YOUR_ACCESS_TOKEN_HERE__',
    verifyToken: '__PUT_YOUR_VERITY_TOKEN_HERE__',
    appId: '__PUT_YOUR_APP_ID_HERE__',
    appSecret: '__PUT_YOUR_APP_SECRET_HERE__',
    persistentMenu: [
      {
        type: 'postback',
        title: '__TITLE_HERE__',
        payload: '__PAYLOAD_HERE__',
      },
      {
        type: 'web_url',
        title: '__TITLE_HERE__',
        url: '__URL_HERE__',
      },
    ],
    composerInputDisabled: false,
    domainWhitelist: ['http://example.com', 'http://facebook.com'],
    getStartedButtonPayload: '__PUT_YOUR_PAYLOAD_HERE__',
  },
  line: {
    channelSecret: '__PUT_YOUR_CHANNEL_SECRET_HERE__',
    accessToken: '__PUT_YOUR_ACCESS_TOKEN_HERE__',
  },
  telegram: {
    accessToken: '__PUT_YOUR_ACCESS_TOKEN_HERE__',
  },
};
