import { Command } from '../../../typings/index';
import { reddit } from '../../utils/reddit.js';

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

    async run({ message, embed }): Promise<void> {
        const subs: string[] = ['hentai'].map(x => `https://api.reddit.com/r/${x}.json`);
        const sub = subs[Math.floor(Math.random() * subs.length)];

        return await reddit(sub, message, embed);
    }
};