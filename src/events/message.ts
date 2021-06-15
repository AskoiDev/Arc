import { Command, Data, MainClient } from '../../typings/index';
import { Event } from '../../typings/index';
import { logger } from '../utils/logger.js';
import { Message, MessageEmbed, TextChannel } from 'discord.js';
import { config } from '../utils/config.js';

export const event: Event = {
    name: 'message',
    emitter: 'on',
    emit: async (message: Message, client: MainClient) => {
        let embed: MessageEmbed;
        let data: Data;
        let prefix: string;

        embed = new MessageEmbed();
        data = {} as Data;

        try {
            embed
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

            if (message.author.bot) return;
            if (message.guild) data.guild = await client.data.getGuild(message.guild?.id);
    
            prefix = data.guild.prefix ? data.guild.prefix : config.prefix;
            
            if (message.content === `<@${client.user?.id}>` || message.content === `<@!${client.user?.id}>`) {
                return message.channel.send(`Hey there <@${message.author.id}>!\nMy prefix ${message.guild ? 'for this server' : ''} is \`${prefix}\`\n\nRun \`${prefix}help\` to see a list of all my commands!`);
            };

            client.prefix = prefix;
    
            if (!message.content.startsWith(prefix)) return;

            let [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/);
            cmd = cmd.trim().toLowerCase();
            
            let command: Command | undefined = client.commands?.get(cmd);
            if (!command || command === undefined) return;

            if ((command.dev && message.author.id !== client.ownerID) || (message.guild) && (command.owner && message.author.id !== message.guild?.ownerID)) {
                embed
                .setTitle('Error')
                .setDescription('You don\'t have access to this command')
                .setColor(0xFF000)

                return message.channel.send(embed);
            }

            else if (command.scope === 'guild' && (!message.guild && message.channel.type === 'dm')) {
                embed
                .setTitle('Error')
                .setDescription('This command can only be used in my DMs')
                .setColor(0xFF0000);

                return message.channel.send(embed);
            }

            else if (command.scope === 'dm' && message.guild) {
                embed
                .setTitle('Error')
                .setDescription('This command can only be used in servers')
                .setColor(0xFF0000);

                return message.channel.send(embed);
            };

            await command.run({
                embed: embed,
                client: client,
                message: message,
                msg: message,
                args: args,
                data: data
            });

        } catch (error) {
            logger('error', error.message);

            embed
            .setTitle('Error')
            .setAuthor(client.user?.tag, client.user?.displayAvatarURL({ dynamic: true }))
            .setThumbnail(client.user?.displayAvatarURL({ dynamic: true }) as string)
            .setColor(0xFF0000)
            .setDescription(`\`\`\`js\n${error.name}: "${error.message}"\n\`\`\``)
            .setTimestamp();


            [message.channel, await client.channels.fetch(config.channelID.errorChannel)].forEach((channel) => {
                return (channel as TextChannel).send(embed)
            });
        };
    }
};