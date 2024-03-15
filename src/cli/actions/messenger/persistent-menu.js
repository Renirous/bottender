/* eslint-disable consistent-return */
import Table from 'cli-table2';
import invariant from 'invariant';
import { MessengerClient } from 'messaging-api-messenger';

import getConfig from '../../shared/getConfig';
import { print, error, bold } from '../../shared/log';

export async function getPersistentMenu(configPath = 'bottender.config.js') {
  try {
    const config = getConfig(configPath, 'messenger');

    invariant(config.accessToken, 'accessToken is not found in config file');

    const client = MessengerClient.connect(config.accessToken);

    const { data } = await client.getPersistentMenu();

    if (data.length) {
      const menu = data[0].persistent_menu[0];
      print(`input disabled: ${menu.composer_input_disabled}`);
      print('actions:');
      const table = new Table({
        head: ['type', 'title', 'payload'],
        colWidths: [30, 30, 30],
      });
      menu.call_to_actions.forEach(item => {
        table.push([item.type, item.title, item.payload]);
      });
      console.log(table.toString()); // eslint-disable-line no-console
    } else {
      error('Failed to find persistent menu setting');
    }
  } catch (err) {
    error('Faile to get persistent menu');
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
}

export async function setPersistentMenu(configPath = 'bottender.config.js') {
  try {
    const {
      accessToken,
      persistentMenu,
      composerInputDisabled = false,
    } = getConfig(configPath, 'messenger');

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
}

export async function deletePersistentMenu(configPath = 'bottender.config.js') {
  try {
    const config = getConfig(configPath, 'messenger');

    invariant(config.accessToken, 'accessToken is not found in config file');

    const client = MessengerClient.connect(config.accessToken);

    await client.deletePersistentMenu();

    print('Successfully delete persistent menu');
  } catch (err) {
    error('Failed to delete persistent menu');
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
}
