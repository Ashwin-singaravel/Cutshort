import { SignOptions } from 'jsonwebtoken';

export interface Config {
    app: App;
    jwt: SignOptions;
}

interface App {
    version: string;
    name: string;
    port: number;
}