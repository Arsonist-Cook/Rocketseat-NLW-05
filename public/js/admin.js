const socket = io();
let usersConnections = [];

function createMessage({ category = 'admin_message_admin', username = 'Atendente', textMessage, date = dayjs() }) {
	const newDiv = document.createElement('div');
	newDiv.className = category;

	const userMessage = document.createElement('span');
	userMessage.innerText = username;

	const messageText = document.createElement('span');
	messageText.innerText = textMessage;

	const dateMessage = document.createElement('span');
	dateMessage.className = 'admin_date';
	dateMessage.innerText = dayjs(date).format('DD/MM/YYYY HH:mm:ss');

	newDiv.append(userMessage, messageText, dateMessage);
	return newDiv;
}

socket.on('admin_list_all_users', (connections) => {
	usersConnections = connections;

	document.querySelector('#list_users').innerHTML = '';

	const template = document.querySelector('#template').innerHTML;

	connections.forEach((connection) => {
		const rendered = Mustache.render(template, {
			email: connection.user.email,
			id: connection.socketId
		});
		document.querySelector('#list_users').innerHTML += rendered;
	});
});

function call(id) {
	const connection = usersConnections.find((connection) => connection.socketId === id);

	const template = document.querySelector('#admin_template').innerHTML;
	const render = Mustache.render(template, {
		email: connection.user.email,
		id: connection.userId
	});

	document.querySelector('#active_support').innerHTML += render;

	const params = {
		userId: connection.userId
	};
	socket.emit('admin_user_in_support', params);
	
	socket.emit('admin_list_messages_by_user', params, (messages) => {
		const divMessages = document.querySelector(`#allMessages${connection.userId}`);

		messages.forEach((message) => {
			let messageConfig = {};

			if (message.adminId === null) {
				messageConfig = {
					category: 'admin_message_client',
					username: connection.user.email,
					textMessage: message.text,
					date: message.createdAt
				};
			} else {
				messageConfig = {
					textMessage: message.text,
					date: message.createdAt
				};
			}

			const messageHtml = createMessage(messageConfig);
			divMessages.appendChild(messageHtml);
		});
	});
}

function sendMessage(id) {
	const text = document.querySelector(`#send_message_${id}`);

	const params = {
		text: text.value,
		userId: id
	};

	socket.emit('admin_send_message', params);

	const newMessage = createMessage({
		textMessage: params.text
	});

	document.querySelector(`#allMessages${id}`).appendChild(newMessage);
	text.value = '';
}
socket.on('admin_receive_message', (data) => {
	
	const connection = usersConnections.find((connection) => connection.socketId == data.socketId);
	
	const divMessages = document.querySelector(`#allMessages${connection.userId}`);

	const messageConfig = {
		category: 'admin_message_client',
		username: connection.user.email,
		textMessage: data.message.text,
		date: data.message.createdAt
	};

	const newMessage = createMessage(messageConfig);

	divMessages.appendChild(newMessage);
});
