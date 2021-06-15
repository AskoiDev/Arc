import { Command, MainClient } from '../../../typings/index';

export const command: Command = {
    name: 'ping',
    category: 'General',
    aliases: ['latency',],
    dev: false,
    owner: false,
    desc: 'Get the bot latency and the server latency',
    usage: ['{prefix}ping'],
    scope: 'all',
    nsfw: false,

    async run({ message, client }): Promise<void> {
        message.channel.send('Pinging...').then(msg => {
            msg.edit(`**Server Latency**: \`${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\`\n**API Latency**: \`${Math.round(client.ws.ping)}ms\``);
        });
    }
}