import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';
import ejs from 'ejs';

import { routes } from './routes';
import './database';

const app = express();
const publicPath = path.join(__dirname, '..', 'public');

app.engine('html', ejs.renderFile);

app.set('views', publicPath);
app.set('view engine', 'html');

app.use(express.static(publicPath));
app.use(express.json());
app.use(routes);

const http = createServer(app); //Http protocol server

const io = new Server(http); //websocket protocol over http
io.on('connection', (socket: Socket) => {
	console.log(`Connected at: ${socket.id}`);
});

export { http, io };
