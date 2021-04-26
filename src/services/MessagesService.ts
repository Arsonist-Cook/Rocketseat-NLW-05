import { getCustomRepository, Repository } from 'typeorm';
import { Message } from '../entities/Messages';
import { MessagesRepository } from '../repositories/MessagesRepository';

interface IMessageCreate {
	adminId?: string;
	text: string;
	userId: string;
}

class MessagesService {
	private messageRepository: Repository<Message>;

	constructor() {
		this.messageRepository = getCustomRepository(MessagesRepository);
	}

	async create({ adminId, text, userId }: IMessageCreate) {
		const message = this.messageRepository.create({
			adminId,
			text,
			userId
		});

		await this.messageRepository.save(message);

		return message;
	}

	async listByUser(userId: string) {
		const list = await this.messageRepository.find({
			where: { userId },
			relations: [ 'user' ]
		});

		return list;
	}
}

export { MessagesService };
