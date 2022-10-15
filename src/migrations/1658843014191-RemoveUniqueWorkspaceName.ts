import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUniqueWorkspaceName1658843014191 implements MigrationInterface {
  name = 'RemoveUniqueWorkspaceName1658843014191';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_406f56fc2a42ad5f541973cdbe\` ON \`workspace\``);
    await queryRunner.query(`ALTER TABLE \`sprint\` DROP COLUMN \`startDate\``);
    await queryRunner.query(`ALTER TABLE \`sprint\` ADD \`startDate\` datetime NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`sprint\` DROP COLUMN \`endDate\``);
    await queryRunner.query(`ALTER TABLE \`sprint\` ADD \`endDate\` datetime NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`sprint\` DROP COLUMN \`endDate\``);
    await queryRunner.query(`ALTER TABLE \`sprint\` ADD \`endDate\` timestamp NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`sprint\` DROP COLUMN \`startDate\``);
    await queryRunner.query(`ALTER TABLE \`sprint\` ADD \`startDate\` timestamp NOT NULL`);
    await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_406f56fc2a42ad5f541973cdbe\` ON \`workspace\` (\`name\`)`);
  }
}
