from git import add, commit, push
from colorama import init, Fore
from os import _exit

def main():
    print('({GREEN}Info{RESET}): Adding changes...'.format(GREEN=Fore.GREEN, RESET=Fore.RESET))
    add()

    print('({GREEN}Info{RESET}): Commiting changes...'.format(GREEN=Fore.GREEN, RESET=Fore.RESET))
    print('({GREEN}Info{RESET}): Please enter your commit message below'.format(GREEN=Fore.GREEN, RESET=Fore.RESET))
    commit_msg = input('({GREEN}Info{RESET}): '.format(GREEN=Fore.GREEN, RESET=Fore.RESET))
    commit(commit_msg)

    print('({GREEN}Info{RESET}): Pushing changes...'.format(GREEN=Fore.GREEN, RESET=Fore.RESET))
    push()

if __name__ == '__main__':
    try:
        init()
        main()
    
    except KeyboardInterrupt:
        print('\n({RED}Error{RESET}): Aborting due to error...'.format(RED=Fore.RED, RESET=Fore.RESET))
        _exit(1)