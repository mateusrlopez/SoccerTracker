import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePreferredFootType1616384349856 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE function_enum AS ENUM('Manager', 'Player')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TYPE IF EXISTS function_enum`);
    }
}
