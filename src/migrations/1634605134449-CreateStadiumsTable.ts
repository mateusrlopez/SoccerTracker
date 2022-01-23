import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStadiumsTable1634605134449 implements MigrationInterface {
    private readonly tableName = 'stadiums';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table: Table = new Table({
            name: this.tableName,
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                { name: 'name', type: 'varchar' },
                { name: 'foundation_date', type: 'date' },
                { name: 'bio', type: 'text', isNullable: true },
                { name: 'capacity', type: 'integer' },
                { name: 'picture_file_key', type: 'varchar', isNullable: true },
                { name: 'created_at', type: 'timestamptz', default: 'now()' },
                { name: 'updated_at', type: 'timestamptz', isNullable: true },
            ],
            uniques: [{ name: 'stadiums_name_unique', columnNames: ['name'] }],
        });

        await queryRunner.createTable(table, true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName, true);
    }
}
