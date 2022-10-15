import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from '../project/project.entity';
import { User } from '../user/user.entity';

@Entity('document')
export class Document {
  @ApiProperty({ example: 0, description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'string', description: 'Document name' })
  @Column()
  name: string;

  @ApiProperty({
    type: () => Project,
    example: { id: 0, name: 'string', ticket: 'string' },
    description: 'Project',
  })
  @ManyToOne(() => Project, (project) => project.document)
  @JoinColumn()
  project: Project;

  @ApiProperty({ type: () => User, example: { id: 0, name: 'string' }, description: 'Document creator' })
  @ManyToOne(() => User, (user) => user.document)
  @JoinColumn()
  creator: User;

  @ApiProperty({ example: 'string', description: 'Document content' })
  @Column({ type: 'text', nullable: true })
  content: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
