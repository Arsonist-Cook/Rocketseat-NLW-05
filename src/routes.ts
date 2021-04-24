import { Router } from 'express';
import controllers from './controllers';


const routes = Router();

routes.post('/settings', controllers.settings);

routes.post('/users', controllers.users);

export { routes };
