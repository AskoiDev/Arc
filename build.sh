# Check for the `dist` directory
# If doesn't exists, create it
# If exists, clear the content
if ! test -d $DIR ; then
    mkdir dist
elif [ "$(ls -A $DIR)" ] ; then
    rm -rf dist/*
fi

# Check for `node` in PATH
if ! command -v node &> /dev/null ; then
    printf "(\033[1;31mError\033[1;0m): NodeJS not found on your machine\n"
    printf "(\033[1;31mError\033[1;0m): Please install NodeJS and set the PATH correctly\n"
    printf "(\033[1;31mError\033[1;0m): Try again later\n"
    printf "(\033[1;31mError\033[1;0m): Aborting request due to error...\n"
    exit
fi

# Check for `npm` in PATH
if ! command -v npm &> /dev/null ; then
    printf "(\033[1;31mError\033[1;0m): NPM not found on your machine\n"
    printf "(\033[1;31mError\033[1;0m): Please install NPM and set the PATH correctly\n"
    printf "(\033[1;31mError\033[1;0m): Try again later\n"
    printf "(\033[1;31mError\033[1;0m): Aborting request due to error...\n"
    exit
fi

# Check for `tsc`
printf "(\033[1;32mInfo\033[1;0m): Compiling...\n"
if command -v tsc &> /dev/null ; then
    tsc &> /dev/null
elif command -v $(npx tsc) &> /dev/null ; then
    npx tsc &> /dev/null
else
    printf "(\033[1;31mError\033[1;0m): Error while compiling TypeScript\n"
    printf "(\033[1;31mError\033[1;0m): Please make sure you have installed TypeScript on this machine\n"
    printf "(\033[1;31mError\033[1;0m): Aborting request due to error...\n"
    exit
fi

printf "(\033[1;32mInfo\033[1;0m): Done\n"