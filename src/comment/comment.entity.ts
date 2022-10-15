import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Issue } from '../issue/issue.entity';

@Entity('comment')
export class Comment {
  @ApiProperty({ example: 0, description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'string', description: 'Comment description' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ type: () => User, example: { id: 0, name: 'string' }, description: 'Issue' })
  @ManyToOne(() => Issue, (issue) => issue.comment)
  issue: Issue;

  @ApiProperty({ type: () => User, example: { id: 0, name: 'string' }, description: 'Creator' })
  @ManyToOne(() => User, (user) => user.comment)
  creator: User;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
