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

@Entity('shortcut')
export class Shortcut {
  @ApiProperty({ example: 0, description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'string', description: 'Shortcut name' })
  @Column()
  name: string;

  @ApiProperty({ example: 'string', description: 'Shortcut link' })
  @Column({ type: 'text' })
  link: string;

  @ApiProperty({
    type: () => Project,
    example: { id: 0, name: 'string', ticket: 'string' },
    description: 'Project',
  })
  @ManyToOne(() => Project, (project) => project.shortcut)
  @JoinColumn()
  project: Project;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
