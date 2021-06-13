  
import chalk from 'chalk';
import { LoggerType } from '../../typings';
import { getTimeString } from './time.js';

export function logger(type: LoggerType, message: string): void {
    switch (type.toLowerCase()) {
        case 'info': {
            console.log(`[${getTimeString()}] [${chalk.blueBright(type.toUpperCase())}]: ${message}`);
            break;
        }
        
        case 'warn': {
            console.log(`[${getTimeString()}] [${chalk.keyword('orange')(type.toUpperCase())}]: ${message}`);
            break;
        }
        
        case 'error': {
            console.log(`[${getTimeString()}] [${chalk.red(type.toUpperCase())}]: ${message}`);
            break;
        }

        case 'log':{
            console.log(`[${getTimeString()}] [${chalk.gray(type.toUpperCase())}]: ${message}`);
            break;
        }
        
        default: {
            console.log(`[${getTimeString()}] [${chalk.green(type.toUpperCase())}]: ${message}`);
            break;
        }
    }
}