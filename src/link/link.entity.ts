import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Issue } from '../issue/issue.entity';

export enum ELink {
  isBLockedBy = 'isBlockedBy',
  blocks = 'blocks',
  isClonedBy = 'isClonedBy',
  clones = 'clones',
  isDuplicatedBy = 'isDuplicatedBy',
  duplicates = 'duplicates',
  relatesTo = 'relatesTo',
}

@Entity('link')
export class Link {
  @ApiProperty({ example: 0, description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Issue, (issue) => issue.sourceIssue)
  sourceIssue: number;

  @ManyToOne(() => Issue, (issue) => issue.targetIssue)
  targetIssue: number;

  @Column({ type: 'enum', enum: ELink, default: ELink.isBLockedBy })
  linkType: ELink;
}
