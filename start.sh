# Clear the screen
clear

GIT=".git"
DIR="dist"

# Check for `node` in PATH
if ! command -v node &> /dev/null ; then
    printf "(\033[1;31mError\033[1;0m): NodeJS not found on your machine\n"
    printf "(\033[1;31mError\033[1;0m): Please install NodeJS and set the PATH correctly\n"
    printf "(\033[1;31mError\033[1;0m): Try again later\n"
    printf "(\033[1;31mError\033[1;0m): Aborting request due to error...\n"
    exit
fi

# Check for the `.git` directory
# If exists, pull the remote
if test -d "$GIT" && command -v git &> /dev/null ; then
    printf "(\033[1;32mInfo\033[1;0m): Pulling remote...\n"
    git pull origin &> /dev/null

    printf "(\033[1;32mInfo\033[1;0m): Done\n"
fi

# Build the TypeScript project
printf "(\033[1;32mInfo\033[1;0m): Building project...\n"
bash ./build.sh

# Run the project
printf "(\033[1;32mInfo\033[1;0m): Starting app...\n"
if command -v pm2 &> /dev/null ; then
    pm2 del index &> /dev/null
    eval "pm2 start -f $DIR/index.js &> /dev/null"
    node .
else
    node .
fi