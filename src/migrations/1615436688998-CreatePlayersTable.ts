import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePlayersTable1615436688998 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'players',
                columns: [
                    {
                        name: 'id',
                        type: 'serial',
                        isPrimary: true,
                    },
                    {
                        name: 'first_name',
                        type: 'varchar',
                        length: '25',
                    },
                    {
                        name: 'middle_name',
                        type: 'varchar',
                        length: '40',
                    },
                    {
                        name: 'last_name',
                        type: 'varchar',
                        length: '25',
                    },
                    {
                        name: 'knownby',
                        type: 'varchar',
                        length: '20',
                    },
                    {
                        name: 'picture_url',
                        type: 'varchar',
                        length: '100',
                        isNullable: true,
                    },
                    {
                        name: 'height',
                        type: 'int',
                    },
                    {
                        name: 'birthdate',
                        type: 'date',
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
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('players', true);
    }
}
