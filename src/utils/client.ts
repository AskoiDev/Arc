import { Client as BaseClient, ClientOptions, Collection, User } from 'discord.js';
import { Command } from '../../typings/index';
import { config } from './config.js'

export class Client extends BaseClient {
    public commands?: Collection<string, Command>;
    public ownerID: string;
    public mongoDB: string;

    constructor(options?: ClientOptions) {
        super(options);

        this.ownerID = config.userID.ownerID
        this.mongoDB = config.mongoDB;
    }

    public async getOwner(): Promise<User> {
        return await this.users.fetch(this.ownerID);
    }
}