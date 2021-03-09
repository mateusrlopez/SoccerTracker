import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1614229716436 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
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
                        name: 'last_name',
                        type: 'varchar',
                        length: '25',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '45',
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '40',
                    },
                    {
                        name: 'email_verified',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'birthdate',
                        type: 'date',
                    },
                    {
                        name: 'photo_url',
                        type: 'varchar',
                        length: '100',
                    },
                    {
                        name: 'team_id',
                        type: 'int',
                    },
                    {
                        name: 'admin',
                        type: 'boolean',
                        default: false,
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
                        name: 'users_teams_fk',
                        columnNames: ['team_id'],
                        referencedTableName: 'teams',
                        referencedColumnNames: ['id'],
                    },
                ],
                uniques: [
                    {
                        name: 'user_email_unique',
                        columnNames: ['email'],
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users', true);
    }
}
