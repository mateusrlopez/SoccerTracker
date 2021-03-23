import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateManagersTable1616442583798 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'managers',
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
                        name: 'birthdate',
                        type: 'date',
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
                        name: 'managers_team_fk',
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
        await queryRunner.dropTable('managers');
    }
}
