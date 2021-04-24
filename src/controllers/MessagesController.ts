import { Request, Response } from 'express';
import { MessagesService } from '../services/MessagesService';



class MessagesController {
	//private messageService = new MessagesService();

	async create(request: Request, response: Response) {
		const messageService = new MessagesService();
		const { admin_id, text, user_id } = request.body;

		const message = await messageService.create({
			admin_id,
			text,
			user_id
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
