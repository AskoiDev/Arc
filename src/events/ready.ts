import { Event } from '../../typings/index';
import { logger } from '../utils/logger.js';
import { Client } from 'discord.js';

export const event: Event = {
    name: 'ready',
    emitter: 'once',
    emit: (client: Client) => {
        console.log('run')
        return logger('info', `Logged in as ${client.user?.tag}`)
    }
}