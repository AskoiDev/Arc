import { Command } from '../../../typings/index';
import fetch from 'node-fetch';

export const command: Command = {
    name: 'cat',
    category: 'Image',
    aliases: [],
    dev: false,
    owner: false,
    desc: 'Get a random cat image',
    usage: ['{prefix}cat'],
    scope: 'all',
    nsfw: false,

    async run({ msg }): Promise<any> {
        return msg.channel.send((await (await fetch('https://aws.random.cat/meow')).json()).file);
    }
}