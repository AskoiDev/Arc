import { Command } from '../../../typings/index';

export const command: Command = {
    name: 'help',
    category: 'General',
    aliases: ['command', 'commands', 'cmd', 'cmds'],
    dev: false,
    owner: false,
    desc: 'Get info on a specific command',
    usage: '{prefix}help <command name>',

    async run({ embed, client, data, args}): Promise<void> {
        return;
    }
}