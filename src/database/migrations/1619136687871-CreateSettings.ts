import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const TABLE_NAME = 'settings';

export class CreateSettings1619136687871 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: TABLE_NAME,
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true
					},
					{
						name: 'username',
						type: 'varchar'
					},
					{
						name: 'chat',
						type: 'boolean',
						default: true
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()'
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()'
					}
				]
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(TABLE_NAME);
	}
}

export { TABLE_NAME };
