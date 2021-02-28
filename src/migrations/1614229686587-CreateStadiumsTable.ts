import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStadiumsTable1614229686587 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'stadiums',
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
                        name: 'foundation_date',
                        type: 'date',
                    },
                    {
                        name: 'capacity',
                        type: 'bigint',
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
                indices: [
                    {
                        name: 'stadiums_knownby_index',
                        columnNames: ['knownby'],
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('stadiums', true);
    }
}
