import { Command } from '../../../typings/index';
import { reddit } from '../../utils/reddit.js';

export const command: Command = {
    name: 'meme',
    category: 'Fun',
    aliases: [],
    dev: false,
    owner: false,
    desc: 'Get a random meme from Reddit (https://reddit.com/)',
    usage: ['{prefix}meme'],
    scope: 'all',
    nsfw: false,

    async run({ embed, message }): Promise<void> {
        const subs: string[] = ['memes', 'dankmemes'].map(x => `https://api.reddit.com/r/${x}.json`);
        const sub = subs[Math.floor(Math.random() * subs.length)];

        await reddit(sub, message, embed);

        return;
    }
};