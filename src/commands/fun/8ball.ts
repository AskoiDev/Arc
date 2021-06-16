import { Command } from '../../../typings/index';
import fetch from 'node-fetch';

export const command: Command = {
    name: '8ball',
    category: 'Fun',
    aliases: ['8b'],
    dev: false,
    owner: false,
    desc: 'The bot will answer all your questions',
    usage: ['{prefix}8ball [question]'],
    scope: 'all',
    nsfw: false,
    
    async run({ client, msg, args }): Promise<any> {
        if (!args[0]) {
            msg.channel.send(`Hey, you must at least ask a question\n\`${client.prefix}8ball [question]\``);
            return;
        };

        const response = await fetch(`https://8ball.delegator.com/magic/JSON/${encodeURIComponent(args.join(' '))}`);
        if (response.status === 200) {
            const { magic } = await response.json();

            return msg.channel.send(`"${magic.answer}", they said`);
        } else {
            return msg.channel.send(`"Request returned a ${response.status}", they said`)
        };
    }
};