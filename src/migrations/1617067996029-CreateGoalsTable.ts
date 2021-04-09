import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateGoalsTable1617067996029 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'goals',
                columns: [
                    {
                        name: 'id',
                        type: 'serial',
                        isPrimary: true,
                    },
                    {
                        name: 'minute',
                        type: 'int',
                    },
                    {
                        name: 'half',
                        type: 'half_enum',
                    },
                    {
                        name: 'own_goal',
                        type: 'boolean',
                    },
                    {
                        name: 'scorer_id',
                        type: 'int',
                    },
                    {
                        name: 'assistant_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'match_id',
                        type: 'int',
                    },
                    {
                        name: 'team_id',
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
                        name: 'goals_scorers_fk',
                        columnNames: ['scorer_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'footballers',
                    },
                    {
                        name: 'goals_assistants_fk',
                        columnNames: ['assistant_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'footballers',
                    },
                    {
                        name: 'goals_teams_fk',
                        columnNames: ['team_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'teams',
                    },
                    {
                        name: 'goals_matches_fk',
                        columnNames: ['match_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'matches',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('goals');
    }
}
