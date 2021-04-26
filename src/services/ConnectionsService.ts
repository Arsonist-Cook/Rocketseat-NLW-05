import { getCustomRepository, Repository } from 'typeorm';
import { Connection } from '../entities/Connections';
import { ConnectionsRepository } from '../repositories/ConnectionsRepository';

interface IConnectionCreate {
	id?: string;
	userId: string;
	adminId?: string;
	socketId: string;
}

class ConnectionsService {
	private connectionsRepository: Repository<Connection>;

	constructor() {
		this.connectionsRepository = getCustomRepository(ConnectionsRepository);
	}

	async create({ id, userId, adminId, socketId }: IConnectionCreate) {
		const connection = this.connectionsRepository.create({
			id,
			adminId,
			userId,
			socketId
		});

		await this.connectionsRepository.save(connection);

		return connection;
	}

	async findByUserId(userId: string) {
		const connection = await this.connectionsRepository.findOne({userId});
		return connection;
	}
}

export { ConnectionsService };
