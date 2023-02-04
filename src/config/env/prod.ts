import { Config } from '../../types/index';

export const prodSettings: Config = {
    app: {
        version: '1.0.0',
        name: 'cutshort',
        port: 5000
    },
    jwt: {
        issuer: 'Cutshort ashwin',
        subject: 'ashwin.singaravel.97@gmail.com',
        audience: 'https://cutshort-vumw.onrender.com/',
        expiresIn: '12h',
        algorithm: 'RS256'
    },
    mongo: {
        username: process.env.MONGO_DB_USERNAME as string,
        password: process.env.MONGO_DB_PASSWORD as string,
        host: process.env.MONGO_DB_HOST as string,
        db: process.env.MONGO_DB_DEFAULT as string
    }
}