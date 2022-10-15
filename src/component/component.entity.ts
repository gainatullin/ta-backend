import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from '../project/project.entity';
import { User } from '../user/user.entity';
import { Issue } from '../issue/issue.entity';

@Entity('component')
export class Component {
  @ApiProperty({ example: 0, description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'string', description: 'Component name' })
  @Column()
  name: string;

  @ApiProperty({ example: 'string', description: 'Component description' })
  @Column({ nullable: true, type: 'text' })
  description: string;

  @ManyToOne(() => Project, (project) => project.components, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn()
  project: Project;

  @ApiProperty({ type: () => User, example: { id: 0, name: 'string' }, description: 'Component lead' })
  @ManyToOne(() => User, (user) => user.componentLead, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn()
  lead: User;

  @OneToMany(() => Issue, (issue) => issue.component)
  issue: Issue;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
