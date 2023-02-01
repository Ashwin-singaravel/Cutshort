import { Algorithm } from 'jsonwebtoken';

export interface Config {
    app: App;
    jwt: Jwt;
}

interface App {
    version: string;
    name: string;
    port: number;
}

interface Jwt {
    issuer: string;
    subject: string;
    audience: string;
    expiresIn: string;
    algorithm: Algorithm;
}