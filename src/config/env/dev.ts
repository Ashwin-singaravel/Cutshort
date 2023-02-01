import { Config } from '../../types/index';

export const devSettings: Config = {
    app: {
        version: '1.0.0',
        name: 'cutshort',
        port: 4001
    },
    jwt: {
        issuer: 'Cutshort ashwin',
        subject: 'ashwin.singaravel.97@gmail.com',
        audience: 'https://cutshort-vumw.onrender.com/',
        expiresIn: '12h',
        algorithm: 'RS256'
    }
}