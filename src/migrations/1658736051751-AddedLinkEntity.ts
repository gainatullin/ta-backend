import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedLinkEntity1658736051751 implements MigrationInterface {
  name = 'AddedLinkEntity1658736051751';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`link\` (\`id\` int NOT NULL AUTO_INCREMENT, \`linkType\` enum ('isBlockedBy', 'blocks', 'isClonedBy', 'clones', 'isDuplicatedBy', 'duplicates', 'relatesTo') NOT NULL DEFAULT 'isBlockedBy', \`sourceIssueId\` int NULL, \`targetIssueId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`notification\` (\`id\` int NOT NULL AUTO_INCREMENT, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`link\` ADD CONSTRAINT \`FK_99e1a14f35376cf67390afb2d52\` FOREIGN KEY (\`sourceIssueId\`) REFERENCES \`issue\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`link\` ADD CONSTRAINT \`FK_2b3f20c8d61f51265c5f94f38a1\` FOREIGN KEY (\`targetIssueId\`) REFERENCES \`issue\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`link\` DROP FOREIGN KEY \`FK_2b3f20c8d61f51265c5f94f38a1\``);
    await queryRunner.query(`ALTER TABLE \`link\` DROP FOREIGN KEY \`FK_99e1a14f35376cf67390afb2d52\``);
    await queryRunner.query(`DROP TABLE \`notification\``);
    await queryRunner.query(`DROP TABLE \`link\``);
  }
}
