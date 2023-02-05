import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Auth } from 'src/auth/v1';
import { apiResponse } from 'src/helpers/index';
import { Request, Response } from 'src/types';
import { DecodedToken } from 'src/types/v1';
import { NextFunction } from 'express';

@Middleware({ type: 'before' })
export class AuthorizeMiddleware implements ExpressMiddlewareInterface {
  public async use(req: Request, res: Response, next: NextFunction) {
    try {
      // if not private route do call middleware
      if (req.originalUrl.indexOf('/api') === -1) {
        return next();
      }
      // verify jwt
      if (req.headers && req.headers.authorization) {
        const bearer = req.headers.authorization.split(' ');
        const data = await Auth.verifyToken<DecodedToken>(bearer[1]);

        req.authorization = {
          userIdentifier: data.userIdentifier
        };
        return next();
      } else {
        return apiResponse(res, 403, 1201);
      }
    } catch (error) {
      console.info(error);
      return apiResponse(res, 401, 1202, error);
    }
  }
}
