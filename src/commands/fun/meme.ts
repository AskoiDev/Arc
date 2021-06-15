import { Command } from '../../../typings/index';
import fetch from 'node-fetch';

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
        const subArr: string[] = ['memes', 'dankmemes'].map(x => `https://api.reddit.com/r/${x}.json`);
        const sub = subArr[Math.floor(Math.random() * subArr.length)];


        const memes = await fetch(sub);
        if (memes.status === 200) {
            const meme = (await memes.json()).data.children;
            const post = meme[Math.floor(Math.random() * meme.length)].data;

            embed
            .setTitle(post.title)
            .setImage(post.url_overridden_by_dest)
            .setColor('RANDOM');

            message.channel.send(embed);
        }

        return;
    }
}