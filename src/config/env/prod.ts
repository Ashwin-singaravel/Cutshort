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
    }
}