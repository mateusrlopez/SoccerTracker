import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTeamsTable1635135972666 implements MigrationInterface {
    private readonly tableName = 'teams';

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
                { name: 'initials', type: 'char', length: '3' },
                { name: 'foundation_date', type: 'date' },
                { name: 'logo_file_key', type: 'varchar', isNullable: true },
                { name: 'bio', type: 'text', isNullable: true },
                { name: 'stadium_id', type: 'uuid', isNullable: true },
                { name: 'created_at', type: 'timestamptz', default: 'now()' },
                { name: 'updated_at', type: 'timestamptz', isNullable: true },
            ],
            uniques: [{ name: 'teams_name_unique', columnNames: ['name'] }],
            foreignKeys: [
                {
                    name: 'teams_stadiums_fk',
                    columnNames: ['stadium_id'],
                    referencedTableName: 'stadiums',
                    referencedColumnNames: ['id'],
                },
            ],
        });

        await queryRunner.createTable(table, true, true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName, true, true);
    }
}
