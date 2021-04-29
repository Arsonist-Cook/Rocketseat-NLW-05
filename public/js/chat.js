const chatHelp = document.querySelector('#chat_help');
const chatInSupport = document.querySelector('#chat_in_support');

const clientTemplate = document.querySelector('#message-user-template').innerHTML;
const adminTemplate = document.querySelector('#admin-template').innerHTML;
const messagesPanel = document.querySelector('#messages');

const userInputMessage = document.querySelector('#message_user');

let socketAdminId = '';
let emailUser = '';

document.querySelector('#start_chat').addEventListener('click', (event) => {
	chatHelp.style.display = 'none'; //Hide First Form
	chatInSupport.style.display = 'block'; //Show Chat Form

	const email = document.querySelector('#email').value;
	emailUser = email;
	const text = document.querySelector('#txt_help').value;

	const socket = io();

	socket.on('connect', () => {
		params = {
			email,
			text
		};
		socket.emit('client_first_connection', params, (callback, error) => {
			if (error) {
				console.error(error);
			} else {
				console.log(callback);
			}
		});
	});

	socket.on('client_list_all_messages', (messages) => {
		messages.forEach((message) => {
			let rendered = null;
			if (message.adminId === null) {
				rendered = Mustache.render(clientTemplate, {
					message: message.text,
					email
				});
			} else {
				rendered = Mustache.render(adminTemplate, {
					message_admin: message.text
				});
			}
			messagesPanel.innerHTML += rendered;
		});
	});

	socket.on('admin_send_to_client', (message) => {
		socketAdminId = message.socketId;

		const rendered = Mustache.render(adminTemplate, {
			message_admin: message.text
		});
		messagesPanel.innerHTML += rendered;
	});

	document.querySelector('#send_message_button').addEventListener('click', (event) => {
		const params = {
			text: userInputMessage.value,
			socketAdminId
		};
		socket.emit('client_send_to_admin', params);

		const rendered = Mustache.render(clientTemplate, {
			message: userInputMessage.value,
			email: emailUser
		});

		messagesPanel.innerHTML += rendered;

		userInputMessage.value = '';
	});
});
