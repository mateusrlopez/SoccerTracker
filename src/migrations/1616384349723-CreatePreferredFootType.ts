import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePreferredFootType1616384349723 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE preferred_foot_enum AS ENUM('Right', 'Left', 'Both')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TYPE IF EXISTS preferred_foot_enum`);
    }
}
