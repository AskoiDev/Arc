import { Command } from '../../../typings/index';
import fetch from 'node-fetch';

export const command: Command = {
    name: 'dog',
    category: 'Image',
    aliases: [],
    dev: false,
    owner: false,
    desc: 'Get a random dog image',
    usage: ['{prefix}dog'],
    scope: 'all',
    nsfw: false,

    async run({ msg }): Promise<any> {
        return msg.channel.send((await (await fetch('https://dog.ceo/api/breeds/image/random')).json()).message);
    }
}