import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const TABLE_NAME = 'users';

export class CreateUsers1619223653217 implements MigrationInterface {

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
						name: 'email',
						type: 'varchar'
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
		queryRunner.dropTable(TABLE_NAME);
	}
}
export { TABLE_NAME };
