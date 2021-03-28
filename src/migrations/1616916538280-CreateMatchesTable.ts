import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMatchesTable1616916538280 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'matches',
                columns: [
                    {
                        name: 'id',
                        type: 'serial',
                        isPrimary: true,
                    },
                    {
                        name: 'datetime',
                        type: 'timestamptz',
                    },
                    {
                        name: 'total_public',
                        type: 'int',
                    },
                    {
                        name: 'home_team_id',
                        type: 'int',
                    },
                    {
                        name: 'away_team_id',
                        type: 'int',
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
                        name: 'matches_home_teams_fk',
                        columnNames: ['home_team_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'teams',
                    },
                    {
                        name: 'matches_away_teams_fk',
                        columnNames: ['away_team_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'teams',
                    },
                    {
                        name: 'matches_stadiums_fk',
                        columnNames: ['stadium_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'stadiums',
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('matches');
    }
}
