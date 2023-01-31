import { devSettings } from './env/dev';
import { Config } from '../types/config';
import { prodSettings } from './env/prod';

export interface EnvironmentStore {
    NODE_ENV?: string;
    [key: string]: string | undefined;
}

let compileTimeEnv: EnvironmentStore;

try {
    compileTimeEnv = process.env as EnvironmentStore;
} catch (error) {
    compileTimeEnv = {};
    // tslint:disable-next-line no-console
    console.info('`process.env` is not defined. ' + 'Compile-time environment will be empty.');
}

let config: Config;

switch (compileTimeEnv.NODE_ENV) {
    case 'dev':
        config = devSettings;
        break;

    case 'prod':
        config = prodSettings;
        break;

    default:
        config = devSettings;
        break;
}

export default config;
