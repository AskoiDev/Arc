import { Client as BaseClient, ClientOptions, Collection, User } from 'discord.js';
import { Command, DB } from '../../typings/index';
import { config } from './config.js';
import { getGuild } from '../database/mongoose.js';

export class Client extends BaseClient {
    public commands?: Collection<string, Command>;
    public ownerID: string;
    public mongoDB: string;
    public data: DB;

    constructor(options?: ClientOptions) {
        super(options);

        this.ownerID = config.userID.ownerID
        this.mongoDB = config.mongoDB;

        this.data = {} as DB;
        this.data.getGuild = this.getGuildDB
    }

    public async getOwner(): Promise<User> {
        return await this.users.fetch(this.ownerID);
    }

    private async getGuildDB(key: string): Promise<any> {
        return await getGuild(key);
    }
}