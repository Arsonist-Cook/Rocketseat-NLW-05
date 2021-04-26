import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { TABLE_NAME as FOREIGN_TABLE_NAME } from './1619223653217-CreateUsers';

const TABLE_NAME = 'connections';
const FOREIGN_KEY = 'FKConnectionUser';

export class CreateConnections1619310211220 implements MigrationInterface {
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
						name: 'socket_id',
						type: 'varchar'
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()'
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()'
					}
				]
			})
		);

		await queryRunner.createForeignKey(
			TABLE_NAME,
			new TableForeignKey({
				name: FOREIGN_KEY,
				referencedTableName: 'users',
				referencedColumnNames: [ 'id' ],
				columnNames: [ 'user_id' ],
				onDelete: 'SET NULL',
				onUpdate: 'SET NULL'
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey(TABLE_NAME, FOREIGN_KEY);
		await queryRunner.dropTable(TABLE_NAME);
	}
}

export { TABLE_NAME };
