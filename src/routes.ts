import { Router } from 'express';
import controllers from './controllers';

const routes = Router();

routes.post('/settings', controllers.settings.create);
routes.get('/settings/:username', controllers.settings.findByUsername);
routes.put('/settings/:username', controllers.settings.updateChat);

routes.post('/users', controllers.users);

routes.post('/messages', controllers.messages.create);
routes.get('/messages/:id', controllers.messages.showByUser);

routes.get('/', (request, response) => {
	return response.json({
		message: 'Olá NLW-05'
	});
});

routes.get('/pages/client', (request, response) => {
	return response.render('html/client.html');
});

routes.post('/', (request, response) => {
	return response.json({
		message: 'Usuário salvo com sucesso!'
	});
});

routes.get('*', (request, response) => {
	return response.status(404).send('File Not Found!');
});

export { routes };
