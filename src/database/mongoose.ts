import { guild } from './schema/guild.js';
import { logger } from '../utils/logger.js';

export async function getGuild(key: string): Promise<any> {
    try {
        let guildDB = await guild.findOne({ id: key });

        if (guildDB) {
            return guildDB;
        }

        else {
            guildDB = new guild({
                id: key
            });

            await guildDB.save();
            return guildDB
        }
    } catch (error) {
        logger('error', error.message)
    }
}