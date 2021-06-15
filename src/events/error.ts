import { Client } from '..//utils/client.js';
import { Event } from '../../typings/index';
import { logger } from '../utils/logger.js';
import { MessageEmbed, TextChannel } from 'discord.js';
import { config } from '../utils/config.js';

export const event: Event = {
    name: 'error',
    emitter: 'on',
    emit: (error: Error, client: Client) => {
        client.channels.fetch(config.channelID.errorChannel).then((channel) => {
            const embed = new MessageEmbed()
            .setTitle('An error occurred')
            .setAuthor(client.user?.tag, client.user?.displayAvatarURL({ dynamic: true }))
            .setThumbnail(client.user?.displayAvatarURL({ dynamic: true }) as string)
            .setColor(0xFF0000)
            .setDescription(`\`\`\`js\n${error.name}: "${error.message}"\n\`\`\``)
            .setTimestamp();

            (channel as TextChannel).send(embed);
        });

        logger('error', error.message);
    }
};