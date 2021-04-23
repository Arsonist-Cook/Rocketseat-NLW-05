import express from 'express';
import { routes } from './routes';
import './database';

const PORT = 3000;
const app = express();

app.use(express.json());

app.use(routes);

app.get('/', (request, response) => {
	return response.json({
		message: 'Olá NLW-05'
	});
});

app.post('/', (request, response) => {
	return response.json({
		message: 'Usuário salvo com sucesso!'
	});
});

app.get('*', (request, response) => {
	return response.status(404).send('File Not Found!');
});

app.listen(PORT, () => {
	console.log(`Server running on port #${PORT}`);
});
