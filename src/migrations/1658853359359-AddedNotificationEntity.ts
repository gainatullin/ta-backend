import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedNotificationEntity1658853359359 implements MigrationInterface {
  name = 'AddedNotificationEntity1658853359359';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`notification\` ADD \`message\` text NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`notification\` ADD \`category\` varchar(255) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE \`notification\` ADD \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(`ALTER TABLE \`notification\` ADD \`userId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`notification\` ADD CONSTRAINT \`FK_1ced25315eb974b73391fb1c81b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`notification\` DROP FOREIGN KEY \`FK_1ced25315eb974b73391fb1c81b\``);
    await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`userId\``);
    await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`createdDate\``);
    await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`category\``);
    await queryRunner.query(`ALTER TABLE \`notification\` DROP COLUMN \`message\``);
  }
}
