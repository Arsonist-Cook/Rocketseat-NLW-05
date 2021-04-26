import { getCustomRepository, Repository } from 'typeorm';
import { Setting } from '../entities/Settings';
import { SettingsRepository } from '../repositories/SettingsRepository';

interface ISettingsCreate {
	chat: boolean;
	username: string;
}

class SettingsService {
	private settingsRepository: Repository<Setting>;

	constructor() {
		this.settingsRepository = getCustomRepository(SettingsRepository);
	}

	async create({ chat, username }: ISettingsCreate) {
		//SELECT * FROM settings WHERE username="username" LIMIT 1;
		const userAlreadyExists = await this.settingsRepository.findOne({
			username
		});

		if (userAlreadyExists) {
			throw new Error('User already exists');
		}

		const setting = this.settingsRepository.create({
			chat,
			username
		});

		await this.settingsRepository.save(setting);

		return setting;
	}

	async findByUsername(username: string) {
		const setting = await this.settingsRepository.findOne({
			username
		});
		return setting;
	}

	async updateChat(username: string, chat: boolean) {
		this.settingsRepository
			.createQueryBuilder()
			.update(Setting)
			.set({ chat })
			.where('username = :username', { username })
			.execute();
	}
}

export { SettingsService };
