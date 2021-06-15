import { Message, MessageEmbed } from 'discord.js'
import fetch from 'node-fetch';

export async function reddit(sub: string, message: Message, embed: MessageEmbed): Promise<void> {
    const response = await fetch(sub);

    if (response.status === 200) {
        const posts = (await response.json()).data.children;
        const post = posts[Math.floor(Math.random() * posts.length)].data;

        embed
        .setTitle(post.title)
        .setImage(post.url_overridden_by_dest)
        .setColor('RANDOM');

        message.channel.send(embed);
    } else {
        message.channel.send('The request retruned a 404');
    };

    return;
};