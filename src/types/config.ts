import { SignOptions } from 'jsonwebtoken';

export interface Config {
    app: App;
    jwt: SignOptions;
    mongo: Mongo;
    keys: Keys;
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

interface Keys {
    private: string;
    public: string;
}