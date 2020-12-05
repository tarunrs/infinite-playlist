import {MigrationInterface, QueryRunner} from "typeorm";

export class modifySongsTableAddScoreAndUser1606626576470 implements MigrationInterface {
    name = 'modifySongsTableAddScoreAndUser1606626576470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song" ADD "score" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "song" ADD "user" uuid`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE "song" ADD CONSTRAINT "FK_08866b38ac6f30dc98cf85634d4" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song" DROP CONSTRAINT "FK_08866b38ac6f30dc98cf85634d4"`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "updatedAt" SET DEFAULT ('now'`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "createdAt" SET DEFAULT ('now'`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT ('now'`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT ('now'`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "user"`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "score"`);
    }

}
