import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { TABLE_NAME } from '../database/migrations/1619265414470-CreateMessages';
import { User } from './Users';

@Entity(TABLE_NAME)
class Message {
	@PrimaryColumn() id: string;

	@JoinColumn({ name: 'user_id' })
	@ManyToOne(() => User)
	user: User;
	
	@Column({ name: 'user_id' })
	userId: string;

	@Column({ name: 'admin_id' })
	adminId: string;

	@Column() text: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export { Message };
