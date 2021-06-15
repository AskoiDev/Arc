from os import system, path, _exit
from colorama import init, Fore

init()

def checkgit() -> bool:
    return path.isdir('./.git/')

def add() -> None:
    if checkgit() == True:
        system('git add .')
    else:
        return

def commit(message: str) -> None:
    if checkgit() == True and len(message) > 1:
        system('git commit -q -m "{}"'.format(message))
    
    elif len(message) == 0:
        print('({RED}Error{RESET}): Invalid commit message'.format(RED=Fore.RED, RESET=Fore.RESET))
        print('({RED}Error{RESET}): Please run this program again and enter a commit message'.format(RED=Fore.RED, RESET=Fore.RESET))
        print('({RED}Error{RESET}): Aborting due to error...'.format(RED=Fore.RED, RESET=Fore.RESET))
        _exit(1)

    else:
        print('({RED}Error{RESET}): \'.git\' directory not found'.format(RED=Fore.RED, RESET=Fore.RESET))
        print('({RED}Error{RESET}): Aborting due to error...'.format(RED=Fore.RED, RESET=Fore.RESET))
        _exit(1)

def push() -> None:
    system('git push -q')