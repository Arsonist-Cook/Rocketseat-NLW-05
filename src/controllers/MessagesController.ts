import { Request, Response } from 'express';
import { MessagesService } from '../services/MessagesService';

class MessagesController {
	async create(request: Request, response: Response) {
		const messageService = new MessagesService();
		const { adminId, text, userId } = request.body;

		const message = await messageService.create({
			adminId,
			text,
			userId
		});

		return response.json(message);
	}

	async showByUser(request: Request, response: Response) {
		const messageService = new MessagesService();
		const { id } = request.params;

		const list = await messageService.listByUser(id);

		return response.json(list);
	}
}

export { MessagesController };
