import { User } from '../entities/Users';
import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { MessagesService } from '../services/MessagesService';
import { UsersService } from '../services/UsersService';

interface IParams {
	email: string;
	text: string;
}

io.on('connect', (socket) => {
	const connectionsService = new ConnectionsService();
	const usersService = new UsersService();
	const messagesService = new MessagesService();

	socket.on('client_first_connection', async (params) => {
		const socketId = socket.id;
		const { text, email } = params as IParams;
		let userId = null;

		const userExists = await usersService.findByEmail(email);

		if (userExists) {
			userId = userExists.id;

			const connection = await connectionsService.findByUserId(userId);

			if (connection) {
				connection.socketId = socketId; //update socket id
				await connectionsService.create(connection); //update the connection
			} else {
				await connectionsService.create({
					userId,
					socketId
				}); //create a connection
			}
		} else {
			const user = await usersService.create(email); //create a new user
			userId = user.id;

			await connectionsService.create({
				userId,
				socketId
			});
		}
		messagesService.create({
			userId,
			text
		}); //saves the chat messages
	});
});
