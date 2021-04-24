import { UsersController } from './UsersController';
import { SettingsController } from './SettingsController';

const controllers = {
	users: UsersController.create,
	settings: SettingsController.create
};

export default controllers;
