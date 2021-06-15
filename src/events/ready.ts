import { Event } from '../../typings/index';
import { logger } from '../utils/logger.js';
import { Client, MessageEmbed, TextChannel } from 'discord.js';
import { config } from '../utils/config.js';

export const event: Event = {
    name: 'ready',
    emitter: 'once',
    emit: (client: Client) => {
        client.channels.fetch(config.channelID.readyChannel).then((channel) => {
            const embed: MessageEmbed = new MessageEmbed()
            .setTitle('Ready')
            .setAuthor(client.user?.username, client.user?.displayAvatarURL({ dynamic: true }))
            .setThumbnail(client.user?.displayAvatarURL({ dynamic: true }) as string)
            .setColor(0x00FF00)
            .addField('Server(s)', `\`${client.guilds.cache.size}\``, true)
            .addField('User(s)', `\`${client.users.cache.size}\``, true)
            .setTimestamp();

            (channel as TextChannel).send(embed);
        });

        client.user?.setActivity({ name: `over ${client.guilds.cache.size} server(s)`, type: 'WATCHING' })
        return logger('connect', `Connected to Discord as ${client.user?.tag}`);
    }
};