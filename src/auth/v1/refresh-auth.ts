import fs from 'fs';
import config from 'src/config';
import { Auth } from './auth';

export class RefreshAuth extends Auth {

    protected static privateKEY = fs.readFileSync(config.key.refreshJwt.private, 'utf8');

    protected static publicKEY = fs.readFileSync(config.key.refreshJwt.public,'utf8');
    
    protected static JWToptions = config.signOptions.refreshJwt;
}
