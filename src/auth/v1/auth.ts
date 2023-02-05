import fs from 'fs';
import jwt from 'jsonwebtoken';
import config from 'src/config';

export class Auth {

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

    protected static privateKEY = fs.readFileSync(config.key.jwt.private, 'utf8');

    protected static publicKEY = fs.readFileSync(config.key.jwt.public,'utf8');
    
    protected static JWToptions = config.signOptions.jwt;
}
