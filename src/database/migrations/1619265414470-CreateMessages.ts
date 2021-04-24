import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const TABLE_NAME = 'messages';

export class CreateMessages1619265414470 implements MigrationInterface {
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
						name: 'admin_id',
						type: 'uuid',
						isNullable: true
					},
					{
						name: 'user_id',
						type: 'uuid'
					},
					{
						name: 'text',
						type: 'varchar'
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()'
					}
				],
				foreignKeys: [
					{
						name: 'FKUser',
						referencedTableName: 'users',
						referencedColumnNames: [ 'id' ],
						columnNames: [ 'user_id' ],
						onDelete: 'SET NULL',
						onUpdate: 'SET NULL'
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
