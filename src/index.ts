import { Command, MainClient } from '../typings/index'
import { Collection } from 'discord.js';
import { Client } from './utils/client.js';
import { logger } from './utils/logger.js';
import { config } from './utils/config.js';
import { loadEvent, loadCommands } from './utils/load.js';
import { connect } from './database/connect.js';

const client: MainClient = new Client();
client.commands = new Collection<string, Command>();

async function main(): Promise<void> {
    try {
        logger('info', 'Loading events...');
        await loadEvent(client);

        logger('info', 'Loading commands...');
        await loadCommands(client);

        logger('info', 'Connecting to database...');
        await connect(client.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

        logger('info', 'Logging in...');
        await client.login(config.token);
    } catch (error) {
        return logger('error', error.message);
    };
};

main();