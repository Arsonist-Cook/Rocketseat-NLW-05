import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { TABLE_NAME } from '../database/migrations/1619223653217-CreateUsers';

@Entity(TABLE_NAME)
class User {
	@PrimaryColumn() id: string;

	@Column() email: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}

export { User };
