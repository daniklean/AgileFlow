import { MigrationInterface, QueryRunner } from "typeorm";

export class NewRoleAndAccessLevel1692728933387 implements MigrationInterface {
    name = 'NewRoleAndAccessLevel1692728933387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum" RENAME TO "users_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('BASIC', 'CREATOR', 'ADMIN')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum" USING "role"::"text"::"public"."users_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."users_projects_access_level_enum" RENAME TO "users_projects_access_level_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_projects_access_level_enum" AS ENUM('30', '40', '50')`);
        await queryRunner.query(`ALTER TABLE "users_projects" ALTER COLUMN "access_level" TYPE "public"."users_projects_access_level_enum" USING "access_level"::"text"::"public"."users_projects_access_level_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_projects_access_level_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_projects_access_level_enum_old" AS ENUM('40', '50')`);
        await queryRunner.query(`ALTER TABLE "users_projects" ALTER COLUMN "access_level" TYPE "public"."users_projects_access_level_enum_old" USING "access_level"::"text"::"public"."users_projects_access_level_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."users_projects_access_level_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_projects_access_level_enum_old" RENAME TO "users_projects_access_level_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum_old" AS ENUM('BASIC', 'ADMIN')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum_old" USING "role"::"text"::"public"."users_role_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum_old" RENAME TO "users_role_enum"`);
    }

}
