import {MigrationInterface, QueryRunner} from "typeorm";

export class modifySongsTable1605197999528 implements MigrationInterface {
    name = 'modifySongsTable1605197999528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "danceability"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "danceability" numeric(6,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "energy"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "energy" numeric(6,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "key"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "key" numeric(6,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "loudness"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "loudness" numeric(6,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "mode"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "mode" numeric(6,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "speechiness"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "speechiness" numeric(6,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "acousticness"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "acousticness" numeric(6,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "instrumentalness"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "instrumentalness" numeric(6,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "liveness"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "liveness" numeric(6,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "valence"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "valence" numeric(6,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "tempo"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "tempo" numeric(6,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "timeSignature"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "timeSignature" numeric(6,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT ('now'`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT ('now'`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "updatedAt" SET DEFAULT ('now'`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "createdAt" SET DEFAULT ('now'`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "timeSignature"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "timeSignature" integer`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "tempo"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "tempo" integer`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "valence"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "valence" integer`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "liveness"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "liveness" integer`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "instrumentalness"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "instrumentalness" integer`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "acousticness"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "acousticness" integer`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "speechiness"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "speechiness" integer`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "mode"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "mode" integer`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "loudness"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "loudness" integer`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "key"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "key" integer`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "energy"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "energy" integer`);
        await queryRunner.query(`ALTER TABLE "song" DROP COLUMN "danceability"`);
        await queryRunner.query(`ALTER TABLE "song" ADD "danceability" integer`);
    }

}
