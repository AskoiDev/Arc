import { readdir } from 'fs/promises';
import { MainClient, Event, Command } from '../../typings/index';
import { logger } from './logger.js';

export async function loadEvent(client: MainClient): Promise<void> {
    for (const file of (await readdir('./dist/events/')).filter(file => file.endsWith('.js'))) {
        const { event }: { event: Event } = await import(`../events/${file}`);

        logger('load', `${event.name} event loaded`);
        client[event.emitter](event.name, (...args: unknown[]) => event.emit(...args, client));
    };

    return;
};

export async function loadCommands(client: MainClient): Promise<void> {
    for (const dir of (await readdir('./dist/commands/'))) {
        for (const file of (await readdir(`./dist/commands/${dir}/`)).filter(file => file.endsWith('.js'))) {
            const { command }: { command: Command } = await import(`../commands/${dir}/${file}`);

            logger('load', `${command.name} command loaded`);
            client.commands?.set(command.name, command);
        };
    };
};