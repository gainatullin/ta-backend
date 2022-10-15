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
import { Workspace } from '../workspace/workspace.entity';
import { User } from '../user/user.entity';
import { Roles } from '../project-user-role/project-user-role.entity';

@Entity('invitation')
export class Invitation {
  @ApiProperty({ example: 0, description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'string', description: 'Name' })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({ example: 'string', description: 'Email' })
  @Column()
  email: string;

  @Column()
  confirmationCode: string;

  @Column({ default: false })
  isConfirm: boolean;

  @Column({ type: 'enum', enum: Roles, default: Roles.WORKER })
  role: Roles;

  @ManyToOne(() => Project, (project) => project.invitation, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  project: Project;

  @ManyToOne(() => Workspace, (workspace) => workspace.invitation, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  workspace: Workspace;

  @ManyToOne(() => User, (user) => user.invitation, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  creator: User;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
