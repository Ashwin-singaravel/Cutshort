import fs from 'fs';
import jwt from 'jsonwebtoken';
import config from 'src/config';

export default class Auth {

    public static createToken(payload?: string | Buffer | object) {
        return jwt.sign(payload || {}, this.privateKEY, this.JWToptions);
    }

    public static async verifyToken<T>(token: string): Promise<T> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.publicKEY, this.JWToptions, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (result && result instanceof Object) {
                    resolve(result as T);
                }
                return;
            });
        });
    }

    private static privateKEY = fs.readFileSync(config.keys.private, 'utf8');

    private static publicKEY = fs.readFileSync(config.keys.public,'utf8');
    
    private static JWToptions = config.jwt;
}
