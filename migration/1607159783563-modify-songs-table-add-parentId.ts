import {MigrationInterface, QueryRunner} from "typeorm";

export class modifySongsTableAddParentId1607159783563 implements MigrationInterface {
    name = 'modifySongsTableAddParentId1607159783563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song" DROP CONSTRAINT "FK_8ea51948164831b2f25eaefd259"`);
        await queryRunner.query(`ALTER TABLE "song" RENAME COLUMN "parent" TO "parentId"`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE "song" ADD CONSTRAINT "FK_e6d63df9024416b8f229bfc82cd" FOREIGN KEY ("parentId") REFERENCES "song"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song" DROP CONSTRAINT "FK_e6d63df9024416b8f229bfc82cd"`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "updatedAt" SET DEFAULT ('now'`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" ALTER COLUMN "createdAt" SET DEFAULT ('now'`);
        await queryRunner.query(`COMMENT ON COLUMN "song"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT ('now'`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT ('now'`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "song" RENAME COLUMN "parentId" TO "parent"`);
        await queryRunner.query(`ALTER TABLE "song" ADD CONSTRAINT "FK_8ea51948164831b2f25eaefd259" FOREIGN KEY ("parent") REFERENCES "song"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
