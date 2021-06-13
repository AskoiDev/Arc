import { ClientEvents, Client as BaseClient } from 'discord.js';
import { Client as MainClient } from '../dist/utils/client.js';

interface Command {
    name: string;
    category: string;
    aliases: readonly string[];
    dev: string;
    owner: string;
    desc: string;
}

export interface Event {
    name: keyof ClientEvents;
    emitter: 'on' | 'once';
    emit: (...args: any) => void;
}

export type LoggerType = 'error' | 'warn' | 'info' | 'log';