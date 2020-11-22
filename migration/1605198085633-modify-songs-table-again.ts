import {MigrationInterface, QueryRunner} from "typeorm";

export class modifySongsTableAgain1605198085633 implements MigrationInterface {
    name = 'modifySongsTableAgain1605198085633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song" DROP CONSTRAINT "FK_75b6d730028d9215ebdeab56d3d"`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "songName"`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "songId"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "trackName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "song" ADD "trackId" character varying`);
        await queryRunner.query(`ALTER TABLE "song" ADD "parent" integer`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE "song" ADD CONSTRAINT "FK_8ea51948164831b2f25eaefd259" FOREIGN KEY ("parent") REFERENCES "song"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song" DROP CONSTRAINT "FK_8ea51948164831b2f25eaefd259"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT ('now'`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT ('now'`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "updatedAt" SET DEFAULT ('now'`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "createdAt" SET DEFAULT ('now'`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "parent"`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "trackId"`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "trackName"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "songId" integer`);
        await queryRunner.query(`ALTER TABLE "song" ADD "songName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "song" ADD CONSTRAINT "FK_75b6d730028d9215ebdeab56d3d" FOREIGN KEY ("songId") REFERENCES "song"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
