import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTeamsTable1614229696204 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'teams',
                columns: [
                    {
                        name: 'id',
                        type: 'serial',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '45',
                    },
                    {
                        name: 'knownby',
                        type: 'varchar',
                        length: '20',
                    },
                    {
                        name: 'initials',
                        type: 'char',
                        length: '3',
                    },
                    {
                        name: 'foundation_date',
                        type: 'date',
                    },
                    {
                        name: 'stadium_id',
                        type: 'int',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamptz',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamptz',
                        isNullable: true,
                    },
                ],
                foreignKeys: [
                    {
                        name: 'teams_stadiums_fk',
                        columnNames: ['stadium_id'],
                        referencedTableName: 'stadiums',
                        referencedColumnNames: ['id'],
                    },
                ],
                indices: [
                    {
                        name: 'teams_knownby_index',
                        columnNames: ['knownby'],
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('teams', true);
    }
}
