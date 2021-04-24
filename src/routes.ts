import { Router } from 'express';
import controllers from './controllers';

const routes = Router();

routes.post('/settings', controllers.settings);

routes.post('/users', controllers.users);

routes.post('/messages', controllers.messages.create);
routes.get('/messages/:id', controllers.messages.showByUser);

export { routes };
