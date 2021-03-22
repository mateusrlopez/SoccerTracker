import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePositionType1616383469242 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE position_enum AS ENUM('Goalkeeper', 'Defender', 'Midfielder', 'Foward')`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TYPE IF EXISTS position_enum`);
    }
}
