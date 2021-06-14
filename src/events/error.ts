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
            const embed: MessageEmbed = new MessageEmbed()
            .setTitle('Error')
            .setAuthor(client.user?.tag, client.user?.displayAvatarURL({ dynamic: true }))
            .setThumbnail(client.user?.displayAvatarURL({ dynamic: true }) as string)
            .setDescription('Error occurred')
            .setColor(0xFF0000)
            .addField('Error name', `\`\`\`\n${error.name}\n\`\`\``)
            .addField('Error message', `\`\`\`\n${error.message}\n\`\`\``)
            .setTimestamp();

            (channel as TextChannel).send(embed);
        });

        logger('error', error.message);
    }
}