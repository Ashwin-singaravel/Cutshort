import { SignOptions } from 'jsonwebtoken';

export interface Config {
    app: App;
    jwt: SignOptions;
    mongo: Mongo;
}

interface App {
    version: string;
    name: string;
    port: number;
}

interface Mongo {
    username: string;
    password: string;
    host: string;
    db: string;
}