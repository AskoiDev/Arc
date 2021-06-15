import { ClientEvents, MessageEmbed, Client as BaseClient, Message, Collection } from 'discord.js';
import { Schema } from 'mongoose';

interface Command {
    name: string;
    category: string;
    aliases: readonly string[];
    dev: boolean;
    owner: boolean;
    desc: string;
    usage: string[];
    scope: 'guild' | 'dm' | 'all';
    nsfw: boolean;

    run: (args: CommandArguments) => Promise<void> | void;
};

interface MainClient extends BaseClient {
    commands?: Collection<string, Command>;
    prefix?: string;
    data: DB;
    ownerID: string;
    mongoDB: string;

    getOwner: () => Promise<User>;
};

interface DB {
    getGuild: (key: string) => Promise<any>;
};

export interface CommandArguments {
    embed: MessageEmbed;
    client: MainClient;
    args: string[];
    data: Data;
    message: Message;
    msg: Message;
};

export interface Data {
    guild: GuildDB;
};

export interface GuildDB {
    id: string;
    prefix?: string;
};

export interface Event {
    name: keyof ClientEvents;
    emitter: 'on' | 'once';
    emit: (...args: any) => void;
};

export type LoggerType = 'error' | 'warn' | 'info' | 'log' | 'load' | 'connect';