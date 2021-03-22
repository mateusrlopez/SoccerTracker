import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePasswordResetsTable1614229758038 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'password_resets',
                columns: [
                    {
                        name: 'user_email',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'token',
                        type: 'char',
                        length: '60',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamptz',
                        default: 'now()',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'password_resets_users_fk',
                        columnNames: ['user_email'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['email'],
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('password_resets', true);
    }
}
