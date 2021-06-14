import { Command } from '../../../typings/index';
import { toTitleCase } from '../../utils/string.js';
import { help } from '../../utils/help.js';

export const command: Command = {
    name: 'help',
    category: 'General',
    aliases: ['command', 'commands', 'cmd', 'cmds'],
    dev: false,
    owner: false,
    desc: 'Get info on a specific command',
    usage: ['{prefix}help', '{prefix}help <command name>'],
    scope: 'all',

    async run({ embed, client, message, args}): Promise<void> {
        const cmd: Command | undefined = args[0] ? (client.commands?.get(args[0].toLowerCase()) || client.commands?.find(cmd => cmd.aliases && cmd.aliases.includes(args[0].toLowerCase()))) : undefined;

        if (cmd && cmd !== undefined) {
            const aliases = cmd.aliases.length ? `\`${cmd.aliases.join('`, `')}\`` : 'None'
            const usage = `\`${cmd.usage.map(x => x.replace('{prefix}', client.prefix as string)).join(',`\n`')}\``;
            
            embed
            .setTitle(toTitleCase(cmd.name))
            .setDescription(cmd.desc)
            .setColor('RANDOM')
            .addField('Usage', usage, true)
            .addField('Aliases', aliases, true)
            .addField('Category', cmd.category, true)
            .addField('Owner only?', `\`${cmd.owner}\``, true)
            .addField('Dev only?', `\`${cmd.dev}\``, true)
            .addField('Scope', `\`${cmd.scope}\``, true)

            message.channel.send(embed);
            return;
        } else {
            const commandsArr = help(client);

            embed
            .setDescription(`\`${client.prefix}help\` for a list of commands\n\`${client.prefix}help <command name>\` for info on a specific command`)
            .setTitle('Help')
            .setColor('RANDOM')

            for (const command of commandsArr) {
                embed.addField(command.category, command.names);
            }

            message.channel.send(embed);
            return;
        }
    }
}