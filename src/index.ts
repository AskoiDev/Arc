import { Command, Event } from '../typings/index'
import { Collection } from 'discord.js';
import { Client } from './utils/client.js';
import { readdirSync } from 'fs';
import { logger } from './utils/logger.js';
import { config } from './utils/config.js';

const client = new Client();
client.commands = new Collection<string, Command>();

async function main(): Promise<void> {
    for (const file of readdirSync('./dist/events/').filter(file => file.endsWith('.js'))) {
        const { event }: { event: Event } = await import(`./events/${file}`);

        logger('info', `${event.name} event loaded`);
        client[event.emitter](event.name, (...args: unknown[]) => event.emit(...args, client));
    }

    readdirSync('./dist/commands/').forEach(async (dir) => {
        for (const file of readdirSync(`./dist/commands/${dir}/`).filter(file => file.endsWith('.js'))) {
            const { command }: { command: Command } = await import(`./commands/${dir}/${file}`);

            logger('info', `${command.name} command loaded`);
            client.commands?.set(command.name, command);
        }
    });

    try {
        await client.login(config.token);
    } catch (error) {
        return logger('error', error.message)
    }

    return logger('info', 'Logging in...');
}

main();