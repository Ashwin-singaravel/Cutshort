import { Express } from 'express';
import { useExpressServer } from 'routing-controllers';
import unauthRoutesv1 from './controllers/v1/unauth';
import authRoutesV1 from './controllers/v1/auth';
import { AuthorizeMiddleware } from './middleware/v1/auth';

const registerRoutes = (server: Express) => {
  
  /* public routes v1*/
  useExpressServer(server, {
    routePrefix: '/v1',
    controllers: unauthRoutesv1
  });

  /* v1 private routes*/
  useExpressServer(server, {
    routePrefix: '/api/v1',
    controllers: authRoutesV1,
    middlewares: [AuthorizeMiddleware]
  });

};

export default registerRoutes;
