import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { TABLE_NAME } from '../database/migrations/1619310211220-CreateConnections';
import { User } from './Users';

@Entity(TABLE_NAME)
class Connection {
	@PrimaryColumn() id: string;
	@Column({ name: 'admin_id' })
	adminId: string;

	@JoinColumn({ name: 'user_id' })
	@ManyToOne(() => User)
	user: User;

	@Column({ name: 'user_id' })
	userId: string;
	
	@Column({ name: 'socket_id' })
	socketId: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}
export { Connection };
