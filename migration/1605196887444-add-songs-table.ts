import {MigrationInterface, QueryRunner} from "typeorm";

export class addSongsTable1605196887444 implements MigrationInterface {
    name = 'addSongsTable1605196887444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "song" ("id" SERIAL NOT NULL, "artistName" character varying NOT NULL, "albumName" character varying NOT NULL, "songName" character varying NOT NULL, "artistId" character varying, "songId" integer, "albumId" character varying, "albumArtUrl" character varying, "danceability" integer, "energy" integer, "key" integer, "loudness" integer, "mode" integer, "speechiness" integer, "acousticness" integer, "instrumentalness" integer, "liveness" integer, "valence" integer, "tempo" integer, "timeSignature" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "deletedAt" TIMESTAMP, CONSTRAINT "PK_baaa977f861cce6ff954ccee285" PRIMARY KEY ("id"))`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE "song" ADD CONSTRAINT "FK_75b6d730028d9215ebdeab56d3d" FOREIGN KEY ("songId") REFERENCES "song"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song" DROP CONSTRAINT "FK_75b6d730028d9215ebdeab56d3d"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT ('now'`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT ('now'`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
        await queryRunner.query(`DROP TABLE "song"`);
    }

}
