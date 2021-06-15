import { Command } from '../../../typings/index';
import fetch from 'node-fetch';

export const command: Command = {
    name: 'hentai',
    category: 'NSFW',
    aliases: [],
    dev: false,
    owner: false,
    desc: 'Get a random hentai image or GIF',
    usage: ['{prefix}hentai'],
    scope: 'all',
    nsfw: true,

    async run({ msg }): Promise<void> {
        msg.channel.send('You have been fooled')
    }
}