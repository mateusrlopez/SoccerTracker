import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateHalfType1617067981802 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE half_enum AS enum('1T', '2T', '1ET', '2ET');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TYPE IF EXISTS half_enum`);
    }
}
