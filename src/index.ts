import { Command, Event, MainClient } from '../typings/index'
import { Collection } from 'discord.js';
import { Client } from './utils/client.js';
import { readdirSync } from 'fs';
import { logger } from './utils/logger.js';
import { config } from './utils/config.js';
import mongoose from 'mongoose';
import { sleep } from './utils/time.js';

const client: MainClient = new Client();
client.commands = new Collection<string, Command>();

async function main(): Promise<void> {
    try {
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

        logger('info', 'Logging in...');
        logger('info', 'Connecting to MongoDB Atlas...');

        await client.login(config.token);
        await mongoose.connect(client.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

        await sleep(10);

        return logger('info', 'Connected to MongoDB Atlas');
    } catch (error) {
        return logger('error', error.message)
    }
}

main();