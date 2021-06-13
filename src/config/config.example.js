// Step 1: Remove the `.example` from this file name so it is called `configs.ts` or copy the contents of the `configs.example.ts` file into a new `configs.ts` file
// Step 2: Add all your bot's information below. The only required one is token and prefix. NOTE: As long as `.gitignore` file is ignoring configs.ts your configurations will be kept private!
// Step 3: Remove these comments if you like.

export class Config {
    token;
    prefix;
    supportServerID;
    userID;

    constructor() {
        // Your bot token
        this.token = '';

        // Your bot default prefix
        this.prefix = ''

        // Your support server ID
        this.supportServerID = '';

        // The user IDs
        this.userID = {
            // Your ID
            botOwner = '',

            // Your devs IDs (if any)
            botDevs = []
        };
    }
}