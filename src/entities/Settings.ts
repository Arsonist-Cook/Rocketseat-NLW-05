import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { TABLE_NAME } from '../database/migrations/1619136687871-CreateSettings';
import { v4 as uuid } from 'uuid';

@Entity(TABLE_NAME)
class Setting {
	@PrimaryColumn() id: string;

	@Column() username: string;

	@Column() chat: boolean;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	constructor() {
		if (!this.id) {
			this.id = uuid();
		}
	}
}
export { Setting };
