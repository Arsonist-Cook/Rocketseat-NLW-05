import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { MessagesService } from '../services/MessagesService';

// interface IAdminParams {
// 	userId: string;
// }

io.on('connect', async (socket) => {
	//
	const connectionsService = new ConnectionsService();
	const messagesService = new MessagesService();

	const allConnectionsWithoutAdmin = await connectionsService.findAllConnectionsWithoutAdmin();

	io.emit('admin_list_all_users', allConnectionsWithoutAdmin); //Broadcasts event

	socket.on('admin_list_messages_by_user', async ({ userId }, callback) => {
		//const { userId } = params;
		const allMessages = await messagesService.listByUser(userId);
		callback(allMessages);
	});

	socket.on('admin_send_message', async ({ text, userId }) => {
		await messagesService.create({
			text,
			userId,
			adminId: socket.id
		});

		const { socketId } = await connectionsService.findByUserId(userId);

		io.to(socketId).emit('admin_send_to_client', {
			text,
			socketId: socket.id
		});
	});

	socket.on('admin_user_in_support', async (params) => {
		const { userId } = params;
		await connectionsService.updateAdminId(userId, socket.id);
		
		const allConnectionsWithoutAdmin = await connectionsService.findAllConnectionsWithoutAdmin();
		io.emit('admin_list_all_users', allConnectionsWithoutAdmin);
	});
});
