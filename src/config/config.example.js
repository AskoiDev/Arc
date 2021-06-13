// Step 1: Remove the `.example` from this file name so it is called `configs.ts` or copy the contents of the `configs.example.ts` file into a new `configs.ts` file
// Step 2: Add all your bot's information below. The only required one is token and prefix. NOTE: As long as `.gitignore` file is ignoring configs.ts your configurations will be kept private!
// Step 3: Remove these comments if you like.

export class Config {
    token;
    prefix;
    supportServerID;
    userID;
    channelID;

    constructor() {
        // Your bot's token
        this.token = '';

        // You bot's default prefix
        this.prefix = ''

        // Your support server ID
        this.supportServerID = '';

        // The user and channel IDs we will store
        this.userID = {};
        this.channelID = {};


        // Your ID
        this.userID.botOwner = '';
        
        // Your devs IDs (if any)
        this.userID.botDevs = [''];


        // The ID of channel that we will log errors
        this.channelID.errorChannel = '';
        // The ID of channel that we will log join and leave events
        this.channelID.joinLeaveChannel = '';
        // The ID of channel we will log the ready evenet
        this.channelID.readyChannel = '';
    }
}