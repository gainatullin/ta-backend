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
import { User } from '../user/user.entity';
import { Workspace } from '../workspace/workspace.entity';
import { Issue } from '../issue/issue.entity';
import { Component } from '../component/component.entity';
import { Shortcut } from '../shortcut/shortcut.entity';
import { Invitation } from '../invitation/invitation.entity';
import { ProjectUserRole } from '../project-user-role/project-user-role.entity';
import { Document } from '../document/document.entity';
import { Sprint } from '../sprint/sprint.entity';

@Entity('project')
export class Project {
  @ApiProperty({ example: 0, description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'string', description: 'Project name' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ example: 'string', description: 'Project ticket' })
  @Column({ unique: true })
  ticket: string;

  @ApiProperty({ example: 'string', description: 'Project description' })
  @Column({ nullable: true, type: 'text' })
  description: string;

  @ApiProperty({
    type: () => Workspace,
    example: { id: 0, name: 'string', ticket: 'string' },
    description: 'Workspace info',
  })
  @ManyToOne(() => Workspace, (workspace) => workspace.projects, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  workspace: Workspace;

  @ApiProperty({ type: () => User, example: { id: 0, name: 'string' }, description: 'Project owner id' })
  @ManyToOne(() => User, (user) => user.projects, { cascade: true, onDelete: 'CASCADE' })
  creator: User;

  @OneToMany(() => Issue, (issue) => issue.project)
  issue: Issue[];

  @OneToMany(() => Component, (projectComponent) => projectComponent.project)
  components: Component[];

  @ApiProperty({ type: () => User, example: { id: 0, name: 'string' }, description: 'Project lead' })
  @ManyToOne(() => User, (user) => user.issueAssignee, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn()
  lead: User;

  @OneToMany(() => Invitation, (invitation) => invitation.project)
  invitation: Invitation;

  @OneToMany(() => ProjectUserRole, (projectUserRole) => projectUserRole.project)
  projectsUsersRoles: ProjectUserRole[];

  @OneToMany(() => Shortcut, (shortcut) => shortcut.project)
  shortcut: Shortcut[];

  @OneToMany(() => Document, (document) => document.project)
  document: Document[];

  @OneToMany(() => Sprint, (sprint) => sprint.project)
  sprint: Sprint[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
