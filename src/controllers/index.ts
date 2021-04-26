import { UsersController } from './UsersController';
import { SettingsController } from './SettingsController';
import { MessagesController } from './MessagesController';

const messagesController = new MessagesController();

const controllers = {
	users: UsersController.create,
	settings: {
		create: SettingsController.create,
		findByUsername: SettingsController.findByUsername,
		updateChat: SettingsController.updateChat
	},
	messages: {
		create: messagesController.create,
		showByUser: messagesController.showByUser
	}
};

export default controllers;
