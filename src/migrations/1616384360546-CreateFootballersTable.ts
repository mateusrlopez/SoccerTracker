import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFootballersTable1616384360546 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'footballers',
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
                        name: 'birthdate',
                        type: 'date',
                    },
                    {
                        name: 'height',
                        type: 'int',
                    },
                    {
                        name: 'weight',
                        type: 'real',
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
                        name: 'function',
                        type: 'function_enum',
                    },
                    {
                        name: 'picture_url',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'bio',
                        type: 'text',
                        isNullable: true,
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
                foreignKeys: [
                    {
                        name: 'footballers_teams_fk',
                        columnNames: ['team_id'],
                        referencedTableName: 'teams',
                        referencedColumnNames: ['id'],
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('footballers', true);
    }
}
