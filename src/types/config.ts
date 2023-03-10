import { CookieOptions } from 'express';
import { SignOptions as Options } from 'jsonwebtoken';

export interface Config {
    app: App;
    signOptions: SignOptions;
    cookieOptions: CookieOptions;
    rateLimit: RateLimitOptions;
    mongo: Mongo;
    key: Key;
}

interface App {
    version: string;
    name: string;
    port: number;
    cookieLabel: string;
}

interface SignOptions {
    jwt: Options,
    refreshJwt: Options
}

interface RateLimitOptions {
    windowMs: number,
    max: number,
    standardHeaders: boolean,
    legacyHeaders: boolean
}

interface Mongo {
    username: string;
    password: string;
    host: string;
    db: string;
}

interface Key {
    jwt: Keys,
    refreshJwt: Keys
}

interface Keys {
    private: string;
    public: string;
}