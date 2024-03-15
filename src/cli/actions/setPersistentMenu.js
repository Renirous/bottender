/* eslint-disable consistent-return */
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../shared/getConfig';
import { print, error, bold } from '../shared/log';

export default (async function setPersistentMenu(_configPath) {
  try {
    const platform = 'messenger';
    const configPath = _configPath || 'bottender.config.js';
    const {
      accessToken,
      persistentMenu,
      composerInputDisabled = false,
    } = getConfig(configPath, platform);

    invariant(accessToken, '`accessToken` is not found in config file.');
    invariant(persistentMenu, '`persistentMenu` is not found in config file.');

    const client = MessengerClient.connect(accessToken);
    await client.setPersistentMenu(persistentMenu, { composerInputDisabled });

    print(
      `Successfully set persistent menu to with composerInputDisabled: ${composerInputDisabled}`
    );
    persistentMenu.forEach(item => {
      print(`- ${item.title}`);
    });
  } catch (err) {
    error('Failed to set persistent menu');
    if (err.response) {
      error(`status: ${bold(err.response.status)}`);
      if (err.response.data) {
        error(`data: ${bold(JSON.stringify(err.response.data, null, 2))}`);
      }
    } else {
      error(err.message);
    }
    return process.exit(1);
  }
});
