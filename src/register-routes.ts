import { Express } from 'express';
import { useExpressServer } from 'routing-controllers';
import unauthRoutesv1 from './controllers/v1/unauth';


const registerRoutes = (server: Express) => {
  
  /* public routes v1*/
  useExpressServer(server, {
    routePrefix: '/v1',
    controllers: unauthRoutesv1
  });

};

export default registerRoutes;
