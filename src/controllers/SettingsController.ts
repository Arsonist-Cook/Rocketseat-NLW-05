import { Request, Response } from 'express';
import { SettingsService } from '../services/SettingsService';

export const SettingsController = {
	async create(request: Request, response: Response) {
		const { chat, username } = request.body;

		const settingsService = new SettingsService();

		try {

			const setting = await settingsService.create({ chat, username });
			return response.json(setting);

		} catch (error) {
			
			return response.status(400).json({ message: error.message});
		}
	}
}
