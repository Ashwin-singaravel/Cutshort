import { Config } from '../../types/index';
import path from 'path';
import { SignOptions } from 'jsonwebtoken';

const signOptions: SignOptions = {
    issuer: 'Cutshort ashwin',
    subject: 'ashwin.singaravel.97@gmail.com',
    audience: 'http://localhost:4001',
    algorithm: 'RS256'
}

export const devSettings: Config = {
    app: {
        version: '1.0.0',
        name: 'cutshort',
        port: 4001,
        cookieLabel: 'jwt'
    },
    signOptions: {
        jwt: {
            ...signOptions,
            expiresIn: '12h',
        },
        refreshJwt: {
            ...signOptions,
            expiresIn: '1d'
        }
    },
    cookieOptions: {
        // httpOnly: true,
        // sameSite: 'none',
        // secure: true,
        maxAge: 24 * 60 * 60 * 1000
    },
    mongo: {
        username: process.env.MONGO_DB_USERNAME as string,
        password: process.env.MONGO_DB_PASSWORD as string,
        host: process.env.MONGO_DB_HOST as string,
        db: process.env.MONGO_DB_DEFAULT as string
    },
    key: {
        jwt: {
            private: path.join(__dirname, '..', '..', '/auth/keys/private.key'),
            public: path.join(__dirname, '..', '..', '/auth/keys/public.key')
        },
        refreshJwt: {
            private: path.join(__dirname, '..', '..', '/auth/keys/refresh-private.key'),
            public: path.join(__dirname, '..', '..', '/auth/keys/refresh-public.key')
        }
    }
}