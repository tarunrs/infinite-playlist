import {MigrationInterface, QueryRunner} from "typeorm";

export class modifySongsTableOnceMore1605198463547 implements MigrationInterface {
    name = 'modifySongsTableOnceMore1605198463547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "danceability" TYPE numeric`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."danceability" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "energy" TYPE numeric`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."energy" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "key" TYPE numeric`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."key" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "loudness" TYPE numeric`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."loudness" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "mode" TYPE numeric`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."mode" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "speechiness" TYPE numeric`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."speechiness" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "acousticness" TYPE numeric`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."acousticness" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "instrumentalness" TYPE numeric`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."instrumentalness" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "liveness" TYPE numeric`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."liveness" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "valence" TYPE numeric`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."valence" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "tempo" TYPE numeric`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."tempo" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "timeSignature" TYPE numeric`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."timeSignature" IS NULL`);
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
        await queryRunner.query(`COMMENT ON COLUMN "song"."timeSignature" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "timeSignature" TYPE numeric(6,2)`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."tempo" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "tempo" TYPE numeric(6,2)`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."valence" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "valence" TYPE numeric(6,2)`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."liveness" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "liveness" TYPE numeric(6,2)`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."instrumentalness" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "instrumentalness" TYPE numeric(6,2)`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."acousticness" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "acousticness" TYPE numeric(6,2)`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."speechiness" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "speechiness" TYPE numeric(6,2)`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."mode" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "mode" TYPE numeric(6,2)`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."loudness" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "loudness" TYPE numeric(6,2)`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."key" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "key" TYPE numeric(6,2)`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."energy" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "energy" TYPE numeric(6,2)`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."danceability" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "danceability" TYPE numeric(6,2)`);
    }

}
