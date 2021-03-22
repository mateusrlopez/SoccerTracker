import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePlayersTable1616384360546 implements MigrationInterface {
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
                    },
                    {
                        name: 'middle_name',
                        type: 'varchar',
                    },
                    {
                        name: 'last_name',
                        type: 'varchar',
                    },
                    {
                        name: 'knownby',
                        type: 'varchar',
                    },
                    {
                        name: 'picture_url',
                        type: 'varchar',
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
                        name: 'position',
                        type: 'position_enum',
                    },
                    {
                        name: 'preferred_foot',
                        type: 'preferred_foot_enum',
                    },
                    {
                        name: 'shirt_number',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'team_id',
                        type: 'int',
                        isNullable: true,
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
