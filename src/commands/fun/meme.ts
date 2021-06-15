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

    async run({ client }) {
        const subArr: string[] = ['memes', 'dankmemes'].map(x => `https://api.reddit.com/r/${x}.json`);
        const sub = subArr[Math.floor(Math.random() * subArr.length)];


        const memes = await fetch(sub);
        if (memes.status === 200) {
            const meme = (await memes.json()).data.children;
            console.log(meme);
        }
    }
}